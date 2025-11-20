import { useState, useEffect } from 'react';
import { getHouses } from '../services/apiServices';
import type { House } from '../models/House';

const useFetchPerso = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHouses();
        setHouses(data);
      } catch (err) {
        setError('Erreur lors du chargement des maisons: ' + String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { houses, loading, error };
};

export default useFetchPerso;
