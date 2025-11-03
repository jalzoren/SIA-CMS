$(document).ready(function() {
    var $sidebar = $('#sidebar');
    var $toggle = $('.toggle-sidebar'); // brand link as toggle
    var $menuLabels = $sidebar.find('p'); // <p> labels
    var $dropdowns = $sidebar.find('.side-dropdown');
    var $activeLink = $sidebar.find('a.active');

    function updateMenuLabels() {
        if ($sidebar.hasClass('hide')) {
            $menuLabels.hide();
        } else {
            $menuLabels.show();
        }
    }

    $toggle.on('click', function(e) {
        e.preventDefault();
        $sidebar.toggleClass('hide');
        updateMenuLabels();

        if ($sidebar.hasClass('hide')) {
            $dropdowns.removeClass('show');
            $sidebar.find('a').removeClass('active');
            $activeLink.addClass('active'); 
        } else {
            $activeLink.addClass('active'); 
        }
    });

    $dropdowns.each(function() {
        var $drop = $(this);
        var $a = $drop.parent().children('a:first');

        $a.on('click', function(e) {
            e.preventDefault();
            if (!$sidebar.hasClass('hide')) {
                var isActive = $a.hasClass('active');
                $dropdowns.removeClass('show');
                $sidebar.find('a').removeClass('active');
                if (!isActive) {
                    $drop.addClass('show');
                    $a.addClass('active');
                }
            }
        });
    });

    $sidebar.on('mouseenter', function() {
        if ($sidebar.hasClass('hide')) {
            $menuLabels.show();
            $activeLink.addClass('active');
        }
    });

    $sidebar.on('mouseleave', function() {
        if ($sidebar.hasClass('hide')) {
            $menuLabels.hide();
            $activeLink.addClass('active'); // keep active highlighted
        }
    });

    // Initialize
    updateMenuLabels();
});







/*
// APEXCHART
var options = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'line' // Changed from 'area' to 'line'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z"
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

*/

// ---- Declare quill globally ----
// ------------------- MAIN.JS -------------------

// ---- Declare quill globally ----
let quill;
let supabase;

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {

  // ---- Initialize Supabase ----
  const supabaseUrl = 'https://lqqubgnpntfcyytexdvl.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxcXViZ25wbnRmY3l5dGV4ZHZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDcyOTE1MywiZXhwIjoyMDc2MzA1MTUzfQ.Vb7yjc-FvvbKW-Y4gFCmhNtCqw1PBCA2xS0CKtJZuG0';
  supabase = Supabase.createClient(supabaseUrl, supabaseKey);

  // ---- Initialize Quill ----
  quill = new Quill("#quillEditor", {
    placeholder: "Write your announcement description here...",
    theme: "snow",
    modules: {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "clean"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["code-block"],
        ],
        handlers: {
          image: imageHandler
        }
      }
    },
  });

  // ---- Sidebar toggle (optional, your existing code) ----
  initSidebar();

  // ---- Button Event Listeners ----
  document.querySelector('.submit').addEventListener('click', () => handleAnnouncementSubmit('published'));
  document.querySelector('.draft').addEventListener('click', () => handleAnnouncementSubmit('draft'));
});

// ------------------- CUSTOM FUNCTIONS -------------------

// ---- Custom image handler for Quill ----
async function imageHandler() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `announcements/${Date.now()}.${fileExt}`;
    const bucket = 'announcement-images'; // your Supabase bucket name

    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
      if (error) throw error;

      // Get public URL
      const { publicUrl, error: urlError } = supabase.storage.from(bucket).getPublicUrl(fileName);
      if (urlError) throw urlError;

      // Insert image into Quill at cursor
      const range = quill.getSelection();
      quill.insertEmbed(range ? range.index : 0, 'image', publicUrl);

    } catch (err) {
      console.error('Image upload failed:', err.message);
      Swal.fire({
        icon: 'error',
        title: 'Image Upload Failed',
        text: err.message,
        confirmButtonColor: '#d33'
      });
    }
  };
}

// ---- Handle Announcement Submit (Draft / Publish) ----
async function handleAnnouncementSubmit(status) {
  const short_title = document.getElementById('short-title').value.trim();
  const full_title = document.getElementById('full-title').value.trim();
  const topic_tags = document.getElementById('topic-tags').value.trim();
  const description = quill.root.innerHTML;

  if (!short_title || !full_title) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill out both the short title and full title.',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  const formData = new FormData();
  formData.append('short_title', short_title);
  formData.append('full_title', full_title);
  formData.append('topic_tags', topic_tags);
  formData.append('description', description);
  formData.append('status', status);

  try {
    const res = await fetch('/SIA-CMS/hospitaled/admin/php/announcement_create.php', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: status === 'published' ? 'Announcement Published!' : 'Saved as Draft!',
        text: 'Your announcement has been saved successfully.',
        showConfirmButton: false,
        timer: 1800
      });

      // Reset form
      document.querySelector('.announcement-form').reset();
      quill.root.innerHTML = '';
    } else {
      console.error(result);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Save',
        text: result.message || 'Something went wrong while saving the announcement.',
        confirmButtonColor: '#d33'
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Request Error',
      text: 'An unexpected error occurred while submitting.',
      confirmButtonColor: '#d33'
    });
  }
}

// ---- Sidebar Toggle (existing code) ----
function initSidebar() {
  const $sidebar = $('#sidebar');
  const $toggle = $('.toggle-sidebar');
  const $menuLabels = $sidebar.find('p');
  const $dropdowns = $sidebar.find('.side-dropdown');
  const $activeLink = $sidebar.find('a.active');

  function updateMenuLabels() {
    if ($sidebar.hasClass('hide')) $menuLabels.hide();
    else $menuLabels.show();
  }

  $toggle.on('click', e => {
    e.preventDefault();
    $sidebar.toggleClass('hide');
    updateMenuLabels();
    if ($sidebar.hasClass('hide')) {
      $dropdowns.removeClass('show');
      $sidebar.find('a').removeClass('active');
      $activeLink.addClass('active');
    } else {
      $activeLink.addClass('active');
    }
  });

  $dropdowns.each(function () {
    const $drop = $(this);
    const $a = $drop.parent().children('a:first');
    $a.on('click', e => {
      e.preventDefault();
      if (!$sidebar.hasClass('hide')) {
        const isActive = $a.hasClass('active');
        $dropdowns.removeClass('show');
        $sidebar.find('a').removeClass('active');
        if (!isActive) {
          $drop.addClass('show');
          $a.addClass('active');
        }
      }
    });
  });

  $sidebar.on('mouseenter', () => {
    if ($sidebar.hasClass('hide')) {
      $menuLabels.show();
      $activeLink.addClass('active');
    }
  });
  $sidebar.on('mouseleave', () => {
    if ($sidebar.hasClass('hide')) {
      $menuLabels.hide();
      $activeLink.addClass('active');
    }
  });

  updateMenuLabels();
}
