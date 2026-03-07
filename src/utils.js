import { toast } from 'react-toastify';

export function handleError(message) {
    toast.error(`Sorry Sarver Error !\n${message}`,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function handleSuccess(message) {
    toast.success(`Yahooooo !!!\n${message}`,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const ApiUrl = process.env.baseURL;