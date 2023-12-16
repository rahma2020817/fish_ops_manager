import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Import the CSS file for styling
import './CargoItemForm.css';

const CargoItemForm = () => {
    const { id } = useParams();
    const cargoID = id;

    const [itemData, setItemData] = useState({
        cargoID: cargoID,
        seq: '',
        code_produit: '',
        description_produit: '',
        quantite: '',
        taille: '',
        temperature_moyenne: '',
        type_emballage: '',
        code_chariot: '',
        destination: '',
        inspecteur: '',
        date_inspection: '',
        couleur_peau: '',
        couleur_oeil: '',
        odeur: '',
        integrite_tentacules: false,
        categorie: '',
        comment: '',
    });


    const handleChange = (e) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(itemData);
        // Simulate file update - in a real app, you would send this to a server
        const fileData = JSON.stringify(itemData, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cargo-item-data.json';
        link.click();
    };

    return (
        <div className="cargo-item-form-container">
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit} className="form-blocks">
                <div className="form-block">
                    <h3>Données identifications</h3>
                    <input
                        type="text"
                        name="seq"
                        placeholder="Seq#"
                        value={itemData.seq}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="code_produit"
                        placeholder="Code du Produit"
                        value={itemData.code_produit}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description_produit"
                        placeholder="Description du Produit"
                        value={itemData.description_produit}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="quantite"
                        placeholder="Quantité"
                        value={itemData.quantite}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="taille"
                        placeholder="Taille"
                        value={itemData.taille}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='temperature_moyenne'
                        placeholder='Temp° Moyenne'
                        value={itemData.temperature_moyenne}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="type_emballage"
                        placeholder="Type d'emballage"
                        value={itemData.type_emballage}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="code_chariot"
                        placeholder="Code du Chariot"
                        value={itemData.code_chariot}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        value={itemData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-block">
                    <h3>Données Organoleptiques</h3>
                    <input
                        type="text"
                        name="inspecteur"
                        placeholder="Inspecteur"
                        value={itemData.inspecteur}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="date_inspection"
                        placeholder="Date D'inspection"
                        value={itemData.date_inspection}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="couleur_peau"
                        placeholder="Couleur Peau"
                        value={itemData.couleur_peau}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="couleur_oeil"
                        placeholder="Couleur œil"
                        value={itemData.couleur_oeil}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="odeur"
                        placeholder="Odeur"
                        value={itemData.odeur}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="integrite_tentacules">Intégrité tentacules:</label>
                    <select
                        name="integrite_tentacules"
                        value={itemData.integrite_tentacules}
                        onChange={handleChange}
                        required
                    >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                    <input
                        type="text"
                        name="categorie"
                        placeholder="Categorie"
                        value={itemData.categorie}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-block">
                    <h3>Observation</h3>
                    <textarea
                        name="comment"
                        value={itemData.comment}
                        onChange={handleChange}
                        placeholder="Comment"
                        required
                    />
                </div>
                <button type="submit">Submit Item</button>
            </form>
        </div>
    );
}

export default CargoItemForm;
