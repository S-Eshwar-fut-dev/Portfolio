'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div className="flex h-[50vh] w-full items-center justify-center rounded-lg border border-red-500/20 bg-red-900/10 p-8 text-center backdrop-blur-md">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
                        <p className="text-sm text-red-300/80">
                            The 3D scene encountered an error. Refreshing might fix this.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
