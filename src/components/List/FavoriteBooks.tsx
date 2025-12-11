// components/List/FavoriteBooks.tsx
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getBooks } from '../../services/apiServices';
import { useQuery } from '@tanstack/react-query';
import type { Book } from '../../models/Books';
import { useFavorites } from '../../hooks/useFavorites';

const FavoriteBooks = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const { toggleFavorite, favorites } = useFavorites('books-favorites');

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[], Error>({
    queryKey: ['book-list'],
    queryFn: () => getBooks(),
  });

  // Filtrer uniquement les livres favoris
  const favoriteBooks = books.filter((book) => favorites.includes(book.number.toString()));

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ width: '100%', mt: 4, px: { xs: 2, sm: 3, md: 1 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 2,
          px: { xs: 2, sm: 10, md: 0.5 },
        }}
      >
        Mes Livres Favoris ({favoriteBooks.length})
      </Typography>

      {favoriteBooks.length === 0 ? (
        <Typography variant="body1" sx={{ px: { xs: 2, sm: 10, md: 0.5 }, color: 'text.secondary' }}>
          Aucun livre favori pour le moment. Ajoutez des livres à vos favoris !
        </Typography>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={5}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            600: { slidesPerView: 2, spaceBetween: 15 },
            900: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 5, spaceBetween: 20 },
            1536: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {favoriteBooks.map((book, index) => (
            <SwiperSlide
              key={book.number}
              style={{
                display: 'flex',
                height: 'auto',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? '' : undefined}
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
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
                    image={book.cover}
                    alt={`Couverture de ${book.title}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {book.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {book.description.length > 50 ? book.description.slice(0, 50) + '...' : book.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button size="small">Voir plus</Button>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book.number.toString());
                    }}
                    color="error"
                    aria-label="retirer des favoris"
                  >
                    <Favorite />
                  </IconButton>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default FavoriteBooks;
