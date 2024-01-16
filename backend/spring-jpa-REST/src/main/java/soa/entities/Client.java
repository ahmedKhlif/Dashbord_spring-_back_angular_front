package soa.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Client {
    @Id
    @GeneratedValue
    private Long id;

    private String adresse;
    private String nom;
    private String prenom;
    private String numero;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorie> Favories;

    // Constructors, getters, setters...

    public Client() {
        // Default constructor
    }

    public Client(String adresse, String nom, String prenom, String numero) {
        this.adresse = adresse;
        this.nom = nom;
        this.prenom = prenom;
        this.numero = numero;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public List<Favorie> getFavories() {
        return Favories;
    }

    public void setFavories(List<Favorie> factures) {
        this.Favories = factures;
    }

    // toString method for debugging and logging

    @Override
    public String toString() {
        return "Client [id=" + id + ", adresse=" + adresse + ", nom=" + nom + ", prenom=" + prenom + ", numero="
                + numero + "]";
    }
}
