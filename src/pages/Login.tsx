import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from '../hooks/useLocalStorage';

const userFormSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email("L'email doit être valide"),
});

type UserFormData = z.infer<typeof userFormSchema>;

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [storedNom, setStoredNom] = useLocalStorage<string>('nom', '');
  const [storedPrenom, setStoredPrenom] = useLocalStorage<string>('prenom', '');
  const [storedEmail, setStoredEmail] = useLocalStorage<string>('email', '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nom: storedNom,
      prenom: storedPrenom,
      email: storedEmail,
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log('SUBMIT', data);
    setStoredNom(data.nom);
    setStoredPrenom(data.prenom);
    setStoredEmail(data.email);

    // Attend que le localStorage soit mis à jour
    setTimeout(() => {
      console.log('Nom stocké:', localStorage.getItem('nom'));
      console.log('Prenom stocké:', localStorage.getItem('prenom'));
      console.log('Email stocké:', localStorage.getItem('email'));
      onLogin();
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 300,
          margin: 'auto',
          mt: 5,
        }}
      >
        <TextField
          label="Nom"
          variant="outlined"
          {...register('nom')}
          error={!!errors.nom}
          helperText={errors.nom?.message}
        />
        <TextField
          label="Prénom"
          variant="outlined"
          {...register('prenom')}
          error={!!errors.prenom}
          helperText={errors.prenom?.message}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button variant="contained" type="submit">
          Confirmer
        </Button>
      </Box>
    </form>
  );
};

export default Login;
