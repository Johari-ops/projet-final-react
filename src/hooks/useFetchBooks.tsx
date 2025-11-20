import { useState, useEffect } from 'react';
import { getBooks } from '../services/apiServices';
import type { Book } from '../models/Books';

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError('Erreur lors du chargement des livres: ' + String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { books, loading, error };
};

export default useFetchBooks;
