import useFetchHouses from '../hooks/useFetchHouses';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Houses = () => {
  const { houses, loading, error } = useFetchHouses();
  const [selectedCard, setSelectedCard] = useState(0);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* {houses.map((house) => (
        <div key={house.index}>
          <h3>{house.house}</h3>
          <p>Fondateur : {house.founder}</p>
          <p>Animal : {house.animal}</p>
          <p>Couleurs : {house.colors.join(', ')}</p>
          <p><small>Emoji : {house.emoji}</small></p>
        </div>
      ))} */}

      <Box
        sx={{
          width: '100%',
          display: 'grid',
          marginTop: 2,
          gridTemplateColumns: 'repeat(2, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {houses.map((house, index) => (
          <Card key={house.index}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? '' : undefined}
              sx={{
                height: '100%',
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  {house.house}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {house.founder}
                  <br />
                  {house.animal}
                  <br />
                  {house.colors.join(', ')}
                  <br />
                </Typography>
                <Typography variant="h4" component="div">
                  {house.emoji}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">Voir plus</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Houses;
         