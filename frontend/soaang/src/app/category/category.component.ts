import { Component } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { CategoryService } from '../services/category.service';
import * as Toastify from 'toastify-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Categorie[] = [];
  categoryModel=new Categorie() // Use Categorie as the type

  modeEdition = false;
  columns: string[] = ['id', 'code', 'libelle'];

  showForm: boolean = false;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: Categorie[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onDelete(categoryId: number | undefined, categoryName: string | undefined) {
    if (categoryId !== undefined && categoryName !== undefined) {
      Swal.fire({
        title: 'Confirm Deletion',
        text: `Are you sure you want to delete the category "${categoryName}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCategory(categoryId);
        }
      });
    }
  }
  
  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        Swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        );
        this.loadCategories();
      },
      error => {
        console.error('Error deleting category:', error);
      }
    );
  }
  

  onEdit(categoryId: number | undefined) {
    if (categoryId !== undefined) {
      this.categoryService.getCategoryById(categoryId).subscribe(
        (category: Categorie) => {
          this.categoryModel = { ...category }; // Use the spread operator to copy properties
        },
        error => {
          console.error('Error fetching category for editing:', error);
        }
      );
    }
    this.modeEdition=true;
    this.showForm = true;
  }
  annuler() {
    this.showForm = false;  // Hide the form
  }

  showToast(message: string, type: string) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top', // 'top' or 'bottom'
      position: 'right', // 'left', 'center', or 'right'
      backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
    }).showToast();
  }
  onEditSubmit() {
    if (this.categoryModel.id !== undefined) {
      this.categoryService.updateCategory(this.categoryModel.id, this.categoryModel).subscribe(
        response => {
          console.log('Category updated successfully:', response);
  
          // Display SweetAlert notification
          Swal.fire({
            title: 'Updated!',
            text: 'Category has been updated.',
            icon: 'success',
          });
  
          // Close the update form
          this.showForm = false;
  
          // Update the local list of categories after a successful update
          const index = this.categories.findIndex(category => category.id === this.categoryModel.id);
          if (index !== -1) {
            // If the category is found in the local list, update it
            this.categories[index] = { ...this.categoryModel };
          }
  
          // Optionally, you can reset the categoryModel or perform other actions after a successful update
        },
        error => {
          console.error('Error updating category:', error);
        }
      );
    }
  }
  
    
}
