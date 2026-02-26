import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to dashboard or home after successful sign up
    navigate('/');
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
