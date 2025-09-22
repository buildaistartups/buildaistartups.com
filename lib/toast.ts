'use client';

import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Simple wrapper for toast notifications
export function showToast(message: string, type: ToastType = 'info', options?: ToastOptions) {
  const commonOptions = {
    description: options?.description,
    action: options?.action,
  };

  switch (type) {
    case 'success':
      toast.success(message, commonOptions);
      break;
    case 'error':
      toast.error(message, commonOptions);
      break;
    case 'warning':
      toast.warning(message, commonOptions);
      break;
    case 'info':
    default:
      toast(message, commonOptions);
      break;
  }
}

// Hook for use in components
export function useToast() {
  return {
    showToast,
    toast: {
      success: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
      error: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
      warning: (message: string, options?: ToastOptions) => showToast(message, 'warning', options),
      info: (message: string, options?: ToastOptions) => showToast(message, 'info', options),
    }
  };
}
