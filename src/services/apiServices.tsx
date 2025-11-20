import axios from 'axios';



async function getPlants(){
  try {
    const response = await axios.get('https://potterapi-fedeperin.vercel.app/fr/books');
    return response.data;
  } catch (error) {
    console.error('Erreur dans getPlants:', error);
    throw error;
  }
}

export { getPlants };