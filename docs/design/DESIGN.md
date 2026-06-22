# Design System — Foundation

## Overview
A project-agnostic design system built for adaptability across SaaS, e-commerce, content platforms, dashboards, and mobile apps.

## Core Principles
1. **User-Centered**: Every design decision solves a user problem
2. **Context-Aware**: Design for actual device, screen size, and user literacy
3. **Pragmatic Beauty**: Visually polished without sacrificing usability
4. **Accessible**: WCAG 2.1 AA compliance as baseline
5. **Consistent**: Unified visual language across all touchpoints

---

## Design Tokens

### Color Palette

#### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-50` | `#EEF2FF` | Background accents |
| `--color-primary-100` | `#E0E7FF` | Hover states |
| `--color-primary-200` | `#C7D2FE` | Borders |
| `--color-primary-300` | `#A5B4FC` | Secondary elements |
| `--color-primary-400` | `#818CF8` | Active states |
| `--color-primary-500` | `#6366F1` | Primary buttons, links |
| `--color-primary-600` | `#4F46E5` | Hover primary |
| `--color-primary-700` | `#4338CA` | Pressed states |
| `--color-primary-800` | `#3730A3` | Dark mode primary |
| `--color-primary-900` | `#312E81` | Deep accents |

#### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-neutral-0` | `#FFFFFF` | Backgrounds |
| `--color-neutral-50` | `#F9FAFB` | Section backgrounds |
| `--color-neutral-100` | `#F3F4F6` | Cards |
| `--color-neutral-200` | `#E5E7EB` | Borders |
| `--color-neutral-300` | `#D1D5DB` | Dividers |
| `--color-neutral-400` | `#9CA3AF` | Placeholder text |
| `--color-neutral-500` | `#6B7280` | Secondary text |
| `--color-neutral-600` | `#4B5563` | Body text |
| `--color-neutral-700` | `#374151` | Headings |
| `--color-neutral-800` | `#1F2937` | Primary text |
| `--color-neutral-900` | `#111827` | High contrast |

#### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-success-500` | `#10B981` | Success states |
| `--color-warning-500` | `#F59E0B` | Warnings |
| `--color-error-500` | `#EF4444` | Errors |
| `--color-info-500` | `#3B82F6` | Information |

---

### Typography

#### Font Family
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

#### Type Scale
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 0.75rem (12px) | 1rem | 400 | Captions, labels |
| `--text-sm` | 0.875rem (14px) | 1.25rem | 400 | Secondary text |
| `--text-base` | 1rem (16px) | 1.5rem | 400 | Body text |
| `--text-lg` | 1.125rem (18px) | 1.75rem | 400 | Lead paragraphs |
| `--text-xl` | 1.25rem (20px) | 1.75rem | 600 | H4 headings |
| `--text-2xl` | 1.5rem (24px) | 2rem | 600 | H3 headings |
| `--text-3xl` | 1.875rem (30px) | 2.25rem | 700 | H2 headings |
| `--text-4xl` | 2.25rem (36px) | 2.5rem | 700 | H1 headings |

---

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem (4px) | Tight gaps |
| `--space-2` | 0.5rem (8px) | Icon padding |
| `--space-3` | 0.75rem (12px) | Component padding |
| `--space-4` | 1rem (16px) | Standard gap |
| `--space-5` | 1.25rem (20px) | Section padding |
| `--space-6` | 1.5rem (24px) | Card padding |
| `--space-8` | 2rem (32px) | Layout gaps |
| `--space-10` | 2.5rem (40px) | Section margins |
| `--space-12` | 3rem (48px) | Page margins |
| `--space-16` | 4rem (64px) | Hero spacing |

---

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.25rem (4px) | Buttons, inputs |
| `--radius-md` | 0.5rem (8px) | Cards, modals |
| `--radius-lg` | 0.75rem (12px) | Large cards |
| `--radius-xl` | 1rem (16px) | Hero elements |
| `--radius-full` | 9999px | Pills, avatars |

---

### Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Floating panels |

---

## Component Library

### Button Variants
1. **Primary**: Filled, high emphasis
2. **Secondary**: Outlined, medium emphasis
3. **Tertiary**: Text-only, low emphasis
4. **Danger**: Error states, destructive actions

### Form Elements
- Text Input
- Select Dropdown
- Checkbox
- Radio Button
- Toggle Switch
- Text Area

### Navigation
- Top Navigation Bar
- Side Navigation
- Breadcrumbs
- Pagination
- Tabs

### Feedback
- Alert Banners
- Toast Notifications
- Loading Spinners
- Progress Bars
- Empty States

### Data Display
- Tables
- Data Cards
- Lists
- Badges/Tags
- Avatars

---

## Accessibility Guidelines

### Color Contrast
- Normal text: minimum 4.5:1 contrast ratio
- Large text (18px+): minimum 3:1 contrast ratio
- UI components: minimum 3:1 contrast ratio

### Keyboard Navigation
- All interactive elements must be focusable
- Visible focus indicators (2px outline minimum)
- Logical tab order following visual layout
- Skip links for main content

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for icon-only buttons
- Alt text for all images
- Live regions for dynamic content

### Motion Preferences
- Respect `prefers-reduced-motion`
- Provide non-motion alternatives for animations
- Keep animations under 300ms

---

## Responsive Breakpoints
| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `--bp-sm` | 640px | Large phones |
| `--bp-md` | 768px | Tablets |
| `--bp-lg` | 1024px | Laptops |
| `--bp-xl` | 1280px | Desktops |
| `--bp-2xl` | 1536px | Large screens |

---

## File Structure
```
design-system/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── breakpoints.css
├── components/
│   ├── buttons/
│   ├── forms/
│   ├── navigation/
│   ├── feedback/
│   └── data-display/
├── wireframes/
│   ├── mobile/
│   ├── tablet/
│   └── desktop/
├── patterns/
│   ├── authentication/
│   ├── dashboards/
│   ├── e-commerce/
│   └── content/
└── guidelines/
    ├── accessibility.md
    ├── branding.md
    └── contribution.md
```
