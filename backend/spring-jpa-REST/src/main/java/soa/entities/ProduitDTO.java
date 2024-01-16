package soa.entities;

public  class ProduitDTO {
    private String produit;
    private int quantiteSold;

    // Constructors, getters, and setters...

    // Example: You can add more fields if needed, such as price, revenue, etc.
    public ProduitDTO() {
    }

    public ProduitDTO(String produit, int quantiteSold) {
        this.produit = produit;
        this.quantiteSold = quantiteSold;
    }

    public String getProduit() {
        return produit;
    }

    public void setProduit(String produit) {
        this.produit = produit;
    }

    public int getQuantiteSold() {
        return quantiteSold;
    }

    public void setQuantiteSold(int quantiteSold) {
        this.quantiteSold = quantiteSold;
    }
}