import { Minus, Square, X, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

export const DesktopControls = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const isElectron = window.navigator.userAgent.indexOf('Electron') !== -1;

    if (!isElectron) return null;

    const handleMinimize = () => (window as any).api?.minimize();
    const handleMaximize = () => {
        (window as any).api?.maximize();
        setIsMaximized(!isMaximized);
    };
    const handleClose = () => (window as any).api?.close();

    return (
        <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between z-[9999] drag-region bg-background/50 backdrop-blur-sm border-b border-border/10">
            <div className="flex items-center px-4 gap-2 no-drag">
                <img src="/logo.jpg" alt="Logo" className="w-4 h-4 rounded-sm" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">UNI AI</span>
            </div>

            <div className="flex items-center h-full no-drag">
                <button
                    onClick={handleMinimize}
                    className="h-full px-4 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                    <Minus className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                    onClick={handleMaximize}
                    className="h-full px-4 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                    {isMaximized ? (
                        <Copy className="w-3 h-3 text-muted-foreground" />
                    ) : (
                        <Square className="w-3 h-3 text-muted-foreground" />
                    )}
                </button>
                <button
                    onClick={handleClose}
                    className="h-full px-4 hover:bg-red-500/80 hover:text-white transition-colors flex items-center justify-center group"
                >
                    <X className="w-3 h-3 text-muted-foreground group-hover:text-white" />
                </button>
            </div>
        </div>
    );
};
