# Task Breakdown: PawluApp

> **Estimated Duration:** 2 Days (**16 hours total**)

---

## Epic: Build PawluApp

As a user, I want to browse products, add them to a cart, and complete a checkout process, so that I can purchase items seamlessly via a mobile app.

---

### Story 1: Project Initialization

**Description:** Set up the foundation for a scalable React Native app using Expo and Storybook.

#### Subtasks:
- **[1.1] Initialize Expo App** – 10 min  
- **[1.2] Setup Boilerplate & Navigation** – 20 min  
- **[1.3] Integrate Storybook** – 20 min  
- **[1.4] Load Custom Font (Inter)** – 10 min

**Total: ~1 hour**

---

### Story 2: Analyze API & UI Design

**Description:** Review Postman and Figma to inform component structure and business logic.

#### Subtasks:
- **[2.1] Explore API in Postman** – 25 min  
- **[2.2] Analyze Figma UI** – 35 min

**Total: ~1 hour**

---

### Story 3: Design System & Atomic Structure

**Description:** Set up the Atomic directory structure and implement global styles.

#### Subtasks:
- **[3.1] Setup Atomic Directory (atoms, molecules, organisms)** – 20 min  
- **[3.2] Create Typography System** – 30 min  
- **[3.3] Define Colors & Theme Provider** – 20 min  
- **[3.4] Build Icon System (SVG Manager)** – 30 min

**Total: ~1.5 hours**

---

### Story 4: Core Component Development

**Description:** Build reusable UI components with test and story coverage.

#### Subtasks:
- **[4.1] Atoms (e.g., Button, Input, Checkbox)** – 1.5 hours  
- **[4.2] Molecules (e.g., DropdownField, TextInputField)** – 1.5 hours  
- **[4.3] Organisms (e.g., CartItemList, CartSummaryCard)** – 1.5 hours

**Total: ~4.5 hours**

---

### Story 5: Screen Layouts

**Description:** Compose static layouts for all major screens using reusable components.

#### Subtasks:
- **[5.1] Splash Screen** – 10 min  
- **[5.2] Product Listing Screen** – 30 min  
- **[5.3] Product Details Screen** – 30 min  
- **[5.4] Cart Screen** – 30 min  
- **[5.5] Checkout Screen** – 30 min

**Total: ~2 hours**

---

### Story 6: API Integration Setup

**Description:** Set up tools and architecture to handle API calls and state management.

#### Subtasks:
- **[6.1] Install & Setup React Query** – 20 min  
- **[6.2] Setup Zustand Store (e.g., cart, shipping)** – 30 min  
- **[6.3] Organize `/services` and `/domain/types`** – 10 min

**Total: ~1 hour**

---

### Story 7: API Integration

**Description:** Connect components with backend APIs, include loading and error handling.

#### Subtasks:
- **[7.1] Product Listing Integration** – 15 min  
- **[7.2] Product Details Integration** – 15 min  
- **[7.3] Cart Integration** – 15 min  
- **[7.4] Checkout Integration** – 15 min

**Total: ~1 hour**

---

### Story 8: Checkout UX Enhancements

**Description:** Finalize UX flow for shipping, summary, and order placement.

#### Subtasks:
- **[8.1] Add Icons to Shipping Options** – 15 min  
- **[8.2] Show Message for No Shipping Options** – 10 min  
- **[8.3] Update Totals Based on Shipping** – 15 min  
- **[8.4] Send Checkout Payload to API** – 20 min

**Total: ~1 hour**

---

### Story 9: Documentation

**Description:** Document component structure and architectural approach.

#### Subtasks:
- **[9.1] Document Atoms** – 30 min  
- **[9.2] Document Molecules & Organisms** – 30 min

**Total: ~1 hour**

---

## ✅ Acceptance Criteria

- ✅ Atomic Design structure is implemented
- ✅ Screens match Figma UI
- ✅ API integration is complete and handles errors
- ✅ React Query and Zustand are initialized and used appropriately
- ✅ Payload structure follows backend spec
- ✅ Components are testable and Storybook-ready
- ✅ Component system is documented clearly

---

## Final Time Summary

| Category                   | Time     |
|---------------------------|----------|
| Project Setup             | 1 hr     |
| API + UI Analysis         | 1 hr     |
| Design System Setup       | 1.5 hrs  |
| Component Development     | 4.5 hrs  |
| Static Screen Layouts     | 2 hrs    |
| API Setup                 | 1 hr     |
| API Integration           | 1 hr     |
| Checkout Enhancements     | 1 hr     |
| Architecture Docs         | 1 hr     |
| **Total**                 | **16 hrs** (2 Days)

---

## Component Architecture (Atomic Design)

This project follows an **Atomic Design** pattern with a focus on maintainability, reusability, and scalability.

---

### Atoms

| Component       | Description |
|----------------|-------------|
| `BadgeNumber`   | Notification badge counter (e.g., cart item count). |
| `Button`        | Button variants including primary, secondary, tertiary, destructive-primary, destructive-secondary , outline |
| `Checkbox`      | Custom checkbox for forms and filters. |
| `ColorCircle`   | Displays color selections or swatches. |
| `Icon`          | Central icon manager for rendering SVG icons. |
| `IconButton`    | Buttons with icons, ideal for toolbars or inline actions. |
| `InputField`    | Basic text input, unstyled. |
| `RadioButton`   | Single radio option for grouped selections. |
| `SizeBox`       | Spacer component to manage layout gaps. |
| `SkeletonBox`   | Skeleton loaders for placeholder content. |
| `Typography`    | Reusable text with size, weight, and color props. |

---

### Molecules

| Component            | Description |
|---------------------|-------------|
| `ButtonIconGroup`    | Toggle buttons with icon labels. |
| `CartItemCard`       | Displays single product in cart with quantity and image. |
| `ColorSelector`      | Color picker (uses `ColorCircle`). |
| `DropdownField`      | Select field with options and placeholder. |
| `NumericInputField`  | Quantity selector with buttons. |
| `Pagination`         | Page controls with state awareness. |
| `RadioButtonGroup`   | Set of radio buttons for option selection. |
| `SizeSelector`       | Product size selection options. |
| `TextInputField`     | Form-ready input field with label, validation, and helper. |

---

### Organisms

| Component              | Description |
|------------------------|-------------|
| `CartItemList`          | Maps and renders a list of `CartItemCard`s. |
| `CartSummaryCard`       | Displays order summary including tax, subtotal, total. |
| `Footer`                | App footer section with branding or links. |
| `HeaderMenu`            | Top bar with navigation and actions. |
| `ProductCard`           | Product thumbnail for listing (image, price, etc). |
| `ProductImageDetails`   | Product image view for details. |
