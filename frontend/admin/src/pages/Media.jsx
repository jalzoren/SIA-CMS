import { useEffect, useState } from "react";
import { FaUpload, FaEye, FaTrash, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";
import "../css/Media.css";

export default function Media() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/media/files`);
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const uploadFiles = async (fileList) => {
    const formData = new FormData();
    for (let file of fileList) formData.append("files", file);
    try {
      const response = await fetch(`${API_BASE}/api/media/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setFiles((prev) => [...data.files, ...prev]);
      setCurrentPage(1);
      Swal.fire({
        title: "✅ Success!",
        text: "Files uploaded successfully.",
        icon: "success",
        confirmButtonColor: "#043873",
        background: "#f3f7ff",
        color: "#043873",
      });
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem uploading your files.",
        icon: "error",
        confirmButtonColor: "#e11d48",
        background: "#f3f7ff",
        color: "#043873",
      });
    }
  };

  const handleFileUpload = (e) => uploadFiles(e.target.files);
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleView = (fileUrl, fileName) => {
    Swal.fire({
      title: fileName,
      html: `<img src="${fileUrl}" alt="${fileName}" style="max-width:100%; border-radius:10px;" />`,
      showCloseButton: true,
      showConfirmButton: false,
      background: "#f3f7ff",
      color: "#043873",
    });
  };

  const handleAssign = async (fileName) => {
    const { value: section } = await Swal.fire({
      title: "Assign File",
      html: `
        <div style="font-family: Inter, sans-serif;">
          <label style="font-weight: 600; color: #043873;">Choose Section:</label>
          <select id="assignSelect" style="width: 100%; padding: 10px; border: 1px solid #4f9cf9; border-radius: 8px;">
            <option value="">-- Select a Section --</option>
            <option value="section1">Section 1 - Home Carousel</option>
            <option value="section2">Section 2 - Picture</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Assign",
      preConfirm: () => {
        const val = document.getElementById("assignSelect").value;
        if (!val) {
          Swal.showValidationMessage("⚠️ Please select a section.");
          return false;
        }
        return val;
      },
    });
    if (section) {
      Swal.fire({
        title: "Assigned!",
        text: `${fileName} assigned to ${
          section === "section1"
            ? "Section 1 - Home Carousel"
            : "Section 2 - Picture"
        }.`,
        icon: "success",
        confirmButtonColor: "#043873",
        background: "#f3f7ff",
        color: "#043873",
      });
    }
  };

  const handleDelete = (filename) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_BASE}/api/media/delete/${filename}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Delete failed");
          setFiles((prev) => prev.filter((f) => f.filename !== filename));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been removed successfully.",
            icon: "success",
            confirmButtonColor: "#043873",
            background: "#f3f7ff",
            color: "#043873",
          });
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete file.",
            icon: "error",
            confirmButtonColor: "#e11d48",
            background: "#f3f7ff",
            color: "#043873",
          });
        }
      }
    });
  };

  const totalPages = Math.ceil(files.length / filesPerPage);
  const currentFiles = files.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  return (
    <div className="cms-media-page">
      <h2 className="title">Media Library</h2>
      <ul className="breadcrumbs">
        <li>Media Library</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      <div
        className="cms-card media-upload-card"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-area">
          <input
            type="file"
            id="mediaUpload"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            style={{ display: "none" }}
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

      <div className="cms-card media-table-card">
        <table className="media-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.length > 0 ? (
              currentFiles.map((file) => (
                <tr key={file.id || file.filename}>
                  <td>
                    {file.date_uploaded
                      ? new Date(file.date_uploaded).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{file.status}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="view"
                        onClick={() => handleView(file.url, file.name)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="assign"
                        onClick={() => handleAssign(file.name)}
                      >
                        <FaTag /> Assign
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(file.filename)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
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

        {totalPages > 1 && (
          <div className="media-pagination">
            <span
              className={currentPage === 1 ? "disabled" : ""}
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
            >
              ← Previous
            </span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span
              className={currentPage === totalPages ? "disabled" : ""}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            >
              Next →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
