import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { SignInForm } from '../components/SignInForm';
import { ROUTES } from '@/shared/constants/routes';

export const SignInPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to dashboard or home after successful sign in
    navigate(ROUTES.HOME);
  };

  return (
    <AuthLayout
      title="Find your dream home"
      subtitle="Discover, buy, and sell properties with ease. HOUZZA makes real estate simple, secure, and stress-free."
      imageAlt="Modern luxury house at sunset"
    >
      <SignInForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
}
