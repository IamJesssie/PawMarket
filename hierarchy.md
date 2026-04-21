# PawMarket: Full Component Hierarchy & Data Flow

This document maps the "Chain of Command" for the PawMarket React application, explaining how data and components interact through descriptive roles.

## 🏛️ The Core Foundation
**main.jsx** (The Power Switch)
   ➔ **App.jsx** (The CEO / Command Center)
      *   **Context Wrappers (Global Memory)**: `AuthProvider`, `CartProvider`, `WishlistProvider`.
      *   **Global UI**: `Navbar.jsx`, `Footer.jsx`.
      *   **Traffic Cop (Router)**: Matches the Browser URL to the correct Page.

---

## 📄 The Departments (Pages)

### 1. Home Page Flow (The Front Lobby)
**Home.jsx**
   *   ➔ **`products.js` (The Data Warehouse)**: Imports all products.
   *   ➔ **`ProductCard.jsx` (The Visual Artist)**: Shows top 4 items.

> **Summary Flow:**
> **Warehouse** (Data) → **Front Lobby** (Home.jsx) → **Visual Artist** (Renders Cards) → **Click Link** → **Traffic Cop** (Redirect to Detail)

---

### 2. Products Listing Flow (The Department Manager)
**Products.jsx**
   *   ➔ **`FilterSidebar.jsx` (The Search Specialist)**: Handles search and categories.
   *   ➔ **`ProductGrid.jsx` (The Layout Manager)**: Organizes items into a 3-column grid.
      *   ➔ **`ProductCard.jsx` (The Visual Artist)**: Displays each individual product.

> **Summary Flow:**
> **Data Warehouse** (Raw Data) → **Department Manager** (Filter Logic) → **Layout Manager** (3-Col Grid) → **Visual Artist** (Individual Item)

---

### 3. Product Detail Flow (The Product Specialist)
**ProductDetail.jsx**
   *   ➔ **`ProductGallery.jsx` (The Interactive Display)**: Handles images & Wishlist button.
   *   ➔ **`ProductInfo.jsx` (The Labeler)**: Shows Title, SKU, and Price.
   *   ➔ **`ProductOptions.jsx` (The Customizer)**: Size/Flavor selection + Cart button.
      *   ➔ **`TrustBadges.jsx` (The Security Officer)**: Reusable shipping/returns info.

> **Summary Flow:**
> **Traffic Cop** (URL Match :id) → **Product Specialist** (Finds ID) → **Interactive Display** (Show Images) → **Customizer** (User Selections) → **Action** (Add to Cart)

---

### 4. Account & Profile Flow (The Personal Assistant)
**AccountOverview.jsx**
   *   ➔ **`AccountSidebar.jsx` (The Navigation Portal)**: Sidebar menu with high-fidelity icons.
   *   ➔ **`UserInfoSummary.jsx` / `MetricsRow.jsx`**: Displays the user's "Quick Stats."

> **Summary Flow:**
> **Global Memory** (User Data) → **Personal Assistant** (Distributes Data) → **Nav Portal** (Portal Links) → **Page Content** (Displays Info)

---

### 5. Shopping Cart Flow (The Checkout Counter)
**ShoppingCart.jsx**
   *   ➔ **`CartContext.jsx` (The Live Registry)**: The active list of items.
   *   ➔ **`CartItem.jsx` (The Row Manager)**: Handles quantity and removal per item.
   *   ➔ **`TrustBadges.jsx`**: Reused for consistent branding.

> **Summary Flow:**
> **Live Registry** (Cart List) → **Checkout Counter** (Calculate Totals) → **Row Manager** (Update Quantities) → **Action** (Proceed to Pay)

---

### 6. Wishlist Flow (The Memory Vault)
**Wishlist.jsx**
   *   ➔ **`WishlistContext.jsx` (The Vault)**: Stored items in LocalStorage.
   *   ➔ **`ProductGallery.jsx` (The Action)**: Where you click "Add to Wishlist."
   *   ➔ **`AccountSidebar.jsx` (The Portal)**: How you navigate to your list.
   *   ➔ **`Wishlist.jsx` (The Showroom)**: Displays your collection of saved items.

> **Summary Flow:**
> **The Action** (Click Add) → **The Vault** (Save to Memory) → **The Portal** (Navigate to List) → **The Showroom** (Render Saved Grid)

---

### 7. Recently Viewed Flow (The History Log)
**RecentlyViewed.jsx**
   *   ➔ **`ProductDetail.jsx` (The Logger)**: Saves product ID to LocalStorage on visit.
   *   ➔ **`RecentlyViewed.jsx` (The History Page)**: Reads history and lookups data.

> **Summary Flow:**
> **The Logger** (Visit Detail Page) → **History Log** (Saved to LocalStorage) → **Nav Portal** (Click Recent) → **Display** (Render History)

---

## 💡 Engineering Highlights
1.  **Atomicity**: Components like `TrustBadges` and `ProductCard` are reused across 3+ different pages.
2.  **Centralization**: `products.js` ensures that changing a price once updates it across the entire site.
3.  **Encapsulation**: CSS Modules (`.module.css`) keep styles "locked" inside their specific components.
