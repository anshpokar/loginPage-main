import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { SignUpForm } from '../components/SignUpForm';
import { ROUTES } from '@/shared/constants/routes';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to dashboard or home after successful sign up
    navigate(ROUTES.HOME);
  };

  return (
    <AuthLayout
      title="Start your property journey"
      subtitle="Join HOUZZA today and gain access to exclusive listings, expert valuation, and a seamless buying experience."
      imageAlt="Modern house exterior with glass walls"
    >
      <SignUpForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
}
