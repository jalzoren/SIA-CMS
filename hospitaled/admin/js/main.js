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
