import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CargoItemDetailPage.css';

const CargoItemDetailPage = () => {
    const [itemDetails, setItemDetails] = useState(null);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        // Fetch the specific cargo item details by itemID
        fetch('/cargo-item-data.json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const selectedItem = data.find((item) => parseInt(item.id) === parseInt(id));
                setItemDetails(selectedItem);
                console.log(selectedItem);
            })
            .catch((error) => console.error("Failed to load cargo item details", error));
    }, [id]);

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cargo-item-detail-container">
            <h1>Cargo Item Details: {itemDetails.code_produit}</h1>
            <div className="details-block">
                <h2>Données identifications</h2>
                <p><strong>Seq#:</strong> {itemDetails.seq}</p>
                <p><strong>Code produit:</strong> {itemDetails.code_produit}</p>
                <p><strong>Description produit:</strong> {itemDetails.description_produit}</p>
                <p><strong>Quantité:</strong> {itemDetails.quantite}</p>
                <p><strong>Taille:</strong> {itemDetails.taille}</p>
                <p><strong>Temp° Moyenne:</strong> {itemDetails.temperature_moyenne}</p>
                <p><strong>Type d'emballage:</strong> {itemDetails.type_emballage}</p>
                <p><strong>Code du Chariot:</strong> {itemDetails.code_chariot}</p>
                <p><strong>Destination:</strong> {itemDetails.destination}</p>
            </div>
            <div className="details-block">
                <h2>Données Organoleptiques</h2>
                <p><strong>Inspecteur:</strong> {itemDetails.inspecteur}</p>
                <p><strong>Date D'inspection:</strong> {itemDetails.date_inspection}</p>
                <p><strong>Couleur Peau:</strong> {itemDetails.couleur_peau}</p>
                <p><strong>Couleur œil:</strong> {itemDetails.couleur_oeil}</p>
                <p><strong>Odeur:</strong> {itemDetails.odeur}</p>
                <p><strong>Intégrité tentacules:</strong> {itemDetails.integrite_tentacules ? 'Oui' : 'Non'}</p>
                <p><strong>Categorie:</strong> {itemDetails.categorie}</p>
            </div>
            <div className="details-block">
                <h2>Observation</h2>
                <p><strong>Comment:</strong> {itemDetails.comment}</p>
            </div>
        </div>
    );
}

export default CargoItemDetailPage;