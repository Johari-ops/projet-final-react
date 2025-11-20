import useFetchSpells from '../hooks/useFetchSpell';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Spells = () => {
  const { spells, loading, error } = useFetchSpells();
  const [selectedCard, setSelectedCard] = useState(0);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* {spells.map((spell) => (
        <div key={spell.index}>
          <h3>{spell.spell}</h3>
          <p>Utilisation : {spell.use}</p>
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
        {spells.map((spell, index) => (
          <Card key={spell.index}>
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
                  {spell.spell}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {spell.use}
                  <br />
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

export default Spells;
