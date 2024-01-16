package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.metier.ProduitMetierInterface;
import soa.repository.ProduitRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitRESTController {

    private final ProduitMetierInterface produitMetier;
    private final ProduitRepository produitRepository;

    @Autowired
    public ProduitRESTController(ProduitMetierInterface produitMetier, ProduitRepository produitRepository) {
        this.produitMetier = produitMetier;
        this.produitRepository = produitRepository;
    }

    @GetMapping("/quantiteGreaterThanZeroGroupByDesignation")
    public List<Object[]> getProduitsQuantiteGreaterThanZeroGroupByDesignation() {
        return produitRepository.findByQuantiteGreaterThanZeroGroupByDesignation();
    }

    @GetMapping("/findAllProducts")
    public List<Produit> findAllProducts() {
        return produitMetier.listeProduits();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> findProduitById(@PathVariable Long id) {
        Optional<Produit> produitOptional = produitRepository.findById(id);
        return produitOptional.map(produit -> new ResponseEntity<>(produit, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Add other methods...

    @PostMapping("/add")
    public ResponseEntity<String> addProduit(@RequestBody Produit produit) {
        produitMetier.ajouterProduit(produit);
        return new ResponseEntity<>("Produit added successfully", HttpStatus.OK);
    }

    @PostMapping("/addWithCategory")
    public ResponseEntity<String> addProduitWithCategory(@RequestBody Produit produit, @RequestParam Categorie categoryId) {
       produitMetier.ajouterProduit(produit, categoryId);
       return new ResponseEntity<>("Produit added successfully with category", HttpStatus.OK);}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduitById(@PathVariable Long id) {
        produitMetier.deleteProduitById(id);
        return new ResponseEntity<>("Produit deleted successfully", HttpStatus.OK);
    }
}
