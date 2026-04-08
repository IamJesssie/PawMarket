# PAWMARKET WIREFRAME DOCUMENT
## Complete Detailed Specification

**Document Type:** Low-Fidelity Wireframe  
**Project Name:** PawMarket  
**Date:** March 2026  
**Version:** v1.0  
**Description:** A low-fidelity wireframe document for the PawMarket pet shop e-commerce and service management platform  
**Total Screens:** 10  
**User Roles:** 2 (Customer, Admin)  
**Fidelity Level:** Low-Fi

---

## WIREFRAME LEGEND

### Visual Components
- **Image Placeholder:** Visual content representation area
- **Primary Button:** Main call-to-action element (prominent styling)
- **Secondary Button:** Alternative action element (subdued styling)
- **Input Field:** User data entry point
- **Text Lines:** Content section placeholder

---

## SCREEN 01: HOME PAGE

### Purpose
Landing page serving as the main entry point for customers with featured products and service promotion.

### Header Section
**Navigation Bar (Sticky)**
- Element: PawMarket Logo (left)
- Navigation Links: Home, Products, Grooming, About, Contact, Login
- Cart Icon: Clickable to navigate to shopping cart
- Positioning: Fixed/sticky to remain visible while scrolling

### Hero Section (Full-Width)
**Visual Component**
- Background: Pet lifestyle photograph
- Layout: Full-width banner with overlay content

**Hero Content**
- Primary Headline: Large h1 text (center-aligned)
- Call-to-Action Buttons (2):
  - Primary Button: "Shop Now" (leads to product listing)
  - Primary Button: "Book Grooming" (leads to grooming booking)
- Positioning: Overlaid on banner image
- Interaction: Buttons are clickable CTAs

### Featured Products Section
**Section Header**
- Title: "Featured Products"
- Right-aligned Link: "View All →" (navigates to full product listing)

**Product Grid**
- Layout: 4-column grid layout
- Content per Product Card:
  - Product Image (placeholder)
  - Product Name
  - Price ($XX.XX format)
  - "Add to Cart" Button
- Interaction: Clicking card navigates to Product Detail page
- Sample Products: Dog Food, Cat Toy, Pet Bed, Grooming Kit

### Shop by Category Section
**Category Chips**
- Layout: Horizontal scrollable chips/buttons
- Categories: Dogs, Cats, Birds, Fish, Small Pets
- Functionality: Filters products by pet type
- Styling: Outlined button style with icons

### Grooming Service Call-to-Action
**CTA Section**
- Title: "Book a Grooming Session"
- Image: Grooming-related photo placeholder
- Content: Marketing copy about grooming services
- Action Buttons:
  - "Book Appointment" (primary button)
  - "Learn More" (secondary button)
- Navigation: Both buttons link to Grooming Booking page

### Customer Reviews Section
**Review Cards**
- Layout: 3 horizontally-arranged cards
- Content per Card:
  - Star Rating (5-star visual)
  - Review Quote (text lines placeholder)
  - Reviewer Avatar (circular placeholder)
- Interaction: Static display (read-only on home page)

### Newsletter Signup
**Email Subscription**
- Input Field: "Enter your email address"
- Button: "Subscribe"
- Functionality: Captures email for marketing list
- Validation: Email format check

---

## SCREEN 02: USER REGISTRATION / LOGIN

### Purpose
Authentication page allowing users to create new accounts or log into existing ones.

### Header Section
- Logo: PawMarket Logo (left)
- Navigation: "← Back to Home" link (right)

### Welcome Section (Left Panel)
**Welcome Illustration**
- Visual Component: Illustration placeholder
- Title: "Welcome to PawMarket"

**Value Propositions** (4 items with icons)
1. Shopping Icon + "Shop Products"
2. Scissors Icon + "Book Grooming"
3. Package Icon + "Track Orders"
4. Star Icon + "Leave Reviews"

### Authentication Content (Right Panel)
**Tabbed Form Interface**
Two tabs: "LOGIN" | "REGISTER"

#### TAB 1: LOGIN (Default Active)
**Form Fields**
1. Email Address
   - Type: Email input
   - Placeholder: "user@example.com"
   - Validation: Email format required

2. Password
   - Type: Password input (masked)
   - Placeholder: "•••••••••••"
   - Validation: Required field

**Form Options**
- Checkbox: "Remember me" (stay logged in)
- Link: "Forgot password?" (password recovery)

**Primary Action**
- Button: "LOGIN"
- Behavior: Validates email + password; shows error state if incorrect
- Result: Redirects to user dashboard on success

**Alternative Authentication**
- Button: "Continue with Google" (OAuth)
- Button: "Continue with Facebook" (OAuth)
- Styling: Outlined buttons with service logos

**Alternate CTA**
- Text: "Don't have an account? Register →"
- Link: Switches to Register tab

#### TAB 2: REGISTER (Secondary Tab)
**Form Fields**
1. First Name
   - Type: Text input
   - Placeholder: "First Name"

2. Last Name
   - Type: Text input
   - Placeholder: "Last Name"

3. Email Address
   - Type: Email input
   - Placeholder: "user@example.com"
   - Validation: Email format and uniqueness check

4. Phone Number
   - Type: Phone input
   - Placeholder: "+1 (555) 000-0000"
   - Validation: Valid phone format

5. Password
   - Type: Password input
   - Requirement: Minimum 8 characters
   - Real-time: Character count display

6. Confirm Password
   - Type: Password input
   - Placeholder: "Re-enter password"
   - Validation: Must match password field

7. Password Strength Indicator
   - Type: Visual indicator
   - Display: "Weak", "Medium", "Strong"
   - Updated: Real-time as user types

**Agreement Section**
- Checkbox: "I agree to the Terms of Service and Privacy Policy"
- Required: Must be checked to submit

**Primary Action**
- Button: "CREATE ACCOUNT"
- Behavior: Validates all fields; sends verification email on success
- Result: Creates account and may redirect to email verification or dashboard

---

## SCREEN 03: USER DASHBOARD

### Purpose
Personalized user hub displaying orders, appointments, and account overview.

### Header Section
**Navigation Bar**
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Cart
- User Menu: "JD John D. ▾" (dropdown with user options)

### Page Title
- "MY DASHBOARD"

### Sidebar Navigation
**Navigation Menu** (left column)
- Overview (current/active)
- Order History
- Appointments
- Wishlist
- Addresses
- Settings
- Logout

**User Avatar**
- Circular profile image placeholder

### Statistics Cards (4 Cards)
Display key user metrics in card layout:

1. **Total Orders**
   - Value: 12
   - Label: "Total Orders"

2. **Pending Orders**
   - Value: 2
   - Label: "Pending Orders"

3. **Appointments**
   - Value: 3
   - Label: "Appointments"

4. **Loyalty Points**
   - Value: 480
   - Label: "Loyalty Points"

### User Info Summary Section
**Profile Information**
- Full Name: [User's name]
- Email: [User's email]
- Phone: [User's phone]
- Member Since: [Registration date]
- Action Button: "Edit Profile" (links to settings)

### Order History Section
**Section Header**
- Title: "Order History"
- Note: Last 5 orders shown; paginated
- Action Link: "View All Orders"

**Order Table**
Columns: Order #, Date, Items, Total, Status, Action

Sample Data (5 rows):
| Order # | Date | Items | Total | Status | Action |
|---------|------|-------|-------|--------|--------|
| #PM-1042 | Mar 08, 2026 | 3 items | $48.99 | Delivered | View |
| #PM-1039 | Feb 25, 2026 | 1 item | $22.00 | Delivered | View |
| #PM-1031 | Feb 10, 2026 | 5 items | $91.50 | Delivered | View |
| #PM-1028 | Jan 30, 2026 | 2 items | $35.75 | Cancelled | View |
| #PM-1020 | Jan 12, 2026 | 1 item | $15.00 | Delivered | View |

### Upcoming Grooming Appointments Section
**Section Header**
- Title: "Upcoming Grooming Appointments"
- Note: Next scheduled sessions
- Action Button: "Book New Appointment"

**Appointment Cards** (2 cards)
Card 1:
- Date: Mar 15, 2026
- Service: Full Grooming
- Pet Details: Buddy (Golden Retriever)
- Time: 10:00 AM
- Status Badge: "Confirmed"
- Action: "Reschedule" button

Card 2:
- Date: Mar 28, 2026
- Service: Bath & Dry
- Pet Details: Luna (Persian Cat)
- Time: 2:30 PM
- Status Badge: "Pending"
- Action: "Reschedule" button

### Recently Wishlisted Section
**Section Header**
- Title: "Recently Wishlisted"

**Product Display**
- Layout: 4 product image placeholders
- Each Card:
  - Product image
  - "Add to Cart" action

---

## SCREEN 04: SETTINGS

### Purpose
Comprehensive account configuration and preference management.

### Header Section
- Logo: PawMarket Logo
- User Menu: "JD John D. ▾"

### Page Title
- "ACCOUNT SETTINGS"

### Sidebar Menu
Navigation sections:
- Profile
- Addresses
- Password & Security
- Notifications
- Payment Methods
- My Pets
- Delete Account

---

### SECTION 1: PROFILE UPDATE

**Photo Upload**
- Label: "Photo"
- Upload Control: "Upload Photo" button
- Specifications: "JPG, PNG — Max 2MB"
- Visual: Square placeholder with camera icon

**Form Fields**
1. First Name (Text input)
2. Last Name (Text input)
3. Email Address (Email input)
4. Phone Number (Phone input)
5. Date of Birth (Date input) - Format: MM / DD / YYYY
6. Gender (Dropdown select) - Placeholder: "Select gender"

**Action Buttons**
- "Cancel" (secondary button)
- "Save Changes" (primary button)

**Behavior**
- Saves data to user profile
- Success confirmation via toast notification

---

### SECTION 2: ADDRESS MANAGEMENT

**Saved Delivery Addresses**
Display list of saved addresses with actions:

- Home (Default)
  - Edit button
  - Delete button

- Work
  - Edit button
  - Delete button

**Add New Address**
- Button: "+ Add New Address"

**Add/Edit Address Form**
Form Fields:
1. Full Name (Text input)
2. Phone (Phone input)
3. Address Line 1 (Text input) - Placeholder: "Street address"
4. Address Line 2 (Text input) - Placeholder: "Apt, Suite, etc."
5. City (Text input)
6. State / Province (Text input)
7. Zip / Postal Code (Text input)
8. Country (Dropdown select)

**Form Actions**
- "Cancel" (secondary button)
- "Save Address" (primary button)

---

### SECTION 3: PASSWORD & SECURITY

**Password Update Form**
1. Current Password (Password input)
2. New Password (Password input)
3. Confirm New Password (Password input)
4. New Password Strength (Indicator display)
5. Action Button: "Update Password"

**Note:** Requires current password to change

**Two-Factor Authentication Options**
- Option 1: "Enable 2FA via SMS"
  - Description: "Get a code sent to your phone"
  
- Option 2: "Enable 2FA via Email"
  - Description: "Get a code sent to your email"

**Active Sessions**
- Title: "Active Sessions"
- Action: "Sign out all devices" button

---

### SECTION 4: NOTIFICATION PREFERENCES

**Email Notifications**
Toggleable options:
- Order updates
- Appointment reminders
- Promotions & offers
- Newsletter

**Push Notifications**
Toggleable options:
- Order status changes
- Grooming reminders
- New product arrivals
- Price drop alerts

**Save Button**
- "Save Preferences" (primary button)

---

## SCREEN 05: HELP / SUPPORT

### Purpose
Customer support hub with knowledge base and contact options.

### Header Section
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Help

### Page Title
- "HOW CAN WE HELP YOU?"

### Search Bar
- Input Placeholder: "Search for help topics..."
- Button: "Search"
- Feature: Auto-suggests FAQ topics as user types

### Category Shortcuts
Five topic category buttons:
- Orders & Shipping
- Grooming Services
- Returns & Refunds
- Payments
- Account & Profile

---

### FREQUENTLY ASKED QUESTIONS SECTION

**Accordion Interface** - Click + to expand, − to collapse

#### Category 1: Orders & Shipping
1. How long does standard shipping take? [−] (expanded by default)
2. Can I change my shipping address after ordering? [+]
3. How do I track my order? [+]
4. What happens if my order is lost in transit? [+]

#### Category 2: Grooming Services
1. How do I book a grooming appointment? [−] (expanded by default)
2. What grooming services are available? [+]
3. Can I reschedule my appointment? [+]
4. What should I bring to the grooming session? [+]

#### Category 3: Returns & Refunds
1. What is your return policy? [+]
2. How do I initiate a return? [+]
3. When will I receive my refund? [+]

#### Category 4: Payments & Billing
1. What payment methods are accepted? [+]
2. Is it safe to save my card information? [+]
3. Why was my payment declined? [+]

---

### CONTACT SUPPORT SECTION

**Contact Channels** (3 options)
1. Live Chat
   - Icon: Chat bubble
   - Action: Opens live chat widget
   
2. Email
   - Icon: Envelope
   - Action: Reveals email form below
   
3. Phone
   - Icon: Phone
   - Action: Shows phone number and hours

### Contact Form
**Form Fields:**
1. Your Name (Text input) - Required
2. Email Address (Email input) - Required
3. Topic (Dropdown) - Required - Placeholder: "Select a topic"
4. Order Number (Text input) - Optional - Placeholder: "#PM-XXXX"
5. Message (Textarea) - Required
6. Attachments (File upload) - Optional - Placeholder: "Drag & drop or Browse"

**Form Action**
- Button: "Submit Message"
- Confirmation: Success message displayed on submit

### Support Hours
Display business hours:
- Mon – Fri: [Hours]
- Saturday: [Hours]
- Sunday: [Hours]

---

## SCREEN 06: PRODUCT LISTING

### Purpose
Comprehensive product browsing with filtering, sorting, and search.

### Header Section
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Cart, Login, Cart Icon

### Breadcrumb Navigation
- "Home › Products › All Products"

### Page Title
- "ALL PRODUCTS"

### Result Counter
- "Showing 1–12 of 48 results"

### Search Bar
- Placeholder: "Search products..."
- Button: "Search"
- Feature: Live search with instant result filtering

---

### FILTERS SIDEBAR (Left)

**Filter Header**
- Title: "FILTERS"
- "Clear All" button (resets all filters)

**Active Filters Display**
Shows currently applied filters with remove (×) buttons:
- Category: Dogs ✕
- Category: Cats ✕
- Price: $0–$200 ✕

**Filter Groups**

#### Sort By (Radio buttons)
- Relevance (default)
- Price: Low–High
- Price: High–Low
- Newest
- Best Rated

#### Category (Checkboxes)
- ✓ All (checked)
- ✓ Dogs (checked)
- ☐ Cats
- ☐ Birds
- ☐ Fish
- ☐ Small Pets

#### Price Range (Slider)
- Min: $0
- Max: $200
- Feature: Drag slider to set custom range

#### Rating (Checkboxes)
- ☐ ★★★★★ & up (5 stars)
- ☐ ★★★★☆ & up (4 stars)
- ☐ ★★★☆☆ & up (3 stars)
- ☐ ★★☆☆☆ & up (2 stars)

#### Brand (Checkboxes)
- ☐ Royal Canin
- ☐ Purina
- ☐ Hill's Science
- ☐ Pedigree
- ☐ Blue Buffalo

#### Availability (Checkboxes)
- ✓ In Stock (checked)
- ☐ Pre-order Available

**Apply Filters Button**
- Primary button at bottom of filters panel

---

### PRODUCT GRID (Right)

**Grid Layout:** 3 columns
**Product Cards:** Click to navigate to Product Detail page

**Product Card Components:**
1. Product Image
   - Placeholder with diagonal lines
   - Sale Badge (if applicable): "SALE"

2. Product Name
   - Text: Product name (e.g., "Dog Food Premium")

3. Rating
   - Stars (★★★★★)
   - Numerical rating: "(4.0 / 5)" or "(5.0 / 5)"

4. Pricing
   - Original Price: "$XX.XX" (strikethrough if on sale)
   - Current Price: "$XX.XX"

5. Action Buttons
   - "Add to Cart" button
   - "♡ Wishlist" button (heart icon)

**Sample Products Shown:**
- Dog Food Premium
- Cat Toy Set
- Pet Bed Large
- Grooming Kit
- Bird Cage
- Fish Tank
- Dog Leash
- Cat Tree
- Pet Shampoo

### Pagination Controls
- "[ ← Prev ] 1 2 3 ... 6 [ Next → ]"

---

## SCREEN 07: PRODUCT DETAIL

### Purpose
Detailed product information with purchase options.

### Header Section
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Cart, Login, Cart Icon

### Breadcrumb Navigation
- "Home › Products › Dog Food › Royal Canin Adult Premium"

### Main Layout (2-Column)
Left Column: Product Images | Right Column: Product Information

---

### LEFT COLUMN: PRODUCT IMAGES

**Main Product Image**
- Large image display area
- Placeholder with diagonal lines
- Label: "Product Main Image"
- Interaction: Zoom on hover; lightbox (modal) on click

**Thumbnail Strip**
- Row of 4 thumbnail images below main image
- Labels: "IMG 1", "IMG 2", "IMG 3", "IMG 4"
- Interaction: Click thumbnail to swap main image

---

### RIGHT COLUMN: PRODUCT INFORMATION

**Product Identification**
- Product Name (H1): "Product Name / Title (H1)"
- SKU: "SKU: PM-10421"

**Rating & Reviews**
- Star Rating: ★ ★ ★ ★ ★ (4.0 / 5)
- Review Count: "42 Reviews"
- Stock Status Badge: "✓ In Stock"

**Pricing**
- Original Price: "$XX.XX" (strikethrough)
- Current Price: "$XX.XX"
- Discount Badge: "SAVE 20%"
- Note: "Dynamic price from backend; sale badge conditional"

**Short Description**
- Text content: Product summary

**Key Specifications**
- Fields:
  - Brand
  - Target Pet
  - Weight Options
  - Ingredients
  - Country of Origin
  - Shelf Life

**Variants / Options**

Weight/Size Options:
- Buttons: 1 kg, 2 kg, 5 kg (selected), 10 kg, 15 kg

Flavor/Variety Options:
- Buttons: Chicken (selected), Beef, Salmon, Lamb

**Purchase Actions**

Quantity Selector:
- Decrease: "−"
- Current quantity: "1"
- Increase: "+"

Buttons:
1. "Add to Cart" (primary)
   - Note: Cart update triggers cart count update in nav
   
2. "Buy Now →" (primary)
   - Note: Direct checkout flow

**Trust Badges**
- 🚚 Free shipping over $50
- 🔄 30-day returns
- 🔒 Secure checkout

---

### PRODUCT TABS

Four tabs below the main content:
1. **Description**
   - Full product description text

2. **Specifications**
   - Detailed specifications table

3. **Reviews (42)**
   - Customer reviews section

4. **Related Products**
   - Related/similar product recommendations

---

### REVIEWS SECTION

**Review Summary**
- Average Rating: "4.2 ★ ★ ★ ★ ★ (4.0 / 5)"
- Review Count: "Based on 42 reviews"

**Rating Breakdown**
- 5★: [count]
- 4★: [count]
- 3★: [count]
- 2★: [count]
- 1★: [count]

**Individual Review Cards**
Each review displays:
- Star rating (★★★★★ format)
- Rating value: "(4.0 / 5)" or similar
- Review text (placeholder lines)
- Actions: "Helpful ↑" and "Report" buttons

**Write Review Button**
- "Write a Review" (primary button)

---

### ACTION BUTTONS (Top Right)

- "♡ Add to Wishlist"
- "⤴ Share"
- "⚖ Compare"

---

## SCREEN 08: SHOPPING CART

### Purpose
Review cart items, apply promotions, and proceed to checkout.

### Header Section
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Cart, Login, Cart Icon

### Breadcrumb Navigation
- "Home › Shopping Cart"

### Item Counter
- "3 items in cart"

---

### CHECKOUT STEPPER

Progress indicator showing 4 steps:
1. ✓ Cart (current/active)
2. 2 Shipping (inactive)
3. 3 Payment (inactive)
4. 4 Confirmation (inactive)

---

### MAIN CONTENT (2-Column Layout)

#### LEFT COLUMN: CART ITEMS

**Section Header**
- "CART ITEMS (3)"
- "Clear Cart" button (top right)

**Bulk Actions**
- Checkbox: "Select All Items"
- Bulk Action: "Delete Selected" button

**Cart Item List**
Note: Items with qty +/- controls; remove/save-for-later links

**Item 1:**
- Product Image (placeholder)
- Product Name/Variant: "Variant: 5 kg | Chicken"
- Stock Status: "✓ In Stock"
- Price: "$45.99"
- Original Price: "$XX.XX" (crossed out)
- Discount Label: "SAVE"
- Quantity Controls:
  - "−" button
  - "2" (current quantity)
  - "+" button
- Links: "Save for later" | "Remove"

**Item 2:**
- Product Image (placeholder)
- Product Name/Variant: "Variant: Beige | Large"
- Stock Status: "✓ In Stock"
- Price: "$79.00"
- Original Price: "$XX.XX" (crossed out)
- Discount Label: "SAVE"
- Quantity Controls: − 1 +
- Links: "Save for later" | "Remove"

**Item 3:**
- Product Image (placeholder)
- Product Name/Variant: "Variant: 500ml | Lavender"
- Stock Status: "✓ In Stock"
- Price: "$12.49"
- Original Price: "$XX.XX" (crossed out)
- Discount Label: "SAVE"
- Quantity Controls: − 3 +
- Links: "Save for later" | "Remove"

---

#### RIGHT COLUMN: ORDER SUMMARY & ACTIONS

**Promo/Coupon Code Section**
- Input: "Enter coupon code"
- Button: "Apply"
- Note: "Validates against DB; shows discount on success"

**Price Breakdown**
- Subtotal (3 items): $218.94
- Discount (SAVE15): −$32.84
- Shipping: FREE
- Estimated Tax: $15.32
- **Order Total: $201.42** (emphasized)

**Delivery Options**
- Radio button: Standard (5–7 days) — FREE (selected)
- Radio button: Express (2–3 days) — $9.99
- Radio button: Next Day — $19.99

**Trust Badges**
- 🔒 Secure
- 📋 30-Day Returns
- 📦 Free Ship

**Primary Action Buttons**
- "Proceed to Checkout →" (primary button)
- "← Continue Shopping" (secondary button)

---

### SAVED FOR LATER SECTION

**Section Header**
- "SAVED FOR LATER (2 ITEMS)"

**Saved Items Display**
- Item image placeholder
  - Action: "Move to Cart" button
- Item image placeholder
  - Action: "Move to Cart" button

---

### YOU MAY ALSO LIKE SECTION

**Recommended Products**
- "Dental Treats" + "Add" button
- "Dog Collar" + "Add" button
- "Cat Brush" + "Add" button
- "Bird Seeds" + "Add" button

---

## SCREEN 09: GROOMING APPOINTMENT BOOKING

### Purpose
Multi-step form to book professional grooming services.

### Header Section
- Logo: PawMarket Logo
- Navigation: Home, Products, Grooming, Cart, Login, Cart Icon

### Breadcrumb Navigation
- "Home › Grooming › Book Appointment"

### Page Title
- "BOOK A GROOMING APPOINTMENT"

---

### BOOKING STEPPER

Progress indicator showing 4 steps:
1. ✓ Select Service (current/active)
2. 2 Choose Date & Time
3. 3 Pet Details
4. 4 Confirm & Pay

---

## STEP 1: SELECT GROOMING SERVICE

### Main Layout (2-Column)
Left Column: Services & Add-ons | Right Column: Salon Info

---

### LEFT COLUMN: SERVICE SELECTION

**Available Services** (Single-select cards)
Each service card displays: Name, Price, Duration

1. Full Grooming
   - Price: $65
   - Duration: 2–3 hrs
   - Selectable: ○ (radio button)

2. Bath & Dry
   - Price: $35
   - Duration: 1–1.5 hrs
   - Selectable: ○

3. Hair Trim & Styling
   - Price: $40
   - Duration: 1–2 hrs
   - Selectable: ○

4. Nail Clipping
   - Price: $15
   - Duration: 15 min
   - Selectable: ○

5. Ear Cleaning
   - Price: $12
   - Duration: 10 min
   - Selectable: ○

6. Teeth Brushing
   - Price: $18
   - Duration: 15 min
   - Selectable: ○

**Note:** Single-select service card; shows price + duration

**Optional Add-Ons** (Checkboxes)
- ☐ Flea Treatment (+$20)
- ☐ Perfume Spritz (+$5)
- ☐ Paw Wax (+$10)
- ☐ Blueberry Facial (+$15)
- ☐ Tooth Brushing (+$12)
- ☐ De-shedding (+$25)

---

### RIGHT COLUMN: SALON INFORMATION

**Salon Photo**
- Image placeholder with diagonal lines
- Label: "SALON PHOTO"

**Location & Hours**
- Title: "Location & Hours"
- Schedule:
  - Mon–Fri: [Hours]
  - Saturday: [Hours]
  - Sunday: [Hours]

**Meet Our Groomers**
- Title: "Meet Our Groomers"
- Groomer 1: Image placeholder
- Groomer 2: Image placeholder

---

## STEP 2: CHOOSE DATE & TIME

### Date Selection

**Calendar**
- Title: "← March 2026 →" (with navigation arrows)
- Layout: Standard calendar grid (Sun-Sat columns)
- Display: Days 1-31 for March
- States:
  - Past dates: Greyed out (disabled)
  - Unavailable dates: Greyed out
  - Selected date: Highlighted
  - Current date: May have special marking

### Time Selection

**Available Times**
- Display: Grid of time slot buttons
- Times shown:
  - 9:00 AM, 9:30 AM
  - 10:00 AM, 10:30 AM
  - 11:00 AM, 11:30 AM
  - 1:00 PM, 1:30 PM
  - 2:00 PM, 2:30 PM
  - 3:00 PM, 3:30 PM
  - 4:00 PM, 4:30 PM
- States:
  - Booked slots: Crossed out (disabled)
  - Available slots: Clickable
  - Selected slot: Highlighted

---

## STEP 3: PET DETAILS

### Pet Information Form

**Form Fields:**

1. **Select Pet** (Dropdown)
   - Placeholder: "Choose a saved pet"
   - Options: Previously saved pets
   - OR: Enter new pet details below

2. **Pet Name** (Text Input)
   - Placeholder: "e.g. Buddy"
   - Required: Yes

3. **Pet Type** (Radio buttons)
   - ○ Dog
   - ○ Cat
   - ○ Other
   - Required: Yes

4. **Breed** (Dropdown)
   - Placeholder: "Select breed"
   - Options: Dynamic based on pet type

5. **Pet Age** (Text Input)
   - Placeholder: "e.g. 3 years"
   - Helpful: Allow various formats (years, months, etc.)

6. **Special Instructions** (Textarea)
   - Placeholder: "Allergies, behavior notes..."
   - Optional: Yes
   - Note: Space for groomer to understand pet needs

---

## STEP 4: CONFIRM & PAY (PREVIEW)

### Booking Summary

**Summary Display** (Read-only)
- Service: [Selected service]
- Add-ons: [Selected add-ons list]
- Date: [Selected date]
- Time: [Selected time]
- Pet: [Pet details]
- Groomer: [Assigned groomer, if applicable]

**Total Price**
- Amount: "$85.00"

### Payment Action

**Primary Button**
- "Confirm Appointment & Pay"
- Behavior: Payment via saved card or new card entry
- Confirmation: Confirmation email sent on success

### Help Section

**Get Assistance**
- Link: "☎ Call Us"
- Link: "💬 Live Chat"

**Cancellation Policy**
- Display: Cancellation policy terms

---

## SCREEN 10: ADMIN DASHBOARD

### Purpose
Comprehensive business management and monitoring interface.

### Header Section
- Logo/Title: "PAWMARKET ADMIN"
- Version: "v2.1.0"
- User Menu: "AD Admin ▾"
- Notification Icon: 5 (notification count)

---

### SIDEBAR MENU (Left Column)

**MAIN MENU**
- 📊 Dashboard
- 📦 Orders (badge: 12)
- 🛍️ Products
- 📋 Inventory (badge: 3!)
- 📅 Appointments (badge: 8)
- 👥 Customers
- 📈 Revenue & Sales
- 🎟️ Coupons & Promo

**CONFIGURATION**
- ⚙️ Site Settings
- 🔔 Notifications
- 👤 Admin Users
- 📝 Activity Log
- 🚪 Logout

---

### MAIN CONTENT AREA

### Header Controls
- **Title:** "ADMIN DASHBOARD OVERVIEW"
- **Last Updated:** "Last updated: March 11, 2026 — 10:42 AM"
- **Date Filter:** "Date Range: Last 30 days ▾" (dropdown)
- **Action Buttons:**
  - "Export Report"
  - "+ Add Product"

---

### SYSTEM ALERTS SECTION

**Alert Cards** (Stacked)

1. **Error Alert (Red)**
   - Icon: ✕
   - Message: "3 products are out of stock — Immediate restock required"

2. **Warning Alert (Yellow)**
   - Icon: ⚠
   - Message: "12 orders are pending shipment for more than 48 hours"

3. **Info Alert (Blue)**
   - Icon: ℹ
   - Message: "8 grooming appointments scheduled for today"

---

### KEY PERFORMANCE INDICATORS (KPIs)

**KPI Cards** (9 cards in grid)

1. **Total Revenue**
   - Value: $24.8K
   - Emphasis: High priority metric

2. **Total Orders**
   - Value: 342

3. **Appointments**
   - Value: 87

4. **Active Users**
   - Value: 1,205

5. **Avg Order Value**
   - Value: $72.5

6. **Revenue vs Last Month**
   - Value: +18.3%
   - Indicator: Growth metric (green)

7. **New Customers**
   - Value: +42

8. **Product Returns**
   - Value: −3.1%

9. **Grooming Utilization**
   - Value: 84%

---

### ORDER MANAGEMENT TABLE

**Section Title:** "ORDER MANAGEMENT TABLE"
**Description:** "Pending & recent orders"

**Tabs:**
- All (default)
- Pending
- Shipped
- Delivered
- Cancelled

**Table Columns:**
- Order #
- Customer
- Items
- Total
- Status
- Action

**Sample Data** (5 rows):

| Order # | Customer | Items | Total | Status | Action |
|---------|----------|-------|-------|--------|--------|
| #PM-1055 | Jane Cooper | 3 | $67.00 | Pending | [ Process ] |
| #PM-1054 | Tom Hanks | 1 | $22.50 | Shipped | [ Track ] |
| #PM-1053 | Mary Jane | 5 | $134.00 | Processing | [ View ] |
| #PM-1052 | Alex Brown | 2 | $48.99 | Delivered | [ View ] |
| #PM-1051 | Lisa Park | 1 | $19.99 | Cancelled | [ Refund ] |

**Pagination:** [ ← Prev ] [ Next → ]
**View All Link:** "View All Orders"

---

### APPOINTMENTS TABLE

**Section Title:** "APPOINTMENTS TABLE"
**Description:** "Today's + upcoming grooming"

**Tabs:**
- Today (default)
- This Week
- Pending

**Table Columns:**
- ID
- Customer
- Service
- Time
- Status
- Action

**Sample Data** (5 rows):

| ID | Customer | Service | Time | Status | Action |
|----|----------|---------|------|--------|--------|
| #GR-201 | John Doe | Full Grooming | 10:00 AM | Confirmed | [ Edit ] |
| #GR-202 | Sarah Kim | Bath & Dry | 11:30 AM | In Progress | [ View ] |
| #GR-203 | Mike Lee | Nail Clip | 1:00 PM | Pending | [ Confirm ] |
| #GR-204 | Anna Ford | Hair Trim | 2:30 PM | Confirmed | [ Edit ] |
| #GR-205 | Chris Ray | Full Grooming | 4:00 PM | Pending | [ Confirm ] |

**View All Link:** "View All"

---

### INVENTORY MANAGEMENT

**Section Title:** "INVENTORY MANAGEMENT — QUICK ACCESS"

**Search & Filter Controls**
- Search: "Search inventory by name, SKU, category..."
- Category Filter: (dropdown)
- Stock Status Filter: (dropdown)

**Action Buttons**
- "Add Product"
- "Import CSV"
- "Export"

**Inventory Table**

**Columns:**
- SKU
- Product Name
- Category
- Price
- Stock
- Sold
- Status
- Actions

**Sample Data** (6 rows):

| SKU | Product Name | Category | Price | Stock | Sold | Status | Actions |
|-----|--------------|----------|-------|-------|------|--------|---------|
| PM-001 | Royal Canin Adult 5kg | Dog Food | $45.99 | 142 | 38 | ● In Stock | Edit, Delete |
| PM-002 | Cat Tree Tower Deluxe | Cat Furniture | $79.00 | 23 | 12 | ● In Stock | Edit, Delete |
| PM-003 | Pet Grooming Shampoo | Grooming | $12.49 | 5 | 67 | ⚠ Low Stock | Restock |
| PM-004 | Bird Cage Premium | Bird Supplies | $89.99 | 0 | 28 | ✕ Out of Stock | Restock |
| PM-005 | Aquarium Filter Pro | Fish Supplies | $34.99 | 88 | 15 | ● In Stock | Edit, Delete |
| PM-006 | Dog Harness Padded | Dog Accessories | $28.00 | 3 | 92 | ⚠ Low Stock | Restock |

**Notes:**
- Low stock items flagged in red
- Inline edit capabilities
- Status badge changes color on stock level
- Restock action triggers purchase order

---

### REVENUE CHART

**Section Title:** "REVENUE CHART (LAST 12 MONTHS)"
**Chart Type:** Bar chart
**Interaction:** Hover to see exact revenue value

**Months Displayed:** Jan through Dec

**Visual Representation:**
- Vertical bars showing revenue per month
- Scale: $0 - $30k (example)
- Color: Consistent with theme

---

### TOP SELLING PRODUCTS

**Section Title:** "TOP SELLING PRODUCTS"

**List Display** (5 items):
1. Royal Canin 5kg — 142 sold
2. Cat Tree Tower — 98 sold
3. Pet Shampoo — 87 sold
4. Dog Harness — 73 sold
5. Bird Cage Pro — 61 sold

---

### NEW REGISTRATIONS TODAY

**Section Title:** "NEW REGISTRATIONS TODAY"

**Table Columns:**
- Name
- Email
- Joined
- Action

**Sample Data** (3 rows):
| Name | Email | Joined | Action |
|------|-------|--------|--------|
| Jane Cooper | jane@email.com | 10:32 AM | [ View ] |
| Tom Lee | tom@email.com | 9:14 AM | [ View ] |
| Sara Kim | sara@email.com | 8:55 AM | [ View ] |

---

### RECENT SUPPORT TICKETS

**Section Title:** "RECENT SUPPORT TICKETS"

**Table Columns:**
- Ticket #
- Subject
- Priority
- Action

**Sample Data** (3 rows):
| Ticket # | Subject | Priority | Action |
|----------|---------|----------|--------|
| #T-0091 | Order not delivered | High | [ Open ] |
| #T-0090 | Refund request | Medium | [ Open ] |
| #T-0089 | Login issue | Low | [ Open ] |

---

## KEY FEATURES SUMMARY

### Customer Features
- ✓ Product browsing with advanced filtering
- ✓ Shopping cart and checkout process
- ✓ User account management
- ✓ Order history tracking
- ✓ Grooming service booking
- ✓ Wishlist functionality
- ✓ Product reviews and ratings
- ✓ Newsletter subscription
- ✓ Customer support access
- ✓ Multiple payment methods support

### Admin Features
- ✓ Comprehensive dashboard with KPIs
- ✓ Order management and tracking
- ✓ Inventory management system
- ✓ Grooming appointment management
- ✓ Revenue and sales analytics
- ✓ Customer relationship management
- ✓ Product catalog management
- ✓ Coupon and promotional code management
- ✓ System alerts and notifications
- ✓ Activity logging and audit trails

---

## USER ROLES & PERMISSIONS

### Role 1: Customer
**Description:** Standard user with shopping and service booking capabilities
**Access:** Screens 01-09
**Capabilities:**
- Browse and purchase products
- Book grooming appointments
- Manage account and preferences
- Track orders and appointments
- Submit reviews and ratings
- Contact customer support

### Role 2: Admin
**Description:** Administrator with full business management access
**Access:** Screen 10 (Admin Dashboard)
**Capabilities:**
- View and manage orders
- Manage products and inventory
- Schedule and manage appointments
- View analytics and reports
- Manage customers
- Configure system settings
- Access activity logs

---

## INTERACTION PATTERNS

### Navigation
- Sticky header navigation for easy access
- Breadcrumb trails for context
- Sidebar menus for section navigation
- Consistent menu structure across pages

### Forms
- Clear field labels and placeholders
- Form validation with error messages
- Success confirmations via toast notifications
- Required field indication
- Optional field notation

### Data Tables
- Sortable columns
- Filterable rows
- Pagination for large datasets
- Inline actions (Edit, Delete, View)
- Bulk actions where applicable

### Visual Feedback
- Hover states on interactive elements
- Selected/active states for navigation
- Loading indicators for async operations
- Status badges for contextual information
- Color coding (green for positive, red for errors, yellow for warnings)

---

## VISUAL DESIGN TOKENS (Low-Fidelity)

### Colors
- Primary: Corporate blue
- Secondary: Accent color for secondary actions
- Success: Green for confirmations
- Error: Red for warnings and errors
- Warning: Yellow/orange for alerts
- Background: White/light gray
- Text: Dark gray/black

### Typography
- Headlines: Clear sans-serif, larger sizes
- Body text: Standard sans-serif, readable size
- Links: Underlined or colored

### Components
- Buttons: Clear labeling, distinct primary vs secondary
- Input fields: Clear borders, good contrast
- Cards: Bordered containers for grouped content
- Badges: Small labels for status indicators

---

## RESPONSIVE BEHAVIOR

Note: This wireframe is low-fidelity and shows desktop layout. 
Implementation should consider:
- Mobile-friendly navigation (hamburger menu)
- Responsive grid layouts
- Touch-friendly button sizes
- Readable text on all screen sizes
- Accessible color contrast ratios

---

## NEXT STEPS FOR DEVELOPMENT

1. **Visual Design Phase**
   - Create high-fidelity mockups
   - Define detailed design system
   - Establish color palette and typography

2. **Interaction Design**
   - Define micro-interactions and animations
   - Specify transition behaviors
   - Design error and loading states

3. **Frontend Development**
   - Build responsive HTML/CSS
   - Implement JavaScript interactions
   - Integrate with backend API

4. **Backend Development**
   - Design database schema
   - Implement API endpoints
   - Create business logic

5. **Testing**
   - Conduct user testing
   - Perform QA testing
   - Accessibility testing

6. **Deployment**
   - Prepare for production
   - Set up monitoring
   - Plan launch strategy

---

*End of Detailed Wireframe Document*
