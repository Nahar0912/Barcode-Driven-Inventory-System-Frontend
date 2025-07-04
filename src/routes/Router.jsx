import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ScannerPage from '../pages/ScannerPage';
import KanbanPage from '../pages/KanbanPage';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/scanner', element: <ScannerPage /> },
      { path: '/kanban', element: <KanbanPage /> },
    ],
  },
]);

export default router;
