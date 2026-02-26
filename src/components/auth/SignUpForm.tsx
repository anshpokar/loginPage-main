import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const signUpSchema = z.object({
    name: z
        .string()
        .min(1, 'Full name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),
    terms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
    onSuccess?: () => void;
    isModal?: boolean;
}

export const SignUpForm = ({ onSuccess, isModal = false }: SignUpFormProps) => {
    const { signUp } = useAuth();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const onSubmit = (data: SignUpFormData) => {
        // API expects confirmPassword and termsAccepted
        const apiData = {
            ...data,
            termsAccepted: data.terms,
        };
        signUp.mutate(apiData, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (error: Error) => {
                form.setError('root', { message: error.message });
            },
        });
    };

    return (
        <div className="w-full">
            {!isModal && (
                <div className="mb-8 space-y-2 text-center lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Create account</h2>
                    <p className="text-zinc-500">Join thousands of users around the world</p>
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {form.formState.errors.root && (
                    <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive border border-destructive/20 transition-all">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-zinc-700">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        disabled={signUp.isPending}
                        className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                        {...form.register('name')}
                    />
                    {form.formState.errors.name && (
                        <p className="text-xs font-medium text-destructive">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-zinc-700">Email Address</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        disabled={signUp.isPending}
                        className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                        {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs font-medium text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-semibold text-zinc-700">Password</Label>
                        <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            disabled={signUp.isPending}
                            className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                            {...form.register('password')}
                        />
                        {form.formState.errors.password && (
                            <p className="text-xs font-medium text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-zinc-700">Confirm</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            disabled={signUp.isPending}
                            className="h-11 border-zinc-200 bg-zinc-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-purple-500/20"
                            {...form.register('confirmPassword')}
                        />
                        {form.formState.errors.confirmPassword && (
                            <p className="text-xs font-medium text-destructive">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                        id="terms"
                        className="mt-1 border-zinc-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        onCheckedChange={(checked) => form.setValue('terms', checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms"
                            className="text-xs font-medium text-zinc-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the{' '}
                            <Link to="/terms" className="text-purple-600 hover:text-purple-700 font-semibold underline-offset-4 hover:underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold underline-offset-4 hover:underline">
                                Privacy Policy
                            </Link>
                        </label>
                        {form.formState.errors.terms && (
                            <p className="text-xs font-medium text-destructive">
                                {form.formState.errors.terms.message}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={signUp.isPending}
                    className="h-11 w-full bg-purple-600 font-semibold text-white shadow-lg shadow-purple-200 hover:bg-purple-700 hover:shadow-purple-300 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                    {signUp.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        'Sign Up'
                    )}
                </Button>
            </form>

            {!isModal && (
                <div className="mt-8 text-center text-sm">
                    <p className="text-zinc-500 font-medium">
                        Already have an account?{' '}
                        <Link
                            to="/signin"
                            className="font-bold text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};
