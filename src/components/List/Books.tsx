import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getBooks } from '../../services/apiServices';
import { useQuery } from '@tanstack/react-query';
import type { Book } from '../../models/Books';

const Books = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[], Error>({
    queryKey: ['book-list'],
    queryFn: () => getBooks(),
  });

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
        Livres :
      </Typography>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={20}
        slidesPerView={5}
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          // Mobile (xs) - 1 carte
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // Petit écran (sm) - 2 cartes
          600: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // Tablette (md) - 3 cartes
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // Desktop (lg) - 5 cartes
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          // Large desktop (xl) - 6 cartes
          1536: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {books.map((book, index) => (
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

              <CardActions>
                <Button size="small">Voir plus</Button>
              </CardActions>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Books;
