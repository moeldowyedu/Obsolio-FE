import toast, { Toaster as HotToaster } from 'react-hot-toast';

// Custom Configuration
const toastConfig = {
    duration: 4000,
    position: 'top-right',
    style: {
        maxWidth: '500px',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
    },
};

const notify = {
    success: (message) => {
        toast.success(message, { ...toastConfig, className: 'toast-success' });
    },

    error: (message) => {
        toast.error(message, { ...toastConfig, className: 'toast-error' });
    },

    info: (message) => {
        toast(message, { ...toastConfig, icon: 'ℹ️', className: 'toast-info' });
    },

    loading: (message) => {
        return toast.loading(message, { ...toastConfig, className: 'toast-loading' });
    },

    dismiss: (toastId) => {
        toast.dismiss(toastId);
    },

    promise: (promise, messages) => {
        return toast.promise(promise, {
            loading: messages.loading || 'Loading...',
            success: messages.success || 'Success!',
            error: messages.error || 'Error',
        }, toastConfig);
    }
};

// Re-export Toaster component from react-hot-toast
export { Toaster } from 'react-hot-toast';

export default notify;
