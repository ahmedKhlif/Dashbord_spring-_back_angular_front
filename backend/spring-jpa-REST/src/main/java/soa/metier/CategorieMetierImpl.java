package soa.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.entities.Categorie;
import soa.repository.CategorieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieMetierImpl implements CategorieMetierInterface {

    @Autowired
    private CategorieRepository categorieRepository;

    @Override
    public void ajouterCategorie(Categorie c) {
        categorieRepository.save(c);
    }

    @Override
    public void deleteCategoryById(Long id) {
        categorieRepository.deleteById(id);
    }

    @Override
    public Categorie getCategoryById(Long id) {
        Optional<Categorie> optionalCategorie = categorieRepository.findById(id);
        return optionalCategorie.orElse(null);
    }

    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
}
