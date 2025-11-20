import { useState, useEffect } from 'react';
import { getPerso } from '../services/apiServices';
import type { Perso } from '../models/Perso';

const useFetchPerso = () => {
  const [personnages, setPersonnages] = useState<Perso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerso();
        setPersonnages(data);
      } catch (err) {
        setError('Erreur lors du chargement des personnages: ' + String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { personnages, loading, error };
};

export default useFetchPerso;
