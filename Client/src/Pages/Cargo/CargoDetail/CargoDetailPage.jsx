import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CargoDetailPage.css';

const CargoDetailPage = () => {
    const [cargo, setCargo] = useState(null);
    const [cargoItems, setCargoItems] = useState([]);
    const { id } = useParams(); // This gets the `id` param from the URL

    useEffect(() => {
        // Fetch the specific cargo details by ID
        fetch(`/cargo-data.json`)
            .then((response) => response.json())
            .then((data) => {
                const selectedCargo = data.find((c) => c.id === parseInt(id));
                setCargo(selectedCargo);
                // Now fetch the cargo items from the separate JSON
                return fetch('/cargo-item-data.json');
            })
            .then((response) => response.json())
            .then((itemData) => {
                const relatedItems = itemData.filter((item) => parseInt(item.cargoID) === parseInt(id));
                setCargoItems(relatedItems);
            })
            .catch((error) => console.error("Failed to load cargo details", error));
    }, [id]);

    if (!cargo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cargo-detail-container">
            <h1>Cargo Details: {cargo.produit}</h1>
            <div className="cargo-details">
                <div className="cargo-info">
                    <h2>Cargo Info</h2>
                    <p><strong>N° Cargaison:</strong> {cargo.numero_cargaison}</p>
                    <p><strong>Produit:</strong> {cargo.produit}</p>
                    <p><strong>Lieu de Maraillage:</strong> {cargo.lieu_maraillage}</p>
                    <p><strong>Date de reception au quai:</strong> {cargo.date_reception_quai}</p>
                    <p><strong>Usine de destination:</strong> {cargo.usine_destination}</p>
                    <p><strong>Date de reception à l'usine:</strong> {cargo.date_reception_usine}</p>
                    <p><strong>N° Bon de livraison:</strong> {cargo.numero_bon_livraison}</p>
                    <p><strong>Transporteur:</strong> {cargo.transporteur}</p>
                    <p><strong>Type de cargaison:</strong> {cargo.type_cargaison}</p>
                </div>
                <br />
                <div className="cargo-items">
                    <h2>Cargo Items</h2>
                    <div className="cargo-item-container">
                        {cargoItems.map((item) => (
                            <div className="cargo-item-card" key={item.id}>
                                <Link to={`/cargo/item/${item.id}`} className="cargo-item-link">
                                    <div className="card-header">
                                        {item.code_produit}
                                    </div>
                                    <div className="card-body">
                                        {item.description_produit}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link to={`/cargo/item/add/${id}`} className="add-item-btn">
                Add New Cargo Item
            </Link>
        </div>
    );
}

export default CargoDetailPage;