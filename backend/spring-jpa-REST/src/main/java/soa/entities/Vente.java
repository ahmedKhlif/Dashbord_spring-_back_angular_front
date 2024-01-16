    package soa.entities;

    import jakarta.persistence.*;

    import java.util.Date;

    @Entity
    public class Vente {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Temporal(TemporalType.TIMESTAMP)
        @Column(name = "date_vente")
        private Date dateVente;

        private int quantite;

        @ManyToOne
        @JoinColumn(name = "produit_id")
        private Produit produit;

        // Constructors, getters, setters, and other methods...

        public Vente() {
        }   

        public Vente(Date dateVente, int quantite, Produit produit) {
            this.dateVente = dateVente;
            this.quantite = quantite;
            this.produit = produit;
        }

        // Getters and setters...

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Date getDateVente() {
            return dateVente;
        }

        public void setDateVente(Date dateVente) {
            this.dateVente = dateVente;
        }

        public int getQuantite() {
            return quantite;
        }

        public void setQuantite(int quantite) {
            this.quantite = quantite;
        }

        public Produit getProduit() {
            return produit;
        }

        public void setProduit(Produit produit) {
            this.produit = produit;
        }
    }
