package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import soa.entities.Vente;

import java.util.List;

public interface VenteRepository extends JpaRepository<Vente, Long> {

    @Query("SELECT v.produit.designation, v.quantite, v.dateVente " +
            "FROM Vente v " +
            "ORDER BY v.dateVente DESC")
    List<Object[]> listeProduitsVendue();
    @Query("SELECT p.designation, SUM(v.quantite) as totalQuantiteVendue " +
            "FROM Vente v JOIN v.produit p " +
            "GROUP BY p.designation " +
            "ORDER BY totalQuantiteVendue DESC")
    List<Object[]> produitsLesPlusVendusGlobalement();
    @Query("SELECT p.designation, SUM(v.quantite)  as totalQuantiteVendue " +
            "FROM Vente v JOIN v.produit p " +
            "WHERE YEAR(v.dateVente) = :year " +
            "GROUP BY p.designation " +
            "ORDER BY totalQuantiteVendue DESC")
    List<Object[]> produitsLesPlusVendusParAn(int year);
}
