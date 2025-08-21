import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

interface DialogProps {
    title: React.ReactNode;
    content: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
    confirmText?: string;
    cancelText?: string;
    isOpen: boolean;
    destructive?: boolean;
    additionalMessage?: { message: string, isSuccess: boolean }
}

export function Dialog({
    title,
    content,
    onConfirm,
    onClose,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isOpen,
    destructive = false,
    additionalMessage
}: DialogProps) {
    // Close on ESC key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const dialog = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            aria-modal="true"
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-content"
        >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 outline-none" tabIndex={-1}>
                <h2 id="dialog-title" className="text-xl font-bold mb-4 text-gray-800">
                    {title}
                </h2>
                <div id="dialog-content" className="mb-6 text-sm text-gray-600">
                    {content}
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-red-600 text-white hover:bg-white hover:text-red-600 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        disabled={additionalMessage?.isSuccess || true}
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-md border border-gray-300 bg-green-600 text-white hover:text-green-600 hover:bg-white transition ${destructive
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-primary hover:bg-primary/90"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
                {additionalMessage &&
                    <>
                        <hr className="mb-4" />
                        <p className={`mt-4 ${additionalMessage.isSuccess ? "text-green-600" : "text-red-600"}`}>{additionalMessage.message}</p>
                    </>
                }

            </div>
        </div>
    );

    // Optionally render to portal for layout safety
    return typeof window !== "undefined"
        ? ReactDOM.createPortal(dialog, document.body)
        : dialog;
}
