import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { House } from '../../models/House';
import { useQuery } from '@tanstack/react-query';
import { getHouses } from '../../services/apiServices';
import { useFavorites } from '../../hooks/useFavorites';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';

const FavoriteHouses = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const { toggleFavorite, favorites } = useFavorites('houses-favorites');

  const {
    data: houses = [],
    isLoading,
    error,
  } = useQuery<House[], Error>({
    queryKey: ['house-list'],
    queryFn: () => getHouses(),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error.message}</div>;

  // Filtrer uniquement les maisons favorites
  const favoriteHouses = houses.filter((house) => favorites.includes(house.index.toString()));

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
        Mes Maisons Favorites ({favoriteHouses.length})
      </Typography>

      {favoriteHouses.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            px: { xs: 2, sm: 10, md: 0.5 },
            color: 'text.secondary',
            textAlign: 'center',
            py: 4,
          }}
        >
          Aucune maison favorite pour le moment. Ajoutez des maisons à vos favoris !
        </Typography>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            600: { slidesPerView: 2, spaceBetween: 15 },
            900: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {favoriteHouses.map((house, index) => (
            <SwiperSlide key={house.index}>
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
                  <Typography variant="h4" component="div" align="center" margin={10}>
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
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button size="small">Voir plus</Button>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(house.index.toString());
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

export default FavoriteHouses;
