import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SignInPage, SignUpPage } from '@/features/auth'
import { NotFoundPage } from '@/features/auth/pages/NotFoundPage'
import { ROUTES } from '@/shared/constants/routes'

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.SIGN_IN} replace />,
    },
    {
        path: ROUTES.SIGN_IN,
        element: <SignInPage />,
    },
    {
        path: ROUTES.SIGN_UP,
        element: <SignUpPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])
