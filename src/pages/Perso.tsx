import useFetchPerso from '../hooks/useFetchPerso';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const Perso = () => {
  const { personnages, loading, error } = useFetchPerso();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* {personnages.map((perso) => (
        <div key={perso.index}>
          <h3>{perso.fullName}</h3>
          <img src={perso.image} alt={`Image de ${perso.fullName}`} width={100} />
          <p>Alias : {perso.nickname}</p>
          <p>Interprété par : {perso.interpretedBy}</p>
          <p>Date de naissance : {perso.birthdate}</p>
          <p>Enfants : {perso.children.join(', ') || 'Aucun'}</p>
          <p><small>Maison : {perso.hogwartsHouse} - Anniversaire : {perso.birthdate}</small></p>
        </div>
      ))} */}
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          marginTop: 2,
          gridTemplateColumns: 'repeat(3, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {personnages.map((perso) => (
          <Card key={perso.index}>
              <CardMedia
                component="img"
                height="140"
                image={perso.image}
                alt={`Image de ${perso.fullName}`}
              />
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  {perso.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Alias : {perso.nickname}
                  <br />
                  Interprété par : {perso.interpretedBy}
                  <br />
                  Maison : {perso.hogwartsHouse}
                  <br />
                  Anniversaire : {perso.birthdate}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small">Voir plus</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Perso;
