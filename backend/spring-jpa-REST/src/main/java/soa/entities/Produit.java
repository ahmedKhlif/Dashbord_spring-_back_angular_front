package soa.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Produit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50)
	private String designation;

	@Column(length = 50)
	private String code;

	private double prix;
	private int quantite;

	@Temporal(TemporalType.DATE)
	@Column(name = "date_achat")
	private Date date_achat;
	private String imagePath;

	@ManyToOne(cascade = CascadeType.PERSIST)
	private Categorie categorie;

	@OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore // Add this annotation to break the loop during serialization
	private Set<Vente> ventes = new HashSet<>();

	// Constructors...

	public Produit() {
	}

	public Produit(String designation, double prix, int quantite, Date date_achat, Categorie categorie, String code, String imagePath ) {
		this.designation = designation;
		this.prix = prix;
		this.quantite = quantite;
		this.date_achat = date_achat;
		this.categorie = categorie;
		this.code = code;
		this.imagePath = imagePath;

		// Initialize the ventes set
		this.ventes = new HashSet<>();
	}

	// Getters and setters...
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String userProvidedPath) {
		// Concatenate the user-provided path with the base path
		this.imagePath = userProvidedPath;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public Date getDate_achat() {
		return date_achat;
	}

	public void setDate_achat(Date date_achat) {
		this.date_achat = date_achat;
	}

	public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

	public Set<Vente> getVentes() {
		return ventes;
	}

	// Remove the existing setter for ventes to avoid direct setting of the set

	// Add a method to add a vente to the set
	public void addVente(Vente vente) {
		ventes.add(vente);
		vente.setProduit(this);
	}

	public void removeVente(Vente vente) {
		ventes.remove(vente);
		vente.setProduit(null);
	}
	@Override
	public String toString() {
		return "Produit{" +
				"id=" + id +
				", designation='" + designation + '\'' +
				", code='" + code + '\'' +
				", prix=" + prix +
				", quantite=" + quantite +
				", date_achat=" + date_achat +
				", categorie=" + categorie +
				", ventes=" + ventes +
				'}';
	}
}
