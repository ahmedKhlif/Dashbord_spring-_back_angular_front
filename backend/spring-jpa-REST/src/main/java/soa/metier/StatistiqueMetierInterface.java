package soa.metier;

import soa.entities.Produit;

import java.util.List;

public interface StatistiqueMetierInterface {


    List<Produit> listeProduitsHorsStock();

    List<Object[]> getMostFavoredProductsGlobally();

    List<Object[]> getMostFavoredProductsByYear(int year);

    List<Object[]> produitsLesPlusVendusParAn(int year);

    List<Object[]> produitsLesPlusVendusGlobalement();

    List<Produit> listeProduitsEnStock() ;

    List<Object[]> listeProduitsVendue();

    List<Object[]> transformerListe(List<Object[]> evolutionVentesParProduit);



    List<String> afficherlisteProduitsVendue(List<Object[]> listeProduitsVendue);
}
