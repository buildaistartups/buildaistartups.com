'use client';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  description?: string;
  duration?: number;
}

// Simple toast implementation without external dependencies
export function showToast(message: string, type: ToastType = 'info', options?: ToastOptions) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 z-50 space-y-2';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  const toastId = `toast-${Date.now()}`;
  toast.id = toastId;
  
  // Set classes based on type
  const baseClasses = 'flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[400px] animate-in slide-in-from-right';
  const typeClasses = {
    success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
  };
  
  toast.className = `${baseClasses} ${typeClasses[type]}`;

  // Set icon based on type
  const icons = {
    success: '<svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
    error: '<svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
    warning: '<svg class="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
    info: '<svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  };

  // Build toast HTML
  let toastHTML = `
    ${icons[type]}
    <div class="flex-1">
      <div class="text-sm font-medium">${message}</div>
      ${options?.description ? `<div class="text-xs opacity-90 mt-1">${options.description}</div>` : ''}
    </div>
    <button onclick="document.getElementById('${toastId}').remove()" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  toast.innerHTML = toastHTML;
  container.appendChild(toast);

  // Auto remove after duration (default 5 seconds)
  const duration = options?.duration || 5000;
  setTimeout(() => {
    const element = document.getElementById(toastId);
    if (element) {
      element.remove();
    }
    // Clean up container if empty
    if (container && container.children.length === 0) {
      container.remove();
    }
  }, duration);
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
