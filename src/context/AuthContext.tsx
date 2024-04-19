import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';
import { User } from "@/types"; // Убедитесь, что путь к типам правильный

type AuthContextType = {
    userData?: User | null;
    setUserData: (user: User | null) => void; // Обновите тип аргумента для setUser
    token: string | null;
    setToken: (token: string | null) => void;
    isTokenExpired: (token: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{children: ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null); // Уточнение типа для user и начальное значение null
    const isTokenExpired = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const tokenExpirationTime = payload.exp * 1000;
            const currentTime = new Date().getTime();
            return tokenExpirationTime < currentTime;
        } catch (error) {
            console.error('Ошибка при проверке срока действия токена:', error);
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ token, userData, setUserData, setToken, isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};