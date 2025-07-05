import { createBrowserRouter } from 'react-router-dom';
import ScannerPage from '../pages/ScannerPage';
import KanbanPage from '../pages/KanbanPage';
import MainLayout from '../layouts/MainLayout';
import AnalyticsPage from '../pages/AnalyticsPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute ';
import NotFound from './../pages/NotFound';
import EditCategoryPage from '../pages/EditCategoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:<ScannerPage />,
      },
      {
        path: '/kanban',
        element: <ProtectedRoute><KanbanPage /></ProtectedRoute>,
      },
      {
        path: "/edit-categories",
        element:<ProtectedRoute><EditCategoryPage/></ProtectedRoute>,
      },
      {
        path: "/analytics",
        element:<ProtectedRoute><AnalyticsPage /></ProtectedRoute>,
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
