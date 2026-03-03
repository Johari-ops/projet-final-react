import axios from 'axios';
import type { Book } from '../models/Books';
import type { Perso } from '../models/Perso';
import type { House } from '../models/House';
import type { Spell } from '../models/Spells';

const apiUrl = import.meta.env.VITE_API_URL;

async function getBooks(): Promise<Book[]> {
  try {
    const response = await axios.get<Book[]>(`${apiUrl}books`);
    return response.data;
  } catch (error) {
    console.error('Erreur dans getBooks:', error);
    throw error;
  }
}

async function getPerso(): Promise<Perso[]> {
  try {
    const response = await axios.get<Perso[]>(`${apiUrl}characters`);
    return response.data;
  } catch (error) {
    console.error('Erreur dans getPerso:', error);
    throw error;
  }
}

async function getHouses(): Promise<House[]> {
  try {
    const response = await axios.get<House[]>(`${apiUrl}houses`);
    return response.data;
  } catch (error) {
    console.error('Erreur dans getPerso:', error);
    throw error;
  }
}

async function getSpells(): Promise<Spell[]> {
  try {
    const response = await axios.get<Spell[]>(`${apiUrl}spells`);
    return response.data;
  } catch (error) {
    console.error('Erreur dans getSpells:', error);
    throw error;
  }
}
export { getBooks, getPerso, getHouses, getSpells };
