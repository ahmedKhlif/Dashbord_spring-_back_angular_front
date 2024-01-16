import { Component,OnInit  } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Produit } from '../models/produit.model';
import { NgForm } from '@angular/forms';
import { Categorie } from '../models/categorie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Produit[] = [];
  modeEdition:boolean=false;
  searchTerm: string = '';
  showNoDataFound = false;
  showForm: boolean = false; 
  editProductForm: NgForm | undefined;
  productModel: Produit = {
    id: 0,
    designation: '',
    code: '',
    prix: 0,
    quantite: 0,
    date_achat: new Date(),
    categorie_id:new Categorie(),
    ventes: [],
    favoris: []
  };

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();      
  }

  editerProduit(p: Produit) {
    this.productModel = { ...p };
    this.modeEdition = true;
    this.showForm = true;  
  }
  consulterProduits() {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.productService.getProduits().subscribe({
      next: data => {
          console.log('Received data:', data);
          this.products = data;
      },
      error: err => {
          console.error('Error fetching products:', err);
      }
  });    
  }   
  
  filterProduits() {
    if (this.searchTerm.trim() !== '') {
      this.products = this.products.filter((p) =>
        (p.id?.toString().toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (p.designation?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (p.code?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (p.prix?.toString().toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (p.quantite?.toString().toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) 
      );

      // Update the variable to show/hide "No data found" message
      this.showNoDataFound = this.products.length === 0;
    } else {
      this.showNoDataFound = false;
      this.consulterProduits();
    }
  }
  
  supprimerProduit(p: Produit) {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete the product: ${p.designation} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Suppression confirmée...');
        // Chercher l'indice du produit à supprimer
        let index: number = this.products.indexOf(p);
        console.log('Indice du produit à supprimer: ' + index);
        if (index !== -1) {
          // Supprimer dans le BackEnd
          this.productService.deleteProduit(p.id)
            .subscribe({
              next: deletedProduit => {
                console.log('Succès DELETE');
                // Supprimer dans la partie Front End (dans le tableau produits)
                this.products.splice(index, 1);
                console.log('Suppression du produit:' + p.designation);
              },
              error: err => {
                console.log('Erreur DELETE');
              }
            });
        }
      } else {
        console.log('Suppression annulée...');
      }
    });
  }
  annuler() {
    this.showForm = false;  // Hide the form


    if (this.editProductForm) {
      this.editProductForm.resetForm(); // Reset the form when canceled
    }
  }

  onEditSubmit() {
    if (this.productModel.id !== undefined) {
      this.productService.updateProduit(this.productModel.id, this.productModel).subscribe(
        response => {
          console.log('Product updated successfully:', response);
          this.showForm = false; // Hide the form after successful update
          this.editProductForm?.resetForm(); // Reset the form
          this.consulterProduits(); // Reload the product list
          Swal.fire('Success', 'Product updated successfully', 'success');
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }


}
