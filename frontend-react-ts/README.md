# Frontend React + TypeScript Project 🚀

**101% Enterprise-Level** production-ready React TypeScript application with Vite, Tailwind CSS, and Redux Toolkit.

## ✨ Features

### Core Features
- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React features
- 🔷 **TypeScript** - Full type safety with strict mode
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔄 **Redux Toolkit** - State management
- 🛣️ **React Router** - Client-side routing
- 🔒 **Protected Routes** - Route guards
- 🎯 **Error Boundary** - Graceful error handling
- 📱 **Responsive Design** - Mobile-first approach
- 🔌 **API Integration** - Axios with interceptors
- 🍞 **Toast Notifications** - User feedback

### 🆕 Enterprise Features (NEW!)
- 🔌 **Adapters** - Infrastructure abstraction with generics
- 🎯 **Core Modules** - Framework-agnostic business logic
- 🏛️ **Domain-Driven Design** - Business domain models with classes
- 📋 **TypeScript Enums** - Type-safe constants
- 🎁 **HOC Patterns** - Higher Order Components with generics
- 🌍 **i18n Support** - Multi-language (English, Urdu, Hindi)
- 📐 **Layout System** - Reusable layout components
- ⚙️ **Redux Middleware** - API logging with types
- 📊 **Monitoring** - Error tracking, analytics, performance
- 🎭 **Provider Composition** - Centralized provider management
- ✅ **Validation Schemas** - Yup + TypeScript integration
- 🔄 **Shared Resources** - Models, interfaces, constants
- 🔀 **Transformers** - Type-safe data transformations

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure (35+ Folders)

### 🆕 Enterprise Layers
```
src/
├── adapters/           # Infrastructure adapters (HTTP, Storage)
├── core/               # Core business logic (auth, http, storage)
├── domain/             # Domain models & logic (user, auth)
├── enums/              # TypeScript enums
├── hoc/                # Higher Order Components
├── i18n/               # Internationalization (en, ur, hi)
├── layouts/            # Layout components
├── middleware/         # Redux middleware
├── monitoring/         # Error tracking & analytics
├── providers/          # Provider composition
├── schemas/            # Validation schemas (Yup)
├── shared/             # Shared models & interfaces
└── transformers/       # Data transformers
```

### Standard Layers
```
src/
├── components/
│   ├── common/          # Reusable components (Button, Input, Modal, etc.)
│   └── layout/          # Layout components (Header, Footer, Layout)
├── pages/               # Page components
├── routes/              # Route configuration
├── store/               # Redux store
│   └── slices/          # Redux slices (auth, user, ui)
├── services/            # API services
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── config/              # Configuration files
├── constants/           # Application constants
└── assets/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=React TypeScript App
VITE_APP_VERSION=1.0.0
```

## Key Features

### TypeScript Integration

Full TypeScript support with:

- Type-safe Redux store and hooks
- Typed API services
- Interface definitions for all data models
- Strict type checking

### Redux Toolkit Integration

The project uses Redux Toolkit for state management with pre-configured slices:

- **authSlice** - Authentication state
- **userSlice** - User profile and data
- **uiSlice** - UI state (sidebar, theme, notifications)

### API Service

Axios instance with request/response interceptors for:

- Automatic token injection
- Error handling
- Response transformation

### Reusable Components

- Button - Multiple variants and sizes
- Input - Form input with validation
- Card - Content container
- Modal - Dialog component
- Loader - Loading indicator

### Custom Hooks

- `useDebounce` - Debounce values with generic type support
- `useLocalStorage` - Persist state to localStorage with type safety
- `useAppDispatch` - Typed dispatch hook
- `useAppSelector` - Typed selector hook

## Best Practices

- Component-based architecture
- Absolute imports with path aliases
- Error boundaries for error handling
- Code splitting for optimal performance
- Environment-based configuration
- Full TypeScript type safety
- Strict ESLint rules

## License

MIT
