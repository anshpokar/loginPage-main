import React, { useState, useEffect } from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    imageAlt: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    imageAlt,
}) => {
    const [titleText, setTitleText] = useState('');
    const [showTitleCursor, setShowTitleCursor] = useState(true);
    const [showSubtitle, setShowSubtitle] = useState(false);

    useEffect(() => {
        let titleIndex = 0;
        const typingSpeed = 50; // ms per character

        const typeTitle = setInterval(() => {
            if (titleIndex <= title.length) {
                setTitleText(title.slice(0, titleIndex));
                titleIndex++;
            } else {
                clearInterval(typeTitle);
                setShowTitleCursor(false);
                setShowSubtitle(true);
            }
        }, typingSpeed);

        return () => clearInterval(typeTitle);
    }, [title]);

    const renderAnimatedTitle = () => {
        const isDreamHome = title.includes("dream home");
        const isPropertyJourney = title.includes("property journey");

        if (isDreamHome) {
            const prefix = "Find your ";

            if (titleText.length <= prefix.length) {
                return (
                    <span className={showTitleCursor ? "typing-cursor" : ""}>
                        {titleText}
                    </span>
                );
            } else {
                return (
                    <>
                        Find your <br />
                        <span className={`text-purple-300 ${showTitleCursor ? "typing-cursor" : ""}`}>
                            {titleText.slice(prefix.length)}
                        </span>
                    </>
                );
            }
        }

        if (isPropertyJourney) {
            const prefix = "Start your ";

            if (titleText.length <= prefix.length) {
                return (
                    <span className={showTitleCursor ? "typing-cursor" : ""}>
                        {titleText}
                    </span>
                );
            } else {
                return (
                    <>
                        Start your <br />
                        <span className={`text-purple-300 ${showTitleCursor ? "typing-cursor" : ""}`}>
                            {titleText.slice(prefix.length)}
                        </span>
                    </>
                );
            }
        }

        return <span className={showTitleCursor ? "typing-cursor" : ""}>{titleText}</span>;
    };

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            {/* Left Pane - Brand Side */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-900 p-12 text-white lg:flex">
                {/* Background Overlay with Gradient Fallback */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 brightness-[0.7] saturate-[0.8]"
                    style={{
                        backgroundImage: 'url("/auth-bg.jpg"), linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
                        backgroundBlendMode: 'overlay',
                    }}
                    aria-label={imageAlt}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-purple-900/40 to-black/60" />
                </div>

                {/* Logo & Brand Name */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-2xl overflow-hidden p-1 animate-logo-zoom hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <img src="/app.png" alt="Houzza Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-white uppercase drop-shadow-sm">HOUZZA</span>
                </div>

                {/* Inspirational Text */}
                <div className="relative z-10 space-y-6">
                    <h1 className="text-6xl font-black leading-[1.1] tracking-[-0.05em] text-balance min-h-[1.2em]">
                        {renderAnimatedTitle()}
                    </h1>
                    <p className={`max-w-lg text-xl font-medium text-white/80 leading-relaxed text-pretty min-h-[3em] transition-all duration-1000 transform ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {subtitle}
                    </p>
                </div>

                {/* Footer info */}
                <div className="relative z-10 text-sm text-white/60">
                    © 2026 HOUZZA Inc. All rights reserved.
                </div>
            </div>

            {/* Right Pane - Form Side */}
            <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
};
