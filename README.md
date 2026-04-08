# PawMarket 🐾

## Project Overview

PawMarket is a comprehensive pet shop e-commerce and service management platform designed to provide a vibrant, market-ready web experience for pet parents. It bridges the gap between online shopping and pet care by offering seamless cart transfers between product purchases and grooming services. The platform caters to two primary user roles: standard users (pet parents) and administrators.

## Key Features

- **Vibrant Storefront & E-commerce**: Features a dynamic storefront with pet-centric category filters, localized pricing (Philippine Peso), product wishlists, and intuitive shopping cart functionality.
- **Frictionless Grooming Booking**: A seamless, multi-step scheduling flow allowing users to select grooming services, add-ons (e.g., Blueberry Facials), and book dates and times without leaving the page.
- **Pet Parent Dashboard**: A personalized command center for users to track total orders, manage loyalty points, view upcoming grooming appointments, and manage specific pet profiles.
- **Admin Command Center**: A robust dashboard for business operations, featuring top-level KPIs (revenue, active users), proactive system alerts for low stock, visual inventory management, and centralized grooming appointment tracking.
- **Secure Onboarding & Granular Control**: Supports secure registration with OAuth integrations (Google/Facebook), password strength indicators, and Two-Factor Authentication (2FA). Users can also toggle specific SMS or email notifications for orders and grooming.
- **Proactive Customer Support**: An omnichannel help center featuring an auto-suggest FAQ search bar, expandable categories, and a tabbed selector to transition between live chat, email, and phone support.

## Project Architecture

This project is built using a modern, decoupled architecture to ensure scalability and a responsive user experience.

- **Frontend**: React JS + Vite (Provides instant, app-like reactivity for multi-step processes like the Grooming Booking and Dashboard)
- **Backend**: Java Spring Boot (Handles heavy processing, business logic, and API endpoints)
- **Database**: Supabase (PostgreSQL database for secure data storage, user authentication, and real-time capabilities)

## Project Pages

The application is structured around 10 primary screens mapped to the user and admin experiences:

1. **Home Page**: Promotional banners, featured products, and quick access to services.
2. **User Registration / Login**: Secure access point with OAuth and standard email login.
3. **User Dashboard**: Overview of order history, wishlists, and pet profiles.
4. **Settings**: Granular account control, address management, and 2FA security setups.
5. **Help / Support**: Self-service FAQs and contact forms.
6. **Product Listing**: Browsing interface with dynamic price sliders and category chips.
7. **Product Detail**: Comprehensive product specs, image galleries, reviews, and conversion triggers.
8. **Shopping Cart**: 4-step checkout progress tracker with localized order summaries.
9. **Grooming Appointment Booking**: Interactive calendar and service selection.
10. **Admin Dashboard**: Business operations, inventory alerts, and user management.

## Project Structure

The repository is organized into a monorepo structure separating the client interface from the server logic:

```
pawmarket/
├── frontend/               # React + Vite application
│   ├── public/             # Static assets (images, icons)
│   ├── src/
│   │   ├── assets/         # Stylesheets and graphical assets
│   │   ├── components/     # Reusable UI components (Buttons, Modals, Navbar)
│   │   ├── pages/          # Page-level components matching the 10 core screens
│   │   ├── services/       # API integration functions for Spring Boot backend
│   │   ├── context/        # React context for global state (Cart, Auth, User Info)
│   │   └── App.jsx         # Main application router
│   ├── package.json
│   └── vite.config.js
└── backend/                # Java Spring Boot application
    ├── src/
    │   ├── main/
    │   │   ├── java/com/pawmarket/
    │   │   │   ├── controllers/  # REST API endpoints (e.g., /api/products, /api/bookings)
    │   │   │   ├── models/       # Entity classes (User, Product, Appointment)
    │   │   │   ├── repositories/ # Supabase database interaction interfaces
    │   │   │   ├── services/     # Business logic layer
    │   │   │   └── security/     # JWT authentication and role-based access control
    │   │   └── resources/
    │   │       └── application.properties # Database configuration and Supabase credentials
    └── pom.xml             # Maven dependencies
```

## Project Setup

Follow these steps to get the project running locally for development.

### Prerequisites

- Node.js (v18+)
- Java Development Kit (JDK 17+)
- Maven
- Supabase Account & Project instance

### 1. Database Setup (Supabase)

1. Create a new project in your Supabase dashboard.
2. Run the provided SQL initialization scripts (located in `backend/src/main/resources/schema.sql`) in the Supabase SQL editor to create your tables (Users, Products, Orders, Appointments).
3. Retrieve your Database connection URL and API keys from the Supabase settings.

### 2. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the `application.properties` file with your Supabase PostgreSQL connection string:
   ```properties
   spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_DB_URL]:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=[YOUR_DB_PASSWORD]
   ```

3. Install dependencies and run the server:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The backend will typically start on http://localhost:8080.

### 3. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the necessary Node modules:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` root and add your backend API URL and Supabase keys:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_SUPABASE_URL=[YOUR_SUPABASE_PROJECT_URL]
   VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will typically start on http://localhost:5173.

## Development

### Backend Development

The Spring Boot backend uses Maven for dependency management and follows standard Spring Boot conventions. Key packages include:

- `controllers`: REST API endpoints
- `services`: Business logic implementation
- `repositories`: Data access layer using Spring Data JPA
- `models`: Entity classes representing database tables
- `security`: Authentication and authorization configuration

### Frontend Development

The React frontend uses Vite for fast development and includes:

- React Router for navigation
- Context API for state management
- Axios for API calls
- Component-based architecture for reusability

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@pawmarket.com or join our Slack channel.