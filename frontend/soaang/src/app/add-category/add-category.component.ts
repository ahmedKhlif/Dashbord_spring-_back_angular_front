import { Component } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryModel= new Categorie ();
  categories: Categorie[] = [];

  constructor(private categoryService: CategoryService ,private router: Router) {}

  onSubmit() {
    this.categoryService.addCategory(this.categoryModel).subscribe(
      (response: Categorie) => {
        console.log('Category added successfully:', response);
        this.loadCategories();
        this.showSuccessToast();
        this.redirectToCategoryPage();
      },
      error => {
        console.error('Error adding category:', error);
      }
    );
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

  showSuccessToast() {
    Swal.fire({
      icon: 'success',
      title: 'Category added successfully!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  redirectToCategoryPage() {
    this.router.navigate(['/category']);
  }

}
