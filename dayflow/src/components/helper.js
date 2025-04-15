import { useState, useEffect } from 'react';

export function useInspirationQuote() {
    const [quote, setQuote] = useState({ quote: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchQuote() {
            try {
                setLoading(true);
                setError(null);
                console.log("Calling backend for quote");
                const response = await fetch('/api/inspiration', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    return { quote: "Error fetching quote", author: "" };
                }
                const data = await response.json();
                console.log(data);
                setQuote(data);
            } catch (err) {
                console.log("Error fetching quote", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchQuote();
    }, []);

    return { quote, loading, error };
}

// helper.js
export function useVerifyAuth(username) {
    const [authState, setAuthState] = useState({
        isLoading: true,
        isAuthenticated: false,
    });

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch('/api/auth/user', {
                    credentials: 'include', // 👈 Send cookies
                });
                setAuthState({
                    isLoading: false,
                    isAuthenticated: response.ok, // True if status is 200-299
                });
            } catch (error) {
                setAuthState({ isLoading: false, isAuthenticated: false });
            }
        };
        verifyAuth();
    }, [username]);

    return authState;
}
