import React, { useState } from 'react';
import './CargoForm.css';

const CargoForm = () => {
    const [formData, setFormData] = useState({
        numero_cargaison: '',
        produit: '',
        lieu_maraillage: '',
        date_reception_quai: '',
        usine_destination: '',
        date_reception_usine: '',
        numero_bon_livraison: '',
        transporteur: '',
        type_cargaison: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Simulate file update - in a real app, you would send this to a server
        const fileData = JSON.stringify(formData, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cargo-data.json';
        link.click();
      };

    return (
        <div className="cargo-form-container">
            <h2>Add New Cargo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="numero_cargaison"
                    placeholder="N° Cargaison"
                    value={formData.numero_cargaison}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="produit"
                    placeholder="Produit"
                    value={formData.produit}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lieu_maraillage"
                    placeholder="Lieu de Maraillage"
                    value={formData.lieu_maraillage}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date_reception_quai"
                    placeholder="Date de Reception à Quai"
                    value={formData.date_reception_quai}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="usine_destination"
                    placeholder="Usine de Destination"
                    value={formData.usine_destination}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date_reception_usine"
                    placeholder="Date de Reception Usine"
                    value={formData.date_reception_usine}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="numero_bon_livraison"
                    placeholder="N°Bon de Livraison"
                    value={formData.numero_bon_livraison}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="transporteur"
                    placeholder="Transporteur"
                    value={formData.transporteur}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="type_cargaison"
                    placeholder="Type de Cargaison"
                    value={formData.type_cargaison}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CargoForm;