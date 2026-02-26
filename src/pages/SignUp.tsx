import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

// emailregex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password regex - at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^])[A-Za-z\d@$!%*?&_#^]{8,}$/;

// Zod-schema for the validation
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(emailRegex, 'Please enter a valid email address (e.g., user@example.com)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(
        passwordRegex,
        'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&_#^)'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.boolean().refine((val: boolean) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { signUp } = useAuth();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSignUpSubmit = (data: SignUpFormData) => {
    console.log('Sign Up Form Data Object:', data);
    signUp.mutate(data, {
      onError: (error: Error) => {
        signUpForm.setError('root', { message: error.message });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Sign up for a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
            {signUpForm.formState.errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                {signUpForm.formState.errors.root.message}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...signUpForm.register('name')}
              />
              {signUpForm.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...signUpForm.register('email')}
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...signUpForm.register('password')}
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&_#^).
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...signUpForm.register('confirmPassword')}
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            
            {/* Terms and Conditions Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={signUpForm.watch('termsAccepted')}
                  onCheckedChange={(checked: boolean | 'indeterminate') => {
                    signUpForm.setValue('termsAccepted', checked as boolean, {
                      shouldValidate: true,
                    });
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our{' '}
                    <a href="#" className="text-primary underline hover:text-primary/80">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary underline hover:text-primary/80">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              {signUpForm.formState.errors.termsAccepted && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.termsAccepted.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={signUp.isPending}
            >
              {signUp.isPending ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/signin" className="text-primary underline hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
