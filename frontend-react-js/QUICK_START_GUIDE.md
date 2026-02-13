# ⚡ Quick Start Guide - Enterprise React Boilerplate

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Setup Environment (30 sec)
Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=My Enterprise App
```

### Step 3: Run Dev Server (30 sec)
```bash
npm run dev
```

✅ **Done!** App running at `http://localhost:3000`

---

## 📖 Common Tasks

### ✅ Add a New Page

1. Create page component:
```javascript
// src/pages/Products/ProductsPage.jsx
export default function ProductsPage() {
  return <div>Products</div>;
}
```

2. Add route in `src/routes/index.jsx`:
```javascript
import ProductsPage from '@/pages/Products/ProductsPage';
<Route path="/products" element={<ProductsPage />} />
```

---

### ✅ Add a New Feature Module

1. Create feature folder:
```
src/features/products/
├── components/
│   └── ProductCard.jsx
├── hooks/
│   └── useProducts.js
├── pages/
│   └── ProductsPage.jsx
└── utils/
    └── productHelpers.js
```

2. Use in routes:
```javascript
import ProductsPage from '@/features/products/pages/ProductsPage';
```

---

### ✅ Create an API Endpoint

1. Create in `src/api/endpoints/`:
```javascript
// src/api/endpoints/products.api.js
import apiClient from '@/api/client';

export const productsApi = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
};
```

2. Use in component/service:
```javascript
import { productsApi } from '@/api/endpoints/products.api';
const products = await productsApi.getAll();
```

---

### ✅ Add Redux State

1. Create slice in `src/store/slices/`:
```javascript
// src/store/slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
```

2. Add to root reducer:
```javascript
// src/store/rootReducer.js
import productsReducer from './slices/productsSlice';

export const rootReducer = {
  products: productsReducer,
  // ... other reducers
};
```

3. Use in component:
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '@/store/slices/productsSlice';

function MyComponent() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  
  dispatch(setProducts(data));
}
```

---

### ✅ Protect a Route

#### Option 1: Using Guard Component
```javascript
import AuthGuard from '@/guards/AuthGuard';

<Route path="/dashboard" element={
  <AuthGuard>
    <Dashboard />
  </AuthGuard>
} />
```

#### Option 2: Using HOC
```javascript
import { withAuth } from '@/hoc';

const Dashboard = () => <div>Dashboard</div>;
export default withAuth(Dashboard);
```

#### Option 3: Role-Based Protection
```javascript
import { withAuth, withRole } from '@/hoc';

const AdminPanel = () => <div>Admin</div>;
export default withAuth(withRole(['admin'])(AdminPanel));
```

---

### ✅ Add Form Validation

1. Create schema in `src/schemas/`:
```javascript
// src/schemas/product.schema.js
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  price: Yup.number()
    .min(0, 'Price must be positive')
    .required('Price is required'),
});
```

2. Use in form:
```javascript
import { productSchema } from '@/schemas/product.schema';

const handleSubmit = async (data) => {
  try {
    await productSchema.validate(data);
    // Submit form
  } catch (error) {
    toast.error(error.message);
  }
};
```

---

### ✅ Add Translation

1. Add to locales:
```json
// src/i18n/locales/en.json
{
  "products": {
    "title": "Products",
    "addNew": "Add New Product"
  }
}
```

2. Use in component:
```javascript
import { useTranslation } from 'react-i18next';

function ProductsPage() {
  const { t } = useTranslation();
  return <h1>{t('products.title')}</h1>;
}
```

---

### ✅ Create Custom Hook

1. Create in `src/hooks/`:
```javascript
// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { productsApi } from '@/api/endpoints/products.api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading };
}
```

2. Use in component:
```javascript
import { useProducts } from '@/hooks/useProducts';

function ProductList() {
  const { products, loading } = useProducts();
  
  if (loading) return <div>Loading...</div>;
  return <div>{products.map(p => <div key={p.id}>{p.name}</div>)}</div>;
}
```

---

### ✅ Add Data Transformer

1. Create in `src/transformers/`:
```javascript
// src/transformers/product.transformer.js
export const productTransformer = {
  fromApi(apiProduct) {
    return {
      id: apiProduct._id,
      name: apiProduct.name,
      price: apiProduct.price,
      createdAt: new Date(apiProduct.createdAt),
    };
  },

  toApi(product) {
    return {
      name: product.name,
      price: product.price,
    };
  },
};
```

2. Use in API calls:
```javascript
import { productTransformer } from '@/transformers/product.transformer';

const response = await productsApi.getAll();
const products = response.data.map(productTransformer.fromApi);
```

---

### ✅ Track Events

```javascript
import { analytics, errorTracking } from '@/monitoring';

// Track event
analytics.trackEvent('product_viewed', { productId: 123 });

// Track error
try {
  // code
} catch (error) {
  errorTracking.captureError(error, { context: 'product-page' });
}
```

---

### ✅ Add Reusable Component

1. Create in `src/components/common/`:
```javascript
// src/components/common/Badge/Badge.jsx
export default function Badge({ children, variant = 'primary' }) {
  const colors = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  return (
    <span className={`px-2 py-1 rounded ${colors[variant]}`}>
      {children}
    </span>
  );
}
```

2. Use anywhere:
```javascript
import Badge from '@/components/common/Badge/Badge';
<Badge variant="success">Active</Badge>
```

---

### ✅ Create Service Layer

1. Create in `src/services/`:
```javascript
// src/services/product.service.js
import { productsApi } from '@/api/endpoints/products.api';
import { productTransformer } from '@/transformers/product.transformer';

export const productService = {
  async getAll() {
    const response = await productsApi.getAll();
    return response.data.map(productTransformer.fromApi);
  },

  async create(productData) {
    const payload = productTransformer.toApi(productData);
    const response = await productsApi.create(payload);
    return productTransformer.fromApi(response.data);
  },
};
```

2. Use in components:
```javascript
import { productService } from '@/services/product.service';
const products = await productService.getAll();
```

---

### ✅ Add Domain Logic

1. Create in `src/domain/`:
```javascript
// src/domain/product/index.js
export class ProductDomain {
  validatePrice(price) {
    return price > 0 && price < 1000000;
  }

  calculateDiscount(price, discountPercent) {
    return price - (price * discountPercent / 100);
  }

  isInStock(quantity) {
    return quantity > 0;
  }
}
```

2. Use in services:
```javascript
import { ProductDomain } from '@/domain/product';
const productDomain = new ProductDomain();

if (!productDomain.validatePrice(price)) {
  throw new Error('Invalid price');
}
```

---

## 🎯 Folder Decision Tree

**"Where should I put this file?"**

```
Is it a UI component?
├── Reusable across app? → components/common/
├── Layout component? → layouts/
└── Feature-specific? → features/{feature}/components/

Is it a page?
└── pages/{PageName}/

Is it business logic?
├── Domain rules? → domain/{domain}/
├── Service layer? → services/
└── Framework-independent? → core/

Is it data-related?
├── API call? → api/endpoints/
├── Data transformation? → transformers/
└── Model? → shared/models/

Is it state management?
├── Redux? → store/slices/
└── Context? → context/

Is it validation?
└── schemas/

Is it a utility?
├── React hook? → hooks/
└── Helper function? → utils/

Is it routing/protection?
├── Route definition? → routes/
└── Protection logic? → guards/ or hoc/

Is it configuration?
├── App config? → config/
├── Constants? → constants/
└── Enums? → enums/

Is it external dependency?
└── adapters/

Is it monitoring?
└── monitoring/
```

---

## 🚨 Common Mistakes to Avoid

❌ **Don't**: Import directly from external libraries in domain/core
✅ **Do**: Use adapters

❌ **Don't**: Put business logic in components
✅ **Do**: Use services or domain layer

❌ **Don't**: Hardcode strings
✅ **Do**: Use constants or i18n

❌ **Don't**: Repeat validation logic
✅ **Do**: Use schemas

❌ **Don't**: Mix API response format with UI
✅ **Do**: Use transformers

---

## 📚 Cheat Sheet

### Import Aliases:
```javascript
import Component from '@/components/common/Component';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/user.service';
import { UserRole } from '@/enums';
```

### File Naming:
- Components: `PascalCase.jsx` (e.g., `ProductCard.jsx`)
- Hooks: `camelCase.js` starting with `use` (e.g., `useProducts.js`)
- Services: `camelCase.service.js` (e.g., `product.service.js`)
- Schemas: `camelCase.schema.js` (e.g., `product.schema.js`)
- Utils: `camelCase.js` (e.g., `formatDate.js`)

---

## 🎉 You're Ready!

Follow this guide for common tasks. For deeper understanding, check:

📖 [README.md](./README.md) - Complete overview  
📖 [ENTERPRISE_STRUCTURE.md](./ENTERPRISE_STRUCTURE.md) - Folder structure  
📖 [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) - Architecture  
📖 [UPGRADE_SUMMARY.md](./UPGRADE_SUMMARY.md) - What's new  

**Happy coding! 🚀**
