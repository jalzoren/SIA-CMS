import { useEffect, useState } from "react";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServicesData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="title-center mb-4">Our <span className="title-primary">Services</span></h2>
      <div className="row g-4">
        {servicesData.map((service, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="service-card bg-light p-3 rounded-4 shadow-sm">
              {service.image_url && <img src={service.image_url} alt="" className="img-fluid rounded mb-3" />}
              <h3>{service.short_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
              <p className="text-muted small">{new Date(service.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
