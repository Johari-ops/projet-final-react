import useFetchHouses from '../../hooks/useFetchHouses';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Houses = () => {
  const { houses, loading, error } = useFetchHouses();
  const [selectedCard, setSelectedCard] = useState(0);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Box sx={{ width: "100%", mt: 4, px: { xs: 2, sm: 3, md: 1 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            px: { xs: 2, sm: 10, md: 0.5 }
          }}
        >
          Maisons :
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
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
            // Desktop (lg) - 4 cartes
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            // Large desktop (xl) - 5 cartes
            1536: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >

          {houses.map((house, index) => (
            <SwiperSlide key={house.index}>
              <Card>
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
                  <Typography variant="h4" component="div" align='center' margin={10}>
                    {house.emoji}
                  </Typography>
                  <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
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

export default Houses;
