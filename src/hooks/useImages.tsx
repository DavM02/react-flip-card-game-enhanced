import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { PairNumber } from '../types/types';

interface Image  {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
    resized_url: string;  
};

interface UseImagesReturn {
    images: (Image)[] | undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
};

export const useImages = (numberOfCells: number, pairNumber: PairNumber): UseImagesReturn => {
    
    const totalPairs = Math.floor(numberOfCells / pairNumber);

    const {
        data,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery<Image[], Error>({
        queryKey: [`images-${numberOfCells}-${pairNumber}`],
        queryFn: async () => {

            const randomStart = Math.floor(Math.random() * 20)
 
            const res = await fetch(`https://picsum.photos/v2/list?page=${randomStart}&limit=${totalPairs}`);
            if (!res.ok) throw new Error('failed to fetch images');
            const raw = await res.json();
            return raw.map((img: Image) => ({
                ...img,
                resized_url: `https://picsum.photos/id/${img.id}/300/300`, 
            }));
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const images = useMemo(() => {
     
        if (!data) return;

        const repeated = data.flatMap((img) => Array(pairNumber).fill(img));

        while (repeated.length < numberOfCells) {
            repeated.push({}); 
        }

        for (let i = repeated.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [repeated[i], repeated[j]] = [repeated[j], repeated[i]];
        }

        return repeated;
    }, [data, numberOfCells, pairNumber]);

    return {
        images,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
