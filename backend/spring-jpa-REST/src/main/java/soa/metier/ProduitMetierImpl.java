package soa.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.entities.Vente;
import soa.repository.CategorieRepository;
import soa.repository.ProduitRepository;
import soa.repository.VenteRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitMetierImpl implements ProduitMetierInterface {

    @Autowired
    ProduitRepository produitRepository;

    @Autowired
    CategorieRepository categorieRepository;

    @Autowired
    private VenteRepository venteRepository;

    @Override
    public boolean changerCategorieProduit(Long idProduit, Long idNouvelleCategorie) {
        Produit p = produitRepository.findById(idProduit).orElse(null);
        Categorie c = categorieRepository.findById(idNouvelleCategorie).orElse(null);
        if (p != null && c != null) {
            p.setCategorie(c);
            produitRepository.save(p);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void ajouterProduit(Produit p) {
        produitRepository.save(p);
    }

    @Override
    public void ajouterProduit(Produit p, Categorie c) {
        // Make sure the category is saved before associating it with the product
        categorieRepository.save(c);

        // Associate the product with the category
        p.setCategorie(c);

        // Save the product
        produitRepository.save(p);
    }

    @Override
    public List<Produit> listeProduits() {
        return produitRepository.findAllProducts();
    }

    @Override
    public void ajouterVente(Vente vente) {
        venteRepository.save(vente);
    }

    @Override
    public void deleteProduitById(Long id) {
        Optional<Produit> produitOptional = produitRepository.findById(id);
        produitOptional.ifPresent(produitRepository::delete);
    }

    @Override
    public void mettreAJourProduit(Long idProduit, String designation, double prix, int quantite, Date dateAchat, Long idCategorie) {
        Categorie categorie = categorieRepository.findById(idCategorie).orElse(null);
        produitRepository.mettreAJourProduit(designation, prix, quantite, dateAchat, categorie, idProduit);
    }


}
