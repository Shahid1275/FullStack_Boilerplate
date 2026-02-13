import { lazy } from 'react'

export const Dashboard = lazy(() => import('../pages/Dashboard'))
export const Users = lazy(() => import('../pages/Users'))
export const Products = lazy(() => import('../pages/Products'))
export const Orders = lazy(() => import('../pages/Orders'))
export const Analytics = lazy(() => import('../pages/Analytics'))
export const Settings = lazy(() => import('../pages/Settings'))

export default { Dashboard, Users, Products, Orders, Analytics, Settings }
