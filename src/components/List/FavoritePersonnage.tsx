import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getPerso } from '../../services/apiServices';
import { useQuery } from '@tanstack/react-query';
import type { Perso } from '../../models/Perso';
import { useFavorites } from '../../hooks/useFavorites';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const Personnage = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { toggleFavorite, isFavorite, favorites } = useFavorites('perso-favorites');

  const {
    data: personnages = [],
    isLoading,
    error,
  } = useQuery<Perso[], Error>({
    queryKey: ['perso-list'],
    queryFn: () => getPerso(),
  });

  // Log des favoris à chaque changement
  useEffect(() => {
    if (favorites.length > 0) {
      console.log('👤 Favoris de personnages:', favorites);
      console.log('👤 Nombre de favoris:', favorites.length);
    }
  }, [favorites]);

  // Filtrer selon le toggle
  const displayedPersonnages = showOnlyFavorites
    ? personnages.filter((perso) => favorites.includes(perso.index.toString()))
    : personnages;

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ width: '100%', mt: 4, px: { xs: 2, sm: 3, md: 1 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: { xs: 2, sm: 10, md: 0.5 },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
          }}
        >
          Personnages {showOnlyFavorites && `(${displayedPersonnages.length} favoris)`}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyFavorites}
              onChange={(e) => setShowOnlyFavorites(e.target.checked)}
              color="primary"
            />
          }
          label="Favoris uniquement"
        />
      </Box>

      {displayedPersonnages.length === 0 && showOnlyFavorites ? (
        <Typography
          variant="body1"
          sx={{
            px: { xs: 2, sm: 10, md: 0.5 },
            color: 'text.secondary',
            textAlign: 'center',
            py: 4,
          }}
        >
          Aucun personnage favori pour le moment. Cliquez sur ❤️ pour ajouter des personnages à vos favoris !
        </Typography>
      ) : (
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
          {displayedPersonnages.map((perso, index) => (
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
                    image={perso.image}
                    alt={`Image de ${perso.fullName}`}
                    sx={{ objectFit: 'cover', height: 200 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {perso.fullName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {perso.nickname.length > 50 ? perso.nickname.slice(0, 50) + '...' : perso.nickname}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button size="small">Voir plus</Button>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(perso.index.toString());
                    }}
                    color="error"
                    aria-label={isFavorite(perso.index.toString()) ? 'retirer des favoris' : 'ajouter aux favoris'}
                  >
                    {isFavorite(perso.index.toString()) ? <Favorite /> : <FavoriteBorder />}
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

export default Personnage;
