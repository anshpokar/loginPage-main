import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <img
                    src="/404error.png"
                    alt="404 Error - Page Not Found"
                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
                    <p className="text-gray-600">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                    <div className="pt-4">
                        <Link
                            to="/signin"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary hover:bg-primary/80 text-white font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-200"
                        >
                            Back to SignIn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
