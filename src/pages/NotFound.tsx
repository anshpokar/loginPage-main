import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-5xl font-bold text-primary">404</span>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                        Page Not Found
                    </CardTitle>
                    <CardDescription className="text-base text-slate-500">
                        Oops! The page you are looking for doesn't exist or has been moved to a new address.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pb-8 text-center">
                    <div className="h-px bg-slate-200 w-full my-2" />
                    <p className="text-sm text-slate-400">
                        Try navigating back to a known URL or contact support if you believe this is an error.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
