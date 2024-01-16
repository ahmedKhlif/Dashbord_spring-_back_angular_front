package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soa.entities.Produit;
import soa.metier.StatistiqueMetierInterface;

import java.util.List;

@RestController
@RequestMapping("/dashbord") // http://localhost:8081/dashbord
@CrossOrigin(origins = "http://localhost:4200")
public class StatistiqueRESTController {

    private final StatistiqueMetierInterface statistiqueMetier;

    public StatistiqueRESTController(StatistiqueMetierInterface statistiqueMetier) {
        this.statistiqueMetier = statistiqueMetier;
    }

    @GetMapping("/produitsLesPlusVendusGlobalement")
    public List<Object[]> getProduitsLesPlusVendusGlobalement() {
        return statistiqueMetier.produitsLesPlusVendusGlobalement();
    }

    @GetMapping("/produitsLesPlusVendusParAn")
    public List<Object[]> getProduitsLesPlusVendusParAn(@RequestParam int year) {
        return statistiqueMetier.produitsLesPlusVendusParAn(year);
    }

    @GetMapping("/listeProduitsEnStock")
    public List<Produit> getListeProduitsEnStock() {
        return statistiqueMetier.listeProduitsEnStock();
    }
    @GetMapping("/listeProduitsHorsStock")
    public List<Produit> listeProduitsHorsStock() {
        return statistiqueMetier.listeProduitsHorsStock();
    }

    @GetMapping("/listeProduitsVendue")
    public List<Object[]> getListeProduitsVendue() {
        return statistiqueMetier.listeProduitsVendue();
    }

    // You can add more endpoints based on your business requirements
    @GetMapping("/produitsLesPlusFavorisGlobalement")
    public List<Object[]> getProduitsLesPlusFavorisGlobalement() {
        return statistiqueMetier.getMostFavoredProductsGlobally();
    }

    @GetMapping("/produitsLesPlusFavorisParAn")
    public List<Object[]> getProduitsLesPlusFavorisParAn(@RequestParam int year) {
        return statistiqueMetier.getMostFavoredProductsByYear(year);
    }



}
