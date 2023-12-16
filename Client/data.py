import json

# Adjusted cargo-data.json with 5 cargos
cargo_data = [
    {"id": 1, "numero_cargaison": "CARGO1001", "produit": "Poisson", "lieu_maraillage": "Port A", "date_reception_quai": "2023-07-01", "usine_destination": "Usine A", "date_reception_usine": "2023-07-02", "numero_bon_livraison": "DLV1001", "transporteur": "Trans Co.", "type_cargaison": "Réfrigéré"},
    {"id": 2, "numero_cargaison": "CARGO1002", "produit": "Crustacés", "lieu_maraillage": "Port B", "date_reception_quai": "2023-07-03", "usine_destination": "Usine B", "date_reception_usine": "2023-07-04", "numero_bon_livraison": "DLV1002", "transporteur": "Trans Co.", "type_cargaison": "Congelé"},
    {"id": 3, "numero_cargaison": "CARGO1003", "produit": "Coquillages", "lieu_maraillage": "Port C", "date_reception_quai": "2023-07-05", "usine_destination": "Usine C", "date_reception_usine": "2023-07-06", "numero_bon_livraison": "DLV1003", "transporteur": "Trans Co.", "type_cargaison": "Frais"},
    {"id": 4, "numero_cargaison": "CARGO1004", "produit": "Calmar", "lieu_maraillage": "Port D", "date_reception_quai": "2023-07-07", "usine_destination": "Usine D", "date_reception_usine": "2023-07-08", "numero_bon_livraison": "DLV1004", "transporteur": "Trans Co.", "type_cargaison": "Vivant"},
    {"id": 5, "numero_cargaison": "CARGO1005", "produit": "Algues", "lieu_maraillage": "Port E", "date_reception_quai": "2023-07-09", "usine_destination": "Usine E", "date_reception_usine": "2023-07-10", "numero_bon_livraison": "DLV1005", "transporteur": "Trans Co.", "type_cargaison": "Sec"}
]

# Adjusted cargo-item-data.json with 5 items for each cargo
cargo_item_data = []
for i in range(1, 6):
    for j in range(1, 6):
        cargo_item_data.append({
            "id": f"{i}{j:02d}",
            "cargoID": i,
            "seq": f"SEQ{i}{j:02d}",
            "code_produit": f"PRDCT{i}{j:02d}",
            "description_produit": f"Article {j} du Cargo {i}",
            "quantite": j * 10,
            "taille": f"{j} kg",
            "temperature_moyenne": f"{j + 2}°C",
            "type_emballage": "Boîte",
            "code_chariot": f"CRT{i}{j:02d}",
            "destination": f"Destination {i}",
            "inspecteur": f"Inspecteur {i}",
            "date_inspection": f"2023-07-{i:02d}",
            "couleur_peau": "Coloré" if i % 2 else "Simple",
            "couleur_oeil": "Sombre" if j % 2 else "Clair",
            "odeur": "Poissonneux" if i < 3 else "Frais",
            "integrite_tentacules": True if j % 2 else False,
            "categorie": "A" if i < 4 else "B",
            "comment": f"Ceci est un commentaire pour l'article {j} du cargo {i}"
        })

# Write the JSON data to files
cargo_data_json = json.dumps(cargo_data, indent=2)
cargo_item_data_json = json.dumps(cargo_item_data, indent=2)

# Save the JSON data to corresponding files
with open('cargo-data.json', 'w') as f:
    f.write(cargo_data_json)
with open('cargo-item-data.json', 'w') as f:
    f.write(cargo_item_data_json)