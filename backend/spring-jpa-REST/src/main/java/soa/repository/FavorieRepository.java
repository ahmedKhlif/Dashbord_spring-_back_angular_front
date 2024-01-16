package soa.repository;// FavorieRepository.java

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import soa.entities.Favorie;

import java.util.List;

public interface FavorieRepository extends JpaRepository<Favorie, Long> {

    // Query to find most favored products globally
    @Query(value = "SELECT f.produit.designation, COUNT(f.produit) AS favCount FROM Favorie f GROUP BY f.produit.designation ORDER BY favCount DESC")
    List<Object[]> findMostFavoredProductsGlobally();


    // Query to find most favored products by year
    @Query("SELECT f.produit.designation, COUNT(f.produit) AS favCount, month(f.date) as monthFav FROM Favorie f WHERE YEAR(f.date) = :year GROUP BY  f.produit.designation ORDER BY favCount DESC")
    List<Object[]> findMostFavoredProductsByYear(@Param("year") int year);
}
