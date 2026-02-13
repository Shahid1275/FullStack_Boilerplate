# 🚀 React TypeScript Quick Start Guide

## 🎯 Getting Started in 5 Minutes

### 1️⃣ Install Dependencies

```bash
cd frontend-react-ts
npm install
```

**New dependencies added:**
- `i18next` - Internationalization
- `react-i18next` - React integration
- `i18next-browser-languagedetector` - Language detection
- `yup` - Form validation

---

### 2️⃣ Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:5173`

---

## 📦 New Enterprise Features

### 🔌 HTTP Adapter (Type-safe API calls)

```typescript
import { httpAdapter } from '@/adapters';

// GET request with type safety
const response = await httpAdapter.get<User>('/api/users/1');
console.log(response.data); // Fully typed User object

// POST request
const newUser = await httpAdapter.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

---

### 💾 Storage Adapter (Type-safe storage)

```typescript
import { storageAdapter } from '@/adapters';

// Store data with type inference
interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
}

storageAdapter.set<UserSettings>('settings', {
  theme: 'dark',
  language: 'en'
});

// Retrieve data with type safety
const settings = storageAdapter.get<UserSettings>('settings');
console.log(settings?.theme); // TypeScript knows this is 'light' | 'dark'
```

---

### 🏛️ Domain Models (OOP approach)

```typescript
import { UserModel } from '@/shared/models';

const user = new UserModel({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin'
});

console.log(user.displayName); // "John Doe"
console.log(user.isAdmin); // true
console.log(user.initials); // "JD"
```

---

### 📋 TypeScript Enums (Type-safe constants)

```typescript
import { UserRole, Theme, Language } from '@/enums';

// Type-safe role checking
const checkAccess = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Full access';
    case UserRole.USER:
      return 'Limited access';
    case UserRole.GUEST:
      return 'No access';
  }
};

// Auto-completion works!
const access = checkAccess(UserRole.ADMIN);
```

---

### 🎁 Higher Order Components

```typescript
import { withAuth, withRole, withLoading } from '@/hoc';

// Protect component with authentication
const ProtectedComponent = withAuth(MyComponent);

// Restrict by role
const AdminComponent = withRole([UserRole.ADMIN])(MyComponent);

// Add loading state
interface Props {
  data: string;
}

const LoadingComponent = withLoading<Props>(MyComponent);

// Use with loading prop
<LoadingComponent data="test" isLoading={true} />
```

---

### 🌍 Internationalization

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ur')}>اردو</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
    </div>
  );
}
```

---

### ✅ Form Validation with Yup + TypeScript

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas';

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data); // Fully typed!
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### 🔀 Data Transformers

```typescript
import { userTransformer } from '@/transformers';

// API response
const apiUser = {
  _id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  createdAt: '2026-01-20T00:00:00Z',
  updatedAt: '2026-01-20T00:00:00Z'
};

// Transform to frontend model
const frontendUser = userTransformer.fromApi(apiUser);
console.log(frontendUser.id); // '123' (transformed from _id)
console.log(frontendUser.createdAt); // Date object

// Transform back to API format
const apiData = userTransformer.toApi(frontendUser);
```

---

### 📊 Monitoring & Analytics

```typescript
import { errorTracking, analytics, performance } from '@/monitoring';

// Initialize monitoring
errorTracking.init();
analytics.init();

// Track errors
try {
  // Some code
} catch (error) {
  errorTracking.captureError(error as Error, {
    context: 'user-profile',
    userId: user.id
  });
}

// Track events
analytics.trackEvent('button_click', {
  buttonName: 'submit',
  page: 'login'
});

// Track page views
analytics.pageView('/dashboard');

// Measure performance
const metrics = performance.getPageLoadMetrics();
console.log('Page load time:', metrics?.loadComplete);
```

---

### 🎭 Provider Composition

```typescript
// main.tsx
import { AppProviders } from '@/providers';
import '@/i18n'; // Initialize i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
```

All providers are composed in one place:
- Redux Provider
- Router Provider
- Theme Provider
- Error Boundary
- Toast Notifications

---

### 📐 Layout Components

```typescript
import { MainLayout, AuthLayout, DashboardLayout } from '@/layouts';

// Use in routes
<Route element={<MainLayout />}>
  <Route path="/" element={<HomePage />} />
</Route>

<Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginPage />} />
</Route>

<Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

---

## 🛠️ TypeScript Tips

### 1. Type-safe API responses

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

const response = await httpAdapter.get<ApiResponse<User>>('/api/user');
const user = response.data.data; // Fully typed!
```

### 2. Generic utilities

```typescript
// Create type-safe storage wrapper
function createStorage<T>(key: string) {
  return {
    get: () => storageAdapter.get<T>(key),
    set: (value: T) => storageAdapter.set(key, value),
    remove: () => storageAdapter.remove(key)
  };
}

const userStorage = createStorage<User>('current-user');
const user = userStorage.get(); // Type: User | null
```

### 3. Enum usage

```typescript
import { UserRole, Theme } from '@/enums';

// Type-safe function parameters
function applyTheme(theme: Theme) {
  document.body.className = theme;
}

applyTheme(Theme.DARK); // ✅ Valid
applyTheme('dark'); // ❌ TypeScript error
```

---

## 📁 Folder Structure Quick Reference

```
src/
├── adapters/       # Infrastructure adapters (HTTP, Storage)
├── core/           # Core business logic
├── domain/         # Domain models & logic
├── enums/          # TypeScript enums
├── hoc/            # Higher Order Components
├── i18n/           # Internationalization
├── layouts/        # Layout components
├── middleware/     # Redux middleware
├── monitoring/     # Error tracking & analytics
├── providers/      # Provider composition
├── schemas/        # Validation schemas
├── shared/         # Shared models & interfaces
└── transformers/   # Data transformers
```

---

## 🎯 Common Use Cases

### Protected Routes

```typescript
import { withAuth } from '@/hoc';

const DashboardPage = withAuth(() => {
  return <div>Dashboard Content</div>;
});
```

### Role-based Access

```typescript
import { withRole } from '@/hoc';
import { UserRole } from '@/enums';

const AdminPage = withRole([UserRole.ADMIN])(() => {
  return <div>Admin Only</div>;
});
```

### Multi-language Support

```typescript
// Add translation keys in i18n/locales/en.json
{
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Welcome back!"
  }
}

// Use in component
const { t } = useTranslation();
<h1>{t('dashboard.title')}</h1>
```

---

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

---

## 📖 Additional Documentation

- [Enterprise Structure Guide](./ENTERPRISE_STRUCTURE_TS.md)
- [SSE-Level Verification](./SSE_LEVEL_VERIFICATION_TS.md)
- [Comparison Guide](./COMPARISON_GUIDE_TS.md)

---

**Happy Coding with TypeScript! 🎉**
