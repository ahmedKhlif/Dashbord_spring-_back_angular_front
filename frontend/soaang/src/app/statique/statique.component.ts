// statique.component.ts

import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { SoldProduct } from '../models/SaledProduct';
import { FavoredProduct } from '../models/FavoredProduct';
import { Chart } from 'chart.js/auto';




@Component({
  selector: 'app-statique',
  templateUrl: './statique.component.html',
  styleUrls: ['./statique.component.css'],
})
export class StatiqueComponent implements OnInit {
  categories: Categorie[] = [];
  produits: Produit[] = [];
  mostSoldProductsGlobally: SoldProduct[] = [];
  mostSoldProductsByYear: SoldProduct[] = [];
  productsInStock: Produit[] = [];
  productsOutOfStock: Produit[] = [];
  soldProducts: Produit[] = [];
  mostFavoredProductsGlobally: FavoredProduct[] = [];
  mostFavoredProductsByYear: FavoredProduct[] = [];
  chart: any;
  lineChart: any;
  doughnutChart: any;




  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getMostSoldProductsGlobally().subscribe((data: any[]) => {
      console.log('Received data:', data); // Log the received data to the co
      this.mostSoldProductsGlobally = data.map(item => {

        return {
          designation: item[0],
          quantitySold: item[1],
        };
      });    });

    const currentYear = new Date().getFullYear();
    this.statisticsService.getMostSoldProductsByYear(currentYear).subscribe((data: any[]) => {
      console.log('Received data:', data); // Log the received data to the co

      this.mostSoldProductsByYear = data.map(item => {

        return {
          designation: item[0],
          quantitySold: item[1],
        };
      });
    });
    

    this.statisticsService.getProductsInStock().subscribe((data: Produit[]) => {

      this.productsOutOfStock = data;
            // Create or update the doughnut chart

      this.createOrUpdateDoughnutChart();    });

    this.statisticsService.getProductsOutOfStock().subscribe((data: Produit[]) => {
      console.log('Received data:', data); // Log the received data to the console

      this.productsOutOfStock = data;
            // Create or update the doughnut chart

    });

    this.statisticsService.getSoldProducts().subscribe((data: Produit[]) => {
      this.soldProducts = data;
    });

  
    this.statisticsService.getMostFavoredProductsGlobally().subscribe((data: any[]) => {
      console.log('Received data:', data); // Log the received data to the console

      this.mostFavoredProductsGlobally = data.map(item => {

        return {
          designation: item[0],
          favCount: item[1],
          monthval:item[2],
        };
      });
      this.createOrUpdateChart();



      // After receiving the data, create or update the chart
    }); 

 // Fetch data for 2022
this.statisticsService.getMostFavoredProductsByYear(2022).subscribe((data2022: any[]) => {
  console.log('Received data for 2022:', data2022);

  const mostFavoredProducts2022: FavoredProduct[] = data2022.map(item => {
    return {
      designation: item[0],
      favCount: item[1],
      monthval: item[2],
    };
  });

  // Fetch data for 2023
  this.statisticsService.getMostFavoredProductsByYear(2023).subscribe((data2023: any[]) => {
    console.log('Received data for 2023:', data2023);

    const mostFavoredProducts2023: FavoredProduct[] = data2023.map(item => {
      return {
        designation: item[0],
        favCount: item[1],
        monthval: item[2],

      };
    });

    // Create or update the line chart for both years
    this.createOrUpdateLineChart(mostFavoredProducts2022, mostFavoredProducts2023);
  });
});

}
createOrUpdateDoughnutChart() {


  // Get the chart canvas element for the doughnut chart
  const ctxD = document.getElementById('doughnutChart') as HTMLCanvasElement;

  // Extract labels and data for the chart
  const labels = this.productsOutOfStock.map(product => product.designation);
  const data = this.productsOutOfStock.map(product => product.quantite);

  // Create the new doughnut chart
  this.doughnutChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });
}





createOrUpdateLineChart(data2022: FavoredProduct[], data2023: FavoredProduct[],) {
  // Get the chart canvas element for the line chart
  const ctxL = document.getElementById('lineChart') as HTMLCanvasElement;

  // Create or update the line chart
  const myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels: data2023.map(product => product.designation),
      datasets: [
        {
          label: '2022',
          data: data2022.map(product => product.favCount),
          backgroundColor: ['rgba(105, 0, 132, .2)'],
          borderColor: ['rgba(200, 99, 132, .7)'],
          borderWidth: 2,
        },
        {
          label: '2023',
          data: data2023.map(product => product.favCount),
          backgroundColor: ['rgba(0, 137, 132, .2)'],
          borderColor: ['rgba(0, 10, 130, .7)'],
          borderWidth: 2,
        }, // Add more datasets as needed for different years
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'linear', // Use 'linear' scale for months
          position: 'bottom',
          max: 12 as any, // Cast to any
            min: 1 as any, // Cast to any

          ticks: {
            stepSize: 1,
            callback: function (value: any, index: any, values: any) {
              // Convert numeric month to label (e.g., 1 to 'January')
              const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];
              return monthNames[value - 1];
            } as any, // Cast to any
          },
        },
        y: {
          type: 'category', // Use 'category' scale for designation
          position: 'left',
          labels: data2023.map(product => product.designation), // Assuming designation contains labels
        }
      }
    },
  });

}
createOrUpdateBarChart(data: FavoredProduct[]) {
// Your existing bar chart creation logic
// Use the provided 'data' parameter to populate the bar chart
}

  createOrUpdateChart() {
    // Destroy the existing chart to avoid conflicts
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Get the chart canvas element
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
  
    // Create the new chart
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.mostFavoredProductsGlobally.map(product => product.designation),
        datasets: [
          {
            label: '# of Votes',
            data: this.mostFavoredProductsGlobally.map(product => product.favCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,

            ticks: {
            },
          },
        },
      },
    });
  }


}
