import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Produit } from '../models/produit.model';
import { Categorie } from '../models/categorie.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  selectedCategoryId: number = 0; // Initialize with a default value, or choose an appropriate default
  productModel: Produit = {
    id: 0,
    designation: '',
    code: '',
    prix: 0,
    quantite: 0,
    date_achat: new Date(),
    categorie_id: new Categorie(),
    ventes: [],
    favoris: []
  };

  categories: Categorie[] = [];

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
        console.log('Request:', error.url, 'Method:', error.method, 'Body:', error.error);
      }
    );
  }

  onAddProductSubmit() {
    console.log('Selected Category Index:', this.selectedCategoryId);
    console.log('Categories:', this.categories);

    if (this.selectedCategoryId >= 0 && this.selectedCategoryId -1 < this.categories.length) {
      const selectedCategory = this.categories[this.selectedCategoryId -1] ;
      this.productModel.categorie_id.id = selectedCategory.id || 0; // Assign a default value if undefined
      this.productModel.categorie_id.code = selectedCategory.code || '';
      this.productModel.categorie_id.libelle = selectedCategory.libelle || '';
      console.log('Selected Category:', this.productModel.categorie_id);

      // Rest of the code...

      Swal.fire({
        title: 'Product added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/Products']);
        }
      });

      this.productService.addProduct(this.productModel).subscribe(
        response => {
          console.log('Product added successfully:', response);
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      // Handle the case where the selected index is out of range
      console.error('Selected category index out of range');
    }
  }
}
