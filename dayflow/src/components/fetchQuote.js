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
