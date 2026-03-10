import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '@/pages/Error'
import { MainPage } from '@/pages/main'
import { NotFoundPage } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
