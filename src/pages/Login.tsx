import { TextField } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [nom, setNom] = useLocalStorage<string>("nom", "");
  const [prenom, setPrenom] = useLocalStorage<string>("prenom", "");
  const [email, setEmail] = useLocalStorage<string>("email", "");

  // Gère la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, margin: "auto", mt: 5 }}
    >
      <TextField
        label="Nom"
        variant="outlined"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <TextField
        label="Prénom"
        variant="outlined"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        Confirmer
      </Button>
    </Box>
  )
}

export default Login