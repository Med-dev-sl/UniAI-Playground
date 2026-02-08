import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const AppDownloadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const downloaded = localStorage.getItem("appDownloaded");
    if (downloaded === "true") {
      setHasDownloaded(true);
    } else {
      // Show modal immediately on first visit
      setIsOpen(true);
    }
  }, []);

  // Show modal every 10 seconds if not dismissed
  useEffect(() => {
    if (hasDownloaded) return;

    const interval = setInterval(() => {
      setIsOpen(true);
    }, 100000); // 10 seconds

    return () => clearInterval(interval);
  }, [hasDownloaded]);

  const handleDownload = () => {
    // Mark as downloaded in localStorage
    localStorage.setItem("appDownloaded", "true");
    setHasDownloaded(true);
    setIsOpen(false);

    // Download APK file
    window.open("/app3905731_2953.apk", "_blank");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-sm mx-auto p-0 border-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 pt-6 pb-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white text-center">
            Get the UniAI App
          </h2>
          <p className="text-blue-100 text-sm text-center mt-1">
            Available for Android
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-medium">
                    Learn anytime, anywhere
                  </p>
                  <p className="text-gray-400 text-xs">
                    Access courses on the go
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-medium">
                    Faster loading
                  </p>
                  <p className="text-gray-400 text-xs">
                    Optimized mobile experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-medium">
                    Push notifications
                  </p>
                  <p className="text-gray-400 text-xs">
                    Get updates on new content
                  </p>
                </div>
              </div>
            </div>

            {/* Coming soon info */}
            <div className="mt-6 p-3 bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-lg">
              <p className="text-amber-200 text-xs font-medium">
                💡 iOS coming soon!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download for Android
          </button>

          <button
            onClick={handleClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDownloadModal;
