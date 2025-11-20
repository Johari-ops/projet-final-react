import useFetchBooks from '../hooks/useFetchBooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Books = () => {
  const { books, loading, error } = useFetchBooks();

  const [selectedCard, setSelectedCard] = useState(0);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      {/* {books.map((book) => (
        <div key={book.number}>
          <h3>{book.title}</h3>
          <img src={book.cover} alt={`Couverture de ${book.title}`} width={100} />
          <p>{book.description}</p>
          <p><small>Pages : {book.pages} - Publié : {book.releaseDate}</small></p>
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
        {books.map((book, index) => (
          <Card key={book.number}>
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
              <CardMedia
                component="img"
                height="140"
                image={book.cover}
                alt={`Couverture de ${book.title}`}
              />
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description.length > 50
                    ? book.description.slice(0, 50) + '...'
                    : book.description}
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

export default Books;
