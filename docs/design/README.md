# Design System & UI/UX Wireframe Framework

## 📦 Overview

This design system provides a **project-agnostic foundation** for building consistent, accessible, and beautiful user interfaces across any domain — SaaS, e-commerce, content platforms, dashboards, and mobile apps.

## 🎯 Core Principles

1. **User-Centered**: Every design decision solves a user problem
2. **Context-Aware**: Design for actual device, screen size, and user literacy
3. **Pragmatic Beauty**: Visually polished without sacrificing usability
4. **Accessible**: WCAG 2.1 AA compliance as baseline
5. **Consistent**: Unified visual language across all touchpoints

## 📁 File Structure

```
design-system/
├── DESIGN.md                 # Design system documentation
├── README.md                 # This file
├── tokens/
│   └── colors.css           # CSS custom properties (design tokens)
├── components/
│   └── core.css             # Component styles (buttons, forms, etc.)
├── wireframes/
│   └── index.html           # Interactive wireframe showcase
└── patterns/                # (Future) Common UI patterns
```

## 🚀 Quick Start

### 1. Include Design Tokens

```html
<link rel="stylesheet" href="tokens/colors.css">
```

### 2. Include Component Styles

```html
<link rel="stylesheet" href="components/core.css">
```

### 3. Use Components

```html
<button class="btn btn-primary">Get Started</button>
<input type="email" class="form-input" placeholder="you@example.com">
<div class="alert alert-success">Success! Your changes saved.</div>
```

## 🎨 Design Tokens

### Color Palette

**Primary Colors (Indigo)**
- `--color-primary-500`: `#6366F1` — Main brand color
- Full scale: 50-900 for various states

**Neutral Colors**
- `--color-neutral-0`: `#FFFFFF` — Backgrounds
- `--color-neutral-800`: `#1F2937` — Primary text
- Full scale: 0-900 for hierarchy

**Semantic Colors**
- Success: `--color-success-500`: `#10B981`
- Warning: `--color-warning-500`: `#F59E0B`
- Error: `--color-error-500`: `#EF4444`
- Info: `--color-info-500`: `#3B82F6`

### Typography

**Font Stack**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Type Scale**
- `--text-xs` (12px) — Captions
- `--text-sm` (14px) — Secondary text
- `--text-base` (16px) — Body
- `--text-lg` (18px) — Lead paragraphs
- `--text-xl` to `--text-4xl` — Headings

### Spacing

Based on 4px grid:
- `--space-1` to `--space-24` (4px - 96px)

## 🧩 Component Library

### Buttons

```html
<!-- Primary -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary -->
<button class="btn btn-secondary">Secondary</button>

<!-- Tertiary -->
<button class="btn btn-tertiary">Tertiary</button>

<!-- Danger -->
<button class="btn btn-danger">Delete</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Form Elements

```html
<div class="form-group">
  <label class="form-label form-label-required">Email</label>
  <input type="email" class="form-input" placeholder="you@example.com">
  <span class="form-helper">We'll never share your email.</span>
</div>

<div class="form-group">
  <label class="form-label">Password</label>
  <input type="password" class="form-input form-input-error">
  <span class="form-error">Password must be 8+ characters</span>
</div>

<!-- Checkbox -->
<div class="form-check">
  <input type="checkbox" id="terms" class="form-check-input">
  <label for="terms" class="form-check-label">I agree</label>
</div>

<!-- Toggle Switch -->
<label class="toggle">
  <input type="checkbox" class="toggle-input">
  <span class="toggle-slider"></span>
</label>
```

### Navigation

```html
<!-- Top Navbar -->
<nav class="navbar">
  <a href="/" class="navbar-brand">Brand</a>
  <ul class="navbar-nav">
    <li><a href="#" class="nav-link active">Home</a></li>
    <li><a href="#" class="nav-link">About</a></li>
  </ul>
</nav>

<!-- Sidebar -->
<aside class="sidebar">
  <ul class="sidebar-nav">
    <li class="sidebar-item">
      <a href="#" class="sidebar-link active">Dashboard</a>
    </li>
  </ul>
</aside>

<!-- Breadcrumbs -->
<ul class="breadcrumb">
  <li class="breadcrumb-item">
    <a href="#" class="breadcrumb-link">Home</a>
  </li>
  <li class="breadcrumb-item active">
    <span class="breadcrumb-link">Current</span>
  </li>
</ul>
```

### Feedback Components

```html
<!-- Alerts -->
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-info">Info message</div>

<!-- Loading Spinner -->
<div class="spinner"></div>

<!-- Progress Bar -->
<div class="progress">
  <div class="progress-bar" style="width: 60%"></div>
</div>

<!-- Empty State -->
<div class="empty-state">
  <div class="empty-state-title">No items found</div>
  <p class="empty-state-description">Try adjusting your search</p>
</div>
```

### Data Display

```html
<!-- Card -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">Content here</div>
  <div class="card-footer">Footer actions</div>
</div>

<!-- Table -->
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Column</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Badges -->
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Error</span>

<!-- Avatar -->
<div class="avatar">JD</div>
<div class="avatar avatar-sm">JD</div>
<div class="avatar avatar-lg">JD</div>
```

## ♿ Accessibility

### Color Contrast
- Normal text: minimum 4.5:1 contrast ratio
- Large text (18px+): minimum 3:1 contrast ratio
- UI components: minimum 3:1 contrast ratio

### Keyboard Navigation
- All interactive elements are focusable
- Visible focus indicators (2px outline)
- Logical tab order

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled automatically */
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile first, then min-width breakpoints */
--bp-sm: 640px;   /* Large phones */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Laptops */
--bp-xl: 1280px;  /* Desktops */
--bp-2xl: 1536px; /* Large screens */
```

## 🎭 Dark Mode

Dark mode is automatically applied based on system preference:

```css
@media (prefers-color-scheme: dark) {
  /* Neutral colors invert automatically */
}
```

## 📐 Wireframes

View the interactive wireframe showcase at `wireframes/index.html`. Includes:

- **Desktop Application**: SaaS dashboard layout
- **Mobile Application**: Native app with bottom nav
- **Analytics Dashboard**: Data-heavy widget layout
- **E-Commerce**: Product listing with filters
- **Authentication**: Login/signup forms
- **Content Platform**: Article layout with TOC

Open in browser:
```bash
open wireframes/index.html
```

## 🤝 Contributing

### Adding New Components

1. Create component in `components/` directory
2. Document usage in `DESIGN.md`
3. Add to wireframe showcase if applicable
4. Test accessibility (keyboard, screen reader)
5. Ensure responsive behavior

### Design Token Guidelines

- Use semantic naming (`--color-primary-500` not `--color-blue`)
- Maintain 4px grid for spacing
- Document usage in `DESIGN.md`
- Test contrast ratios

## 📄 License

This design system is project-agnostic and can be adapted for any use case.

---

**Built with**: CSS Custom Properties, Semantic HTML, Accessibility First
**Compatible with**: All modern browsers, Tailwind CSS (token mapping available)
