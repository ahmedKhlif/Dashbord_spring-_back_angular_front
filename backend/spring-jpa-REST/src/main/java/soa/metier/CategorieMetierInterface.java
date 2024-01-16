package soa.metier;

import soa.entities.Categorie;

import java.util.List;

public interface CategorieMetierInterface
{
    void ajouterCategorie(Categorie c);

    void deleteCategoryById(Long id);

    Categorie getCategoryById(Long id);

    List<Categorie> getAllCategories();
}
