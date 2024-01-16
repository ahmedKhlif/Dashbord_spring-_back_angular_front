# dashboard_spring_back_angular_front

This project is a dashboard application developed using Spring Boot for the back end, Angular for the front end, and MySQL with XAMPP as the database server.

## Overview

The dashboard application provides a user-friendly interface to manage and visualize product-related information, including sales data, product quantities, and categories. It incorporates a responsive design for a seamless user experience.

## Features

- **Product Management:**
  - Add new products with details such as name, price, quantity, and purchase date.
  - Associate products with predefined categories.

- **Visualization:**
  - Utilizes charting libraries to present data visually.
  - Charts display sales trends, product quantities, and other relevant metrics.

- **Responsive UI:**
  - Designed with Bootstrap for a responsive and visually appealing user interface.

## Technologies Used

- **Front-end:**
  - Angular
  - Bootstrap
  - Chart.js 

- **Back-end:**
  - Spring Boot
  - Java Persistence API (JPA) for data persistence
  - RESTful API for communication

- **Database:**
  - MySQL
  - XAMPP Server

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- Angular CLI
- Java Development Kit (JDK)
- MySQL Server
- XAMPP Server

### Database Setup

1. Start your XAMPP server.
2. Access the MySQL database through phpMyAdmin.
3. Create a new database named `dashboard_db`.

### Back-end (Spring Boot) Setup

1. Open `backend/src/main/resources/application.properties`.
2. Update the following properties with your MySQL database configuration:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/dashboard_db
   spring.datasource.username=your_database_username
   spring.datasource.password=your_database_password


## Usage

1. Access the Angular app at [http://localhost:4200](http://localhost:4200).
2. Use the dashboard to add new products and visualize relevant data.

## Contributing

We welcome contributions! Please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Chart.js](https://www.chartjs.org/) - Charting library used for visualizations.
- [Bootstrap](https://getbootstrap.com/) - Front-end framework for a responsive design.
- [Spring Boot](https://spring.io/projects/spring-boot) - Back-end framework for Java.
- [Angular](https://angular.io/) - Front-end framework for building web applications.

