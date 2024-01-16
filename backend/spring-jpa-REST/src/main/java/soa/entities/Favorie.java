// Facture.java
package soa.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Favorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Temporal(TemporalType.DATE)
    private Date date;

    // Constructors, getters, setters...

    public Favorie() {
    }

    public Favorie(Produit produit, Client client, Date date) {
        this.produit = produit;
        this.client = client;
        this.date = date;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
