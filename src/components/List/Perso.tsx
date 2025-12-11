import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getPerso } from '../../services/apiServices';
import { useQuery } from '@tanstack/react-query';
import type { Perso } from '../../models/Perso';

const Perso = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const {
    data: personnages = [],
    isLoading,
    error,
  } = useQuery<Perso[], Error>({
    queryKey: ['perso-list'],
    queryFn: () => getPerso(),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Box sx={{ width: '100%', mt: 4, px: { xs: 2, sm: 3, md: 1 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            px: { xs: 2, sm: 10, md: 0.5 },
          }}
        >
          Personnages :
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
          {personnages.map((perso, index) => (
            <SwiperSlide
              key={perso.index}
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
                    image={perso.image}
                    alt={`Image de ${perso.fullName}`}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {perso.fullName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {perso.nickname.length > 50 ? perso.nickname.slice(0, 50) + '...' : perso.nickname}
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
    </>
  );
};

export default Perso;
