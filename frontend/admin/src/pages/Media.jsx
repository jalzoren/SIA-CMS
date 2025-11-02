import { useState } from "react";
import { FaUpload, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import "../css/Media.css";

export default function Media() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;

  // handle file upload
  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files).map((file) => ({
      fileObject: file,
      name: file.name,
      date: new Date().toLocaleDateString(),
      size: (file.size / 1024).toFixed(1) + " KB",
      status: "Active",
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...uploaded]);
    setCurrentPage(1); // reset to first page
  };

  // DELETE CONFIRMATION
  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This file will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#4f9cf9",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#f3f7ff",
      color: "#043873",
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        URL.revokeObjectURL(files[index].url);
        setFiles((prev) => prev.filter((_, i) => i !== index));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been removed successfully.",
          icon: "success",
          confirmButtonColor: "#043873",
          background: "#f3f7ff",
          color: "#043873",
        });
      }
    });
  };

  // ASSIGN FILE
  const handleAssign = async (fileName) => {
    const { value: section } = await Swal.fire({
      title: "Assign File",
      html: `
        <div style="
          font-family: Inter, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          text-align: left;
        ">
          <label style="font-weight: 600; color: #043873; margin-bottom: 8px;">
            Choose Section:
          </label>
          <select id="assignSelect" style="
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #4f9cf9;
            border-radius: 8px;
            background-color: #ffffff;
            font-size: 14px;
            color: #043873;
            outline: none;
          ">
            <option value="">-- Select a Section --</option>
            <option value="section1">Section 1 - Home Carousel</option>
            <option value="section2">Section 2 - Picture</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Assign",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#043873",
      cancelButtonColor: "#4f9cf9",
      background: "#f3f7ff",
      color: "#043873",
      preConfirm: () => {
        const selected = document.getElementById("assignSelect").value;
        if (!selected) {
          Swal.showValidationMessage("⚠️ Please select a section before assigning.");
          return false;
        }
        return selected;
      },
    });

    if (section) {
      Swal.fire({
        title: "Assigned!",
        text: `${fileName} has been assigned to ${
          section === "section1" ? "Section 1 - Home Carousel" : "Section 2 - Picture"
        }.`,
        icon: "success",
        confirmButtonColor: "#043873",
        background: "#f3f7ff",
        color: "#043873",
      });
    }
  };

  // VIEW IMAGE
  const handleView = (fileUrl, fileName) => {
    Swal.fire({
      title: fileName,
      imageUrl: fileUrl,
      imageAlt: fileName,
      showCloseButton: true,
      showConfirmButton: false,
      background: "#f3f7ff",
      color: "#043873",
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(files.length / filesPerPage);
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="cms-media-page">
      <h2 className="title">Media Library</h2>
      <ul className="breadcrumbs">
        <li>Media Library</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      <div className="cms-card media-upload-card">
        <div className="upload-area">
          <input
            type="file"
            id="mediaUpload"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
          <label htmlFor="mediaUpload" className="upload-box">
            <FaUpload className="upload-icon" />
            <p>
              <strong>Drag and Drop Files</strong> or <span>Browse</span>
            </p>
            <small>Supported formats: jpg and png</small>
          </label>
        </div>
      </div>

      <div className="cms-card media-filter-card">
        <div className="media-filters">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <FaSearch className="search-icon" />
          </div>
          <select>
            <option>Active Uploads</option>
            <option>Archived</option>
          </select>
          <select>
            <option>Sort by Upload: Manual</option>
            <option>Sort by Upload: Automatic</option>
          </select>
          <select>
            <option>Sort by: Newest First</option>
            <option>Sort by: Oldest First</option>
          </select>
        </div>
      </div>

      <div className="cms-card media-table-card">
        <table className="media-table">
          <thead>
            <tr>
              <th>Upload Date</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.length > 0 ? (
              currentFiles.map((file, i) => (
                <tr key={indexOfFirstFile + i}>
                  <td>{file.date}</td>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{file.status}</td>
                  <td className="table-actions">
                    <button
                      onClick={() => handleView(file.url, file.name)}
                      style={{
                        backgroundColor: "#4f9cf9",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                    <button
                      className="assign"
                      onClick={() => handleAssign(file.name)}
                      style={{
                        backgroundColor: "#043873",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Assign
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(indexOfFirstFile + i)}
                      style={{
                        backgroundColor: "#e11d48",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-records">
                  No uploads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Custom Pagination */}
        <div className="media-pagination">
          <span
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          >
            ← Previous
          </span>

          {[...Array(totalPages)].map((_, i) => {
            if (i < 3 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage)) {
              return (
                <span
                  key={i}
                  className={`page ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </span>
              );
            } else if (i === 3 && currentPage > 4) {
              return <span key="dots1">...</span>;
            } else if (i === totalPages - 2 && currentPage < totalPages - 3) {
              return <span key="dots2">...</span>;
            } else return null;
          })}

          <span
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
          >
            Next →
          </span>
        </div>
      </div>
    </div>
  );
}
