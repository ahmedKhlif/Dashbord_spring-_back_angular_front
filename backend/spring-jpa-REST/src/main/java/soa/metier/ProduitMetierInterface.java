package soa.metier;


import soa.entities.Categorie;
import soa.entities.Produit;
import soa.entities.Vente;


import java.util.Date;
import java.util.List;

public interface ProduitMetierInterface {

   boolean changerCategorieProduit(Long idProduit, Long idNouvelleCategorie );
   void ajouterProduit(Produit p);
   void ajouterProduit(Produit p, Categorie c);

   List<Produit> listeProduits();


   void ajouterVente(Vente vente);

   void deleteProduitById(Long id);

   void mettreAJourProduit(Long idProduit, String designation, double prix, int quantite, Date dateAchat, Long idCategorie);
}
