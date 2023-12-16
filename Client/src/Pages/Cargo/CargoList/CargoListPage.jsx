import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CargoListPage.css'; // Make sure to create and import your stylesheet

const CargoListPage = () => {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    // Fetch the local cargo-data.json file
    fetch('/cargo-data.json')
      .then((res) => res.json())
      .then((data) => setCargos(data))
      .catch(error => console.error("Failed to load cargo data", error));
    }, []);

    return (
        <div className="cargo-list-container">
          <h1>Cargo List</h1>
          <ul className="cargo-list">
            {cargos.map(cargo => (
              <li key={cargo.id}>
                <Link to={`/cargo/${cargo.id}`}>
                {cargo.produit} - {cargo.numero_cargaison}
                </Link>
                </li>
            ))}
            </ul>
            <Link to="/cargo/add" className="add-cargo-btn">Add New Cargo</Link>
            </div>
    );
}

export default CargoListPage;