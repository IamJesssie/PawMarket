# PawMarket: Figma-to-Code Standards

This document defines the architectural patterns and rules for integrating high-fidelity designs into the PawMarket codebase.

## 1. Project Overview
- **Framework**: React 19 (Vite-powered)
- **Language**: JavaScript (ESM)
- **Styling**: Standard CSS Modules (No preprocessors like Sass/SCSS per project requirement)
- **Navigation**: React Router 7+
- **State Management**: React Context API (`CartContext.jsx`)

## 2. Token Definitions & Global Styles
Currently, tokens are implemented as hardcoded values in CSS Modules to match Figma exactly. 
- **Typography**:
  - `Plus Jakarta Sans`: Used for Headings (h1, h2, h3).
  - `Be Vietnam Pro`: Used for Body text, buttons, and UI labels.
- **Colors**:
  - Primary (Purple): `#585894`
  - Secondary (Orange): `#fa782d` / `#a04100`
  - Accent (Green): `#006a63` / `#00a63e`
  - Background (Off-white): `#fbf9f1` / `#fcfcf9`
  - Border/Divider: `#e4e3db` / `#f6f4ec`

## 3. Component Architecture
Components are organized into feature-specific folders within `src/components/`.

### Structure Pattern:
```text
src/components/[ComponentName]/
├── [ComponentName].jsx
└── [ComponentName].module.css
```

### Component Rules:
1. **Pixel-Perfect Logic**: Use exact values from Figma for `padding`, `gap`, `border-radius`, and `box-shadow`.
2. **Responsive Layouts**: Always prefer **Flexbox** and **CSS Grid** over absolute positioning.
3. **Naming**: Use camelCase for CSS Module classes (e.g., `styles.imageContainer`).
4. **Logic Binding**: UI components must be connected to `CartContext` or `useNavigate` if they involve app actions.

## 4. Asset & Icon Management
- **Storage**: All design assets (PNG, SVG, JPG) must be placed in `frontend/public/images/`.
- **Referencing**: Use absolute paths starting with `/images/` (e.g., `<img src="/images/cart-remove.svg" />`).
- **Icon Naming**:
  - Features: `cart-*.svg`
  - UI Icons: `mnvy-*.svg` (inherited from Figma export) or descriptive names like `user-icon.svg`.

## 5. Implementation Workflow (Figma-to-Code)
When implementing a new design frame:
1. **MCP Context**: Use `mcp_figma_get_design_context` to extract the high-fidelity Tailwind/React reference.
2. **Tailwind-to-CSS Conversion**: Manually convert the Tailwind reference code into **Standard CSS Modules**.
3. **Data Binding**: Replace static mock data with props or state (e.g., mapping `products` array).
4. **Asset Export**: Download icons directly from Figma into `public/images/` using `Invoke-WebRequest` or the Figma MCP.

## 6. Project Structure
```text
D:/PawMarket/
├── frontend/
│   ├── public/images/      # Design Assets
│   └── src/
│       ├── components/     # Reusable High-Fi components
│       ├── context/        # Cart/Auth Contexts
│       └── pages/          # Full page views (Products, Cart)
├── backend/                # Spring Boot API
└── PawMarket/Docs/         # Low-Fi Wireframes (Legacy reference)
```
