import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
    onSuccess?: () => void;
    isModal?: boolean;
}

export const SignInForm = ({ onSuccess, isModal = false }: SignInFormProps) => {
    const { signIn } = useAuth();

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: SignInFormData) => {
        signIn.mutate(data, {
            onSuccess: () => {
                toast.success('Successfully signed in!');
                onSuccess?.();
            },
            onError: (error: Error) => {
                toast.error(error.message || 'Login failed. Please try again.');
                form.setError('root', { message: error.message });
            },
        });
    };

    return (
        <div className="w-full">
            {!isModal && (
                <div className="mb-8 space-y-2 text-center lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back</h2>
                    <p className="text-zinc-500">Enter your credentials to access your account</p>
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-zinc-700">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        disabled={signIn.isPending}
                        className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                        {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-semibold text-zinc-700">Password</Label>
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        disabled={signIn.isPending}
                        className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                        {...form.register('password')}
                    />
                    {form.formState.errors.password && (
                        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={signIn.isPending}
                    className="h-11 w-full bg-purple-600 font-semibold text-white shadow-lg shadow-purple-200 hover:bg-purple-700 hover:shadow-purple-300 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                    {signIn.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>

            {!isModal && (
                <div className="mt-8 text-center text-sm">
                    <p className="text-zinc-500 font-medium">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-bold text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline transition-colors"
                        >
                            Create one now
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};
