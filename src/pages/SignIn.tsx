import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignInForm } from '@/components/auth/SignInForm';

export default function SignIn() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to dashboard or home after successful sign in
    navigate('/');
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
