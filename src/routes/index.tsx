import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SignInPage, SignUpPage } from '@/features/auth'
import { NotFoundPage } from '@/features/auth/pages/NotFoundPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/signin" replace />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
    {
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])
