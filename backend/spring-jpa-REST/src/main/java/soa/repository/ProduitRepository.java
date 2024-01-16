package soa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import soa.entities.Categorie;
import soa.entities.Produit;


public interface ProduitRepository extends JpaRepository<Produit, Long> {

	@Query("update Produit p set p.designation = :designation, p.prix = :prix, p.quantite = :quantite, p.date_achat = :dateAchat, p.categorie = :categorie where p.id = :id")
	@Modifying
	@Transactional
	public int mettreAJourProduit(@Param("designation") String designation,
								  @Param("prix") double prix,
								  @Param("quantite") int quantite,
								  @Param("dateAchat") Date dateAchat,
								  @Param("categorie") Categorie categorie,
								  @Param("id") Long idProduit);


	@Query("SELECT p.designation, SUM(p.quantite) FROM Produit p WHERE p.quantite > 0 GROUP BY p.designation")
	List<Object[]> findByQuantiteGreaterThanZeroGroupByDesignation();
	@Query("SELECT p FROM Produit p")
	List<Produit> findAllProducts();

	@Query("SELECT p.designation, SUM(p.quantite) FROM Produit p WHERE p.quantite = 0 GROUP BY p.designation")
	List<Object[]> findByQuantiteLessThanZeroGroupByDesignation();

	@Query("select p from Produit p where p.designation like %:x% ")
	public List<Produit> findByDesignation(@Param("x") String mc);

	@Query("select p from Produit p where p.designation like %:x% and p.prix > :y")
	public List<Produit> findByDesignationAndPrix(@Param("x") String mc, @Param("y") double prix);

	@Query("update Produit p set p.designation =:designation where p.id = :id")
	@Modifying
	@Transactional
	public int mettreAJourDesignation(@Param("designation") String designation, @Param("id") Long idProduit);



	@Modifying
	@Query("DELETE FROM Produit p WHERE p.id = :id")
	void deleteProduitById(@Param("id") Long id);
}
