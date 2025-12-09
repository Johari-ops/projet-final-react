import Spells from '../components/List/Spells'
import Books from '../components/List/Books'
import Perso from '../components/List/Perso'
import Houses from '../components/List/Houses'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const [nom] = useLocalStorage<string>("nom", "");
  const [prenom] = useLocalStorage<string>("prenom", "");
  const [email] = useLocalStorage<string>("email", "");

  
  return (
    <>
    <Stack spacing={2} direction="row" >
            <Button variant="text" >{nom}</Button>
            <Button variant="contained">{prenom}</Button>
            <Button variant="outlined">{email}</Button>
          </Stack>
          <Books />
          <Perso />
          <Houses />
          <Spells />
    </>
  )
}

export default Home