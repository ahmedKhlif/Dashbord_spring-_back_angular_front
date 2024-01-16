package soa;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.entities.Vente;
import soa.metier.CategorieMetierInterface;
import soa.metier.ProduitMetierInterface;
import soa.metier.StatistiqueMetierInterface;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class SpringJpaApplication2 {

    public static void main(String[] args) {
        SpringApplication.run(SpringJpaApplication2.class, args);
    }

    @Bean
    public CommandLineRunner demo(
            CategorieMetierInterface categorieMetier,
            ProduitMetierInterface produitMetier,
            StatistiqueMetierInterface statistiqueMetier
    ) {
        return args -> {
            // Add some static data for testing


            // Test CategorieMetierInterface methods
            System.out.println("Liste des catégories:");
            categorieMetier.getAllCategories().forEach(System.out::println);

            // Test ProduitMetierInterface methods
            System.out.println("\nListe des produits:");

            // Test StatistiqueMetierInterface methods
            System.out.println("\nProduits les plus vendus globalement:");
            statistiqueMetier.produitsLesPlusVendusGlobalement().forEach(result -> {
                System.out.println(result[0] + " - " + result[1]);
            });

            System.out.println("\nProduits les plus vendus par an (2022):");
            statistiqueMetier.produitsLesPlusVendusParAn(2022).forEach(result -> {
                System.out.println(result[0] + " - " + result[1]);
            });
            System.out.println("\nListe des produits en stock:");
            statistiqueMetier.listeProduitsEnStock().forEach(System.out::println);
            System.out.println("\nListe des produits hors stock:");
            statistiqueMetier.listeProduitsHorsStock().forEach(System.out::println);
            // Add more test scenarios and method calls as needed

            // Test new methods related to favorites
            System.out.println("\nProduits les plus favorisés globalement:");
            statistiqueMetier.getMostFavoredProductsGlobally().forEach(result -> {
                System.out.println(result[0] + " - " + result[1]);
            });

            System.out.println("\nProduits les plus favorisés par an (2023):");
            statistiqueMetier.getMostFavoredProductsByYear(2023).forEach(result -> {
                System.out.println(result[0] + " - " + result[1]);
            });
        };
    }


        };



