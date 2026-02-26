import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, type SignInData, type SignUpData, type AuthResponse } from '@/services/api';

// Custom hook for authentication using TanStack Query
export const useAuth = () => {
  // Sign In mutation
  const signInMutation = useMutation<AuthResponse, Error, SignInData>({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log('Sign In Success - Response Object:', data);
      // store token => local storage
      localStorage.setItem('token', data.token);
      alert(`Welcome back, ${data.user.name}! Sign in successful.`);
    },
    onError: (error) => {
      console.error('Sign In Error:', error);
    },
  });

  // Sign Up mutation
  const signUpMutation = useMutation<AuthResponse, Error, SignUpData>({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log('Sign Up Success - Response Object:', data);
      // localstorage
      localStorage.setItem('token', data.token);
      alert(`Welcome, ${data.user.name}! Your account has been created successfully.`);
    },
    onError: (error) => {
      console.error('Sign Up Error:', error);
    },
  });

  return {
    signIn: signInMutation,
    signUp: signUpMutation,
  };
};
