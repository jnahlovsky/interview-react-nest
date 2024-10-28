import { useState, useEffect } from 'react';

import generateInputData from './helpers/generate_input_data';

/**
 * This function takes data generated by `generateInputData` and sends it to the backend for processing.
 * Then, it outputs the processed results together with a loading indicator.
 * isLoading must be true the whole time until the data is returned from the backend.
 *
 * @returns {{ neighborhoods: Neighborhood[], isLoading: boolean }}
 */
function useData() {
    const inputData = generateInputData();
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // SUGGESTION: use client/service instead
                const response = await fetch('http://localhost:3001', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matrix: inputData }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNeighborhoods(data);
                setIsLoading(false);
            } catch (error) {
                // SUGGESTION: use logger/notification service instead
                // eslint-disable-next-line no-console
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();

        return () => {
            setNeighborhoods([]);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { neighborhoods, isLoading };
}

export default useData;
