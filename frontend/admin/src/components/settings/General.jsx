import { FaUpload } from "react-icons/fa";

export default function General() {
  return (
    <div className="cms-card">
      <h3 className="cms-section-title">General Settings</h3>
      <div className="row">
        <div className="col-md-6">
          <label>Site Name / Title</label>
          <input type="text" placeholder="Enter site title" />
        </div>
        <div className="col-md-6">
          <label>Tagline / Description</label>
          <input type="text" placeholder="Enter tagline" />
        </div>

        <div className="col-md-6 mt-3">
          <label>Favicon Upload</label>
          <div className="upload-btn">
            <button className="btn btn-primary">
              <FaUpload /> Upload
            </button>
            <small>Upload favicon (16×16 or 32×32)</small>
          </div>
        </div>

        <div className="col-md-6 mt-3">
          <label>Logo Upload</label>
          <div className="upload-btn">
            <button className="btn btn-primary">
              <FaUpload /> Upload
            </button>
            <small>Upload your site logo (PNG, JPG)</small>
          </div>
        </div>

        <div className="col-md-6 mt-3">
          <label>Default Language</label>
          <select>
            <option>Select language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>Filipino</option>
          </select>
        </div>

        <div className="col-md-6 mt-3">
          <label>Timezone / Date Format</label>
          <select>
            <option>Select a Timezone</option>
            <option>GMT</option>
            <option>PST</option>
            <option>EST</option>
          </select>
          <div className="mt-2 d-flex gap-3">
            <label>
              <input type="radio" name="dateformat" /> MM/DD/YYYY
            </label>
            <label>
              <input type="radio" name="dateformat" /> DD/MM/YYYY
            </label>
          </div>
        </div>

        

        <div className="mt-4 d-flex gap-3 w-50">
          <button className="btn btn-primary w-5">Save Changes</button>
          <button className="btn btn-secondary w-5">Cancel</button>
        </div>
      </div>
    </div>
  );
}
