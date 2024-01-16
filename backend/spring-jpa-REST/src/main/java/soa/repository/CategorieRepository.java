package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import soa.entities.Categorie;

import java.util.List;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    // Custom query to find categories by libelle
    @Query("select c from Categorie c where c.libelle like %:x% ")
    public List<Categorie> findByLibelle(@Param("x") String libelle);

    // Custom update query for libelle
    @Query("update Categorie c set c.libelle =:libelle where c.id = :id")
    @Modifying
    @Transactional
    public int mettreAJourLibelle(@Param("libelle") String libelle, @Param("id") Long idCategorie);

    // Additional custom queries can be added based on your requirements

    // Delete a category by id
    @Modifying
    @Query("DELETE FROM Categorie c WHERE c.id = :id")
    void deleteCategorieById(@Param("id") Long id);
}