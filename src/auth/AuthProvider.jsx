import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoginNow } from '../redux/slice/loginSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await fetch('https://django-nikhil-api.vercel.app/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access); // Update access token
            dispatch(isLoginNow(true)); // login done
            return data.access;
        } catch (error) {
            console.error('Token refresh failed', error);
            dispatch(isLoginNow(false)); // login failed
            // Handle redirect to login or error state
        }
    };

    const checkAndRefreshToken = async () => {
        const token = localStorage.getItem('token');
        // Optionally check token expiration logic here
        if (!token) {
            await refreshToken();
        }
    };

    useEffect(() => {
        checkAndRefreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
