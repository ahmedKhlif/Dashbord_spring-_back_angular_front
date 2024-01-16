import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { SoldProduct } from '../models/SaledProduct';
import { FavoredProduct } from '../models/FavoredProduct';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
  chart1: any;
  lineChart1: any;
  radarChart1: any;
  chartSoldProducts: any;
  

  selectedYearSoldProducts: number = new Date().getFullYear();
  selectedChangeFavoredProduct: number = new Date().getFullYear();
  selectedYear1: number = 2024;
  selectedYear2: number = 2022;
  availableYears: number[] = [2024,2023, 2022, 2021, 2019];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.selectedYear1 = this.availableYears[1]; // Assumes availableYears is an array of years
    this.selectedYear2 = this.availableYears[2];
    
    this.statisticsService.getMostSoldProductsGlobally().subscribe((data: any[]) => {
      console.log('Received data:', data);
      this.mostSoldProductsGlobally = data.map(item => ({
        designation: item[0],
        quantitySold: item[1],
      }));
      this.createOrUpdateChart1();

    });

    this.statisticsService.getProductsInStock().subscribe((data: Produit[]) => {
      this.productsInStock = data;
      this.createOrUpdateRadarChart1();
    });

    this.statisticsService.getSoldProducts().subscribe((data: Produit[]) => {
      this.soldProducts = data;
    });

    this.statisticsService.getProductsOutOfStock().subscribe((data: Produit[]) => {
      console.log('Received data:', data);
      this.productsOutOfStock = data;
      this.createOrUpdateDoughnutChart();
    });

    this.statisticsService.getMostFavoredProductsGlobally().subscribe((data: any[]) => {
      console.log('Received data:', data);
      this.mostFavoredProductsGlobally = data.map(item => ({
        designation: item[0],
        favCount: item[1],
        monthval: item[2],
      }));
      this.createOrUpdateChart();
    });

  
    // this.statisticsService.getMostFavoredProductsByYear(2022).subscribe((data2022: any[]) => {
    //   console.log('Received data for 2022:', data2022);
    //   const mostFavoredProducts2022: FavoredProduct[] = data2022.map(item => ({
    //     designation: item[0],
    //     favCount: item[1],
    //     monthval: item[2],
    //   }));

    //   this.statisticsService.getMostFavoredProductsByYear(2023).subscribe((data2023: any[]) => {
    //     console.log('Received data for 2023:', data2023);
    //     const mostFavoredProducts2023: FavoredProduct[] = data2023.map(item => ({
    //       designation: item[0],
    //       favCount: item[1],
    //       monthval: item[2],
    //     }));
    //     this.createOrUpdateLineChart(mostFavoredProducts2022, mostFavoredProducts2023);
    //   });
    // });
  }

  onYearChangeFavoredProduct(event: any) {
    const selectedYear = event.target.value;

    if (event.target.id === 'yearSelector1') {
       this.selectedYear1 = selectedYear;
    } else if (event.target.id === 'yearSelector2') {
       this.selectedYear2 = selectedYear;
    }

    this.statisticsService.getMostFavoredProductsByYear(this.selectedYear1).subscribe((data1: any[]) => {
       const mostFavoredProducts1: FavoredProduct[] = data1.map(item => ({
          designation: item[0],
          favCount: item[1],
          monthval: item[2],
       }));

       this.statisticsService.getMostFavoredProductsByYear(this.selectedYear2).subscribe((data2: any[]) => {
          const mostFavoredProducts2: FavoredProduct[] = data2.map(item => ({
             designation: item[0],
             favCount: item[1],
             monthval: item[2],
          }));

          this.createOrUpdateLineChart(mostFavoredProducts1, mostFavoredProducts2);
       });
    });
 }

  onYearChangeSoldProducts(event: any) {
    this.selectedYearSoldProducts = event.target.value;

    this.statisticsService.getMostSoldProductsByYear(this.selectedYearSoldProducts).subscribe((data: any[]) => {
      console.log(`Received data for sold products in ${this.selectedYearSoldProducts}:`, data);

      this.mostSoldProductsByYear = data.map(item => ({
        designation: item[0],
        quantitySold: item[1],
      }));
      this.createOrUpdateBarChartSoldProducts();
    });
  }

  createOrUpdateBarChartSoldProducts() {
    if (this.chartSoldProducts) {
      this.chartSoldProducts.destroy();
    }

    const ctxSoldProducts = document.getElementById('barChartSoldProducts') as HTMLCanvasElement;

    this.chartSoldProducts = new Chart(ctxSoldProducts, {
      type: 'bar',
      data: {
        labels: this.mostSoldProductsByYear.map(product => product.designation),
        datasets: [
          {
            label: `Quantity Sold of Products (${this.selectedYearSoldProducts})`,
            data: this.mostSoldProductsByYear.map(product => product.quantitySold),
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
          },
        },
      },
    });
  }
  createOrUpdateRadarChart1() {
    const ctxR = document.getElementById('radarChart1') as HTMLCanvasElement;
  
    const labels = this.productsInStock.map(product => product.designation);
    const data = this.productsInStock.map(product => product.quantite);
  
    const myRadarChart = new Chart(ctxR, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "rgba(75,192,192,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75,192,192,1)"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Products on Stock'  // Add a title for the radar chart
          },
          legend: {
            display: false  // Hide legend if not needed
          },
        
        }
      }
    });
  }
  
  
  createOrUpdateDoughnutChart() {
    const ctxD = document.getElementById('doughnutChart') as HTMLCanvasElement;
  
    const labels = this.productsOutOfStock.map(product => product.designation);
    const data = this.productsOutOfStock.map(product => product.quantite);
  
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
  
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
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Products out Stock'  // Add a title for the radar chart
          },
          legend: {
            display: true  // Hide legend if not needed
          },
        
        }
      }
    });
  }
  

  createOrUpdateLineChart(data1: FavoredProduct[], data2: FavoredProduct[]) {
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    const ctxL = (document.getElementById('lineChart') as HTMLCanvasElement).getContext('2d');
  
    if (!ctxL) {
      console.error('Could not get 2D context for line chart.');
      return;
    }
  
    this.lineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: data1.map(product => product.designation),
        datasets: [
        
          {
            label: `(${this.selectedYear1})`,
            data: data1.map(product => ({
              x: product.monthval,
              y: product.favCount,
              productName: product.designation,
              
            })),
            borderColor: 'rgba(255, 99, 132, .7)',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 99, 132, .7)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBorderWidth: 2,
            fill: true,
            tension: 1,
            backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red fill color
  
            // Set tension to 0 for straight lines
          },
          {
            label: `(${this.selectedYear2})`,
            data: data2.map(product => ({
              x: product.monthval,
              y: product.favCount,
              productName: product.designation,
            })),
            borderColor: 'rgba(0, 10, 130, .7)',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(0, 10, 130, .7)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointBorderWidth: 2,
            fill: true,
            tension: 1,
            backgroundColor: 'rgba(0, 0, 255, 0.2)', // Blue fill color

              // Set tension to 0 for straight lines
          },
          
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            max: 12,
            min: 1,
            ticks: {
              stepSize: 1,
              callback: function (value: any, index: any, values: any) {
                const monthNames = [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return monthNames[value - 1];
              },
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            suggestedMin: 0,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          filler: {
            propagate: true
        },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || '';
                if (context.parsed.x !== null && context.parsed.y !== null) {
                  return `${context.dataset.data[context.dataIndex].productName}: ${context.parsed.y} favorites`;
                }
                return '';
              },
            },
          },
        },
      },
    });
  }
  

  createOrUpdateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.mostFavoredProductsGlobally.map(product => product.designation),
        datasets: [
          {
            label: '# of most Favored Products Globally',
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
        indexAxis: 'y', // Change the orientation to horizontal (y-axis)
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            beginAtZero: true,
            title: {
              display: true,
              text: 'quantity',
              color: 'silver',
              padding: {
                top: 10,
                bottom: 30},
              font: {
                
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2,
              },
              
            },
          },
          y: {
            type: 'category',
            position: 'left',
            title: {
              display: true,
              text: 'Products',
              color: 'silver',
              padding: {
                top: 10,
                bottom: 30},
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
          },
        },
      },
    }});
  }
  
  




  createOrUpdateChart1() {
    const ctx = document.getElementById('barChart1') as HTMLCanvasElement;
  
    this.chart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.mostSoldProductsGlobally.map(product => product.designation),
        datasets: [
          {
            label: '# of most quantity sold Globally',
            data: this.mostSoldProductsGlobally.map(product => product.quantitySold),
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
        indexAxis: 'y',
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            beginAtZero: true,
          },
          y: {
            type: 'category',
            position: 'left',
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
        backgroundColor: 'rgba(50, 50, 50, 0.7)', // Set the background color for the chart area
      },
    });
  }
  

  
  
}

