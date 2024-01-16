package soa.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.repository.CategorieRepository;
import soa.repository.FavorieRepository;
import soa.repository.ProduitRepository;
import soa.repository.VenteRepository;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatistiqueMetierImpl implements StatistiqueMetierInterface {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final VenteRepository venteRepository;
    private final FavorieRepository favorieRepository;

    //Method to get most favored products globally

    @Autowired
    public StatistiqueMetierImpl(ProduitRepository produitRepository,
                                 CategorieRepository categorieRepository,
                                 VenteRepository venteRepository, FavorieRepository favorieRepository) {
        this.produitRepository = produitRepository;
        this.categorieRepository = categorieRepository;
        this.venteRepository = venteRepository;
        this.favorieRepository = favorieRepository;
    }


    @Override
    public List<Object[]> getMostFavoredProductsGlobally() {
        return favorieRepository.findMostFavoredProductsGlobally();
    }
    @Override
    public List<Object[]> getMostFavoredProductsByYear(int year) {
        return favorieRepository.findMostFavoredProductsByYear(year);
    }
    @Override
    public List<Object[]> produitsLesPlusVendusParAn(int year) {
        return venteRepository.produitsLesPlusVendusParAn(year);
    }


    @Override
    public List<Object[]> produitsLesPlusVendusGlobalement() {
        return venteRepository.produitsLesPlusVendusGlobalement();
    }

    @Override
    public List<Produit> listeProduitsEnStock() {
        // Retrieve products in stock and group by designation
        List<Object[]> stockByDesignation = produitRepository.findByQuantiteGreaterThanZeroGroupByDesignation();

        // Convert the result to a list of Produit objects
        return transformToObjectList(stockByDesignation);
    }

    @Override
    public List<Produit> listeProduitsHorsStock() {
        // Retrieve products out of stock and group by designation
        List<Object[]> outOfStockByDesignation = produitRepository.findByQuantiteLessThanZeroGroupByDesignation();

        // Convert the result to a list of Produit objects
        return transformToObjectList(outOfStockByDesignation);
    }

    private List<Produit> transformToObjectList(List<Object[]> resultList) {
        return resultList.stream()
                .map(result -> {
                    String designation = (String) result[0];
                    // You may need to adjust the index based on your query
                    int sumQuantite = ((Number) result[1]).intValue();

                    Produit produit = new Produit();
                    produit.setDesignation(designation);
                    produit.setQuantite(sumQuantite);

                    return produit;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Object[]> listeProduitsVendue() {
        return venteRepository.listeProduitsVendue();
    }

    @Override
    public List<Object[]> transformerListe(List<Object[]> listeProduitsVendue) {
        return listeProduitsVendue.stream()
                .map(resultat -> {
                    String nomProduit = (String) resultat[0];
                    int anneeMois = Integer.parseInt(resultat[1].toString());
                    int annee = anneeMois / 100;
                    int mois = anneeMois % 100;
                    YearMonth yearMonth = YearMonth.of(annee, mois);
                    int quantiteVendue = ((Number) resultat[2]).intValue();
                    return new Object[]{nomProduit, yearMonth, quantiteVendue};
                })
                .collect(Collectors.toList());
    }


    @Override
    public List<String> afficherlisteProduitsVendue(List<Object[]> listeProduitsVendue) {
        return listeProduitsVendue.stream()
                .map(resultat -> {
                    String nomProduit = (String) resultat[0];
                    int anneeMois = Integer.parseInt(resultat[1].toString());
                    int annee = anneeMois / 100;
                    int mois = anneeMois % 100;
                    YearMonth yearMonth = YearMonth.of(annee, mois);
                    int quantiteVendue = ((Number) resultat[2]).intValue();

                    return "Produit : " + nomProduit + ", AnnéeMois : " + yearMonth + ", Quantité vendue : " + quantiteVendue;
                })
                .collect(Collectors.toList());
    }



}
