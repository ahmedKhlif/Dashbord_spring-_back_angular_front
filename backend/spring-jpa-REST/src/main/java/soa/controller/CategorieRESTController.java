    package soa.controller;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import soa.entities.Categorie;
    import soa.metier.CategorieMetierInterface;

    import java.util.List;

    @RestController
    @RequestMapping("/categories")
    @CrossOrigin(origins = "http://localhost:4200")
    public class CategorieRESTController {

        @Autowired
        private CategorieMetierInterface categorieMetier;

        // Endpoint to retrieve all categories
        @GetMapping
        public ResponseEntity<List<Categorie>> getAllCategories() {
            List<Categorie> categories = categorieMetier.getAllCategories(); // call your service method to get all categories
            return ResponseEntity.ok(categories);
        }

        // Endpoint to retrieve a category by ID
        @GetMapping("/{id}")
        public ResponseEntity<Categorie> getCategoryById(@PathVariable Long id) {
            Categorie categorie = categorieMetier.getCategoryById(id); // call your service method to get a category by ID
            if (categorie != null) {
                return ResponseEntity.ok(categorie);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        // Endpoint to add a new category
        @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<Void> addCategory(@RequestBody Categorie categorie) {
            // call your service method to add a new category
            categorieMetier.ajouterCategorie(categorie);
            return ResponseEntity.status(201).build();
        }

        // Endpoint to update an existing category
        @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<Void> updateCategory(@PathVariable Long id, @RequestBody Categorie categorie) {
            // call your service method to update an existing category
            // you may want to add logic to check if the category with the given ID exists
            // and handle the case where it doesn't
            return ResponseEntity.noContent().build();
        }

        // Endpoint to delete a category by ID
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
            // call your service method to delete a category by ID
            categorieMetier.deleteCategoryById(id);
            return ResponseEntity.noContent().build();
        }
    }
