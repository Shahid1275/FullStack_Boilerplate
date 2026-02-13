# Frontend React JS - Folder Structure

## 📁 Complete Scalable Architecture

```
frontend-react-js/
│
├── public/                          # Static assets served directly
│   ├── assets/                      # Public assets
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   │
│   ├── api/                         # API Layer (HTTP Communication)
│   │   ├── endpoints/               # API endpoint definitions
│   │   │   ├── auth.api.js          # Authentication APIs
│   │   │   ├── user.api.js          # User APIs
│   │   │   └── ...                  # Other domain APIs
│   │   ├── interceptors/            # Axios interceptors
│   │   ├── client.js                # Axios instance config
│   │   └── index.js                 # API exports
│   │
│   ├── assets/                      # Static resources
│   │   ├── images/                  # Image files
│   │   ├── icons/                   # Icon files (SVG, etc.)
│   │   ├── fonts/                   # Custom fonts
│   │   └── videos/                  # Video files
│   │
│   ├── components/                  # Reusable UI Components
│   │   ├── common/                  # Generic components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Dropdown/
│   │   │   ├── Table/
│   │   │   └── ...
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Layout/
│   │   └── index.js
│   │
│   ├── config/                      # App configuration
│   │   ├── env.js                   # Environment config
│   │   ├── theme.js                 # Theme config
│   │   └── index.js
│   │
│   ├── constants/                   # Application constants
│   │   ├── api.js                   # API constants
│   │   ├── routes.js                # Route constants
│   │   ├── app.js                   # App constants
│   │   └── index.js
│   │
│   ├── context/                     # React Context providers
│   │   ├── ThemeContext.jsx         # Theme context
│   │   ├── AuthContext.jsx          # Auth context
│   │   └── index.js
│   │
│   ├── features/                    # Feature-based modules
│   │   ├── auth/                    # Authentication feature
│   │   │   ├── components/          # Auth-specific components
│   │   │   ├── hooks/               # Auth-specific hooks
│   │   │   ├── utils/               # Auth-specific utilities
│   │   │   └── index.js
│   │   ├── dashboard/               # Dashboard feature
│   │   ├── profile/                 # Profile feature
│   │   └── ...                      # Other features
│   │
│   ├── guards/                      # Route guards
│   │   ├── AuthGuard.jsx            # Authentication guard
│   │   ├── RoleGuard.jsx            # Role-based guard
│   │   ├── GuestGuard.jsx           # Guest-only guard
│   │   └── index.js
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useDebounce.js           # Debounce hook
│   │   ├── useLocalStorage.js       # LocalStorage hook
│   │   ├── useToggle.js             # Toggle hook
│   │   ├── useFetch.js              # Fetch hook
│   │   └── index.js
│   │
│   ├── layouts/                     # Page layouts
│   │   ├── MainLayout.jsx           # Main layout
│   │   ├── AuthLayout.jsx           # Auth layout
│   │   ├── DashboardLayout.jsx      # Dashboard layout
│   │   └── index.js
│   │
│   ├── lib/                         # External library wrappers
│   │   ├── logger.js                # Logger utility
│   │   ├── storage.js               # Storage wrapper
│   │   ├── analytics.js             # Analytics wrapper
│   │   └── index.js
│   │
│   ├── pages/                       # Page components (Route views)
│   │   ├── Home/
│   │   │   ├── index.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   ├── Profile/
│   │   ├── NotFound/
│   │   └── index.js
│   │
│   ├── routes/                      # Routing configuration
│   │   ├── AppRoutes.jsx            # Main routes
│   │   ├── ProtectedRoute.jsx       # Protected route wrapper
│   │   ├── PublicRoute.jsx          # Public route wrapper
│   │   └── index.js
│   │
│   ├── services/                    # Business logic services
│   │   ├── api.js                   # API service (deprecated)
│   │   ├── authService.js           # Auth business logic
│   │   ├── userService.js           # User business logic
│   │   └── index.js
│   │
│   ├── store/                       # Redux store
│   │   ├── slices/                  # Redux slices
│   │   │   ├── authSlice.js
│   │   │   ├── userSlice.js
│   │   │   ├── uiSlice.js
│   │   │   └── index.js
│   │   ├── middleware/              # Custom middleware
│   │   ├── store.js                 # Store configuration
│   │   └── index.js
│   │
│   ├── styles/                      # Global styles
│   │   ├── variables.css            # CSS variables
│   │   ├── animations.css           # Animations
│   │   ├── utilities.css            # Utility classes
│   │   └── index.css                # Main styles
│   │
│   ├── tests/                       # Test files
│   │   ├── unit/                    # Unit tests
│   │   ├── integration/             # Integration tests
│   │   ├── e2e/                     # End-to-end tests
│   │   └── setup.js                 # Test setup
│   │
│   ├── types/                       # TypeScript type definitions / JSDoc
│   │   ├── user.types.js            # User types
│   │   ├── api.types.js             # API types
│   │   └── index.js
│   │
│   ├── utils/                       # Utility functions
│   │   ├── helpers.js               # Helper functions
│   │   ├── validation.js            # Validation utilities
│   │   ├── formatters.js            # Formatting utilities
│   │   ├── constants.js             # Deprecated constants
│   │   └── index.js
│   │
│   ├── App.jsx                      # Root App component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Root styles
│
├── .env.example                     # Environment variables example
├── .env.local                       # Local environment (gitignored)
├── .eslintrc.cjs                    # ESLint configuration
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── postcss.config.js                # PostCSS config
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
└── README.md                        # Documentation
```

## 🎯 Folder Purpose & Best Practices

### `/api` - API Communication Layer
- **Purpose**: Centralized HTTP requests and API communication
- **Best Practice**: 
  - One file per domain (auth.api.js, user.api.js)
  - Use client.js for axios configuration
  - All API calls return promises
  - Handle errors in interceptors

### `/assets` - Static Resources
- **Purpose**: Images, icons, fonts, videos
- **Best Practice**:
  - Organize by type (images/, icons/, fonts/)
  - Use SVG for icons
  - Optimize images before adding
  - Use lazy loading for heavy assets

### `/components` - Reusable UI Components
- **Purpose**: Presentational components used across the app
- **Best Practice**:
  - Keep components small and focused
  - Use composition over inheritance
  - Each component in its own folder
  - Include component-specific styles
  - Export from index.js

### `/config` - Configuration Files
- **Purpose**: App-wide configuration
- **Best Practice**:
  - Environment-based configs
  - Type-safe configurations
  - No secrets in code

### `/constants` - Application Constants
- **Purpose**: Fixed values used throughout app
- **Best Practice**:
  - Group related constants
  - Use UPPER_CASE naming
  - Export as objects for namespacing

### `/context` - React Context Providers
- **Purpose**: Global state management without Redux
- **Best Practice**:
  - Use for theme, auth, language
  - Keep context focused
  - Provide custom hooks (useTheme)

### `/features` - Feature Modules
- **Purpose**: Domain-specific functionality
- **Best Practice**:
  - Each feature is self-contained
  - Can have own components, hooks, utils
  - Promotes feature-based architecture
  - Example: auth/, dashboard/, profile/

### `/guards` - Route Protection
- **Purpose**: Authorization and authentication checks
- **Best Practice**:
  - AuthGuard for protected routes
  - RoleGuard for role-based access
  - GuestGuard for non-auth pages

### `/hooks` - Custom React Hooks
- **Purpose**: Reusable stateful logic
- **Best Practice**:
  - Prefix with "use"
  - Keep hooks pure and focused
  - Document parameters and return values

### `/layouts` - Page Layouts
- **Purpose**: Structural templates for pages
- **Best Practice**:
  - MainLayout for public pages
  - DashboardLayout for authenticated
  - Keep layouts flexible

### `/lib` - Third-party Wrappers
- **Purpose**: Abstractions over external libraries
- **Best Practice**:
  - Wrap logger, analytics, storage
  - Makes library swapping easier
  - Centralized configuration

### `/pages` - Route Components
- **Purpose**: Top-level components that represent routes
- **Best Practice**:
  - One page per route
  - Compose from components
  - Handle data fetching here
  - Use lazy loading

### `/routes` - Routing Configuration
- **Purpose**: Define app navigation
- **Best Practice**:
  - Centralized route definitions
  - Use constants for paths
  - Lazy load heavy pages

### `/services` - Business Logic
- **Purpose**: Complex business operations
- **Best Practice**:
  - Separate from components
  - Reusable across app
  - Pure functions when possible

### `/store` - Redux State Management
- **Purpose**: Global application state
- **Best Practice**:
  - Use Redux Toolkit
  - Slice per domain
  - Async logic in thunks
  - Keep state normalized

### `/styles` - Global Styles
- **Purpose**: App-wide CSS
- **Best Practice**:
  - Use CSS variables
  - Tailwind for utilities
  - Component styles in components
  - Theme-aware styles

### `/tests` - Test Files
- **Purpose**: Automated testing
- **Best Practice**:
  - Mirror src structure
  - Unit tests for utilities
  - Integration for features
  - E2E for critical flows

### `/types` - Type Definitions
- **Purpose**: JSDoc types or TypeScript definitions
- **Best Practice**:
  - Document complex objects
  - Share types across modules
  - Use for API responses

### `/utils` - Utility Functions
- **Purpose**: Pure helper functions
- **Best Practice**:
  - Keep functions small
  - Fully tested
  - No side effects
  - Document well

## 🚀 Usage Examples

### Adding a New Feature
```
features/
└── products/
    ├── components/
    │   ├── ProductCard.jsx
    │   └── ProductList.jsx
    ├── hooks/
    │   └── useProducts.js
    ├── api/
    │   └── products.api.js
    └── index.js
```

### Adding a New Page
```
pages/
└── Products/
    ├── index.jsx          # Main component
    ├── Products.module.css # Styles
    └── components/         # Page-specific components
```

## 🎓 Scalability Benefits

✅ **Modular**: Each feature is self-contained  
✅ **Maintainable**: Clear separation of concerns  
✅ **Testable**: Easy to test individual modules  
✅ **Reusable**: Components and utilities are shared  
✅ **Scalable**: Add features without affecting others  
✅ **Collaborative**: Teams can work on different features  
✅ **Type-Safe**: JSDoc or TypeScript support  
✅ **Performance**: Code-splitting and lazy loading ready

## 📝 Notes

- This structure follows **feature-based architecture** for scalability
- Suitable for **small to enterprise-level** applications
- Supports both **Redux** and **Context API**
- Ready for **testing** (unit, integration, e2e)
- **Production-ready** with best practices
