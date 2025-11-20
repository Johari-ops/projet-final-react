import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getPlants } from './services/apiServices';

function App() {

  console.log(getPlants());
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="text" >Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  )
}

export default App
