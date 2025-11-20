import { useState, useEffect } from 'react';
import { getSpells } from '../services/apiServices';
import type { Spell } from '../models/Spells';

const useFetchSpells = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpells();
        setSpells(data);
      } catch (err) {
        setError('Erreur lors du chargement des sorts: ' + String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { spells, loading, error };
};

export default useFetchSpells;
