import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Books from './pages/Books';
import Perso from './pages/Perso';
import Houses from './pages/Houses';
import Spells from './pages/Spells';

function App() {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="text" >Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Books />
      <Perso />
      <Houses />
      <Spells />
    </>
  )
}

export default App
