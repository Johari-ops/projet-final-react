import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Spell } from '../../models/Spells';
import { useQuery } from '@tanstack/react-query';
import { getSpells } from '../../services/apiServices';
import { useFavorites } from '../../hooks/useFavorites';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';

const FavoriteSpells = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const { toggleFavorite, favorites } = useFavorites('spell-favorites');

  const {
    data: spells = [],
    isLoading,
    error,
  } = useQuery<Spell[], Error>({
    queryKey: ['spell-list'],
    queryFn: () => getSpells(),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error.message}</div>;

  // Filtrer uniquement les sorts favoris
  const favoriteSpells = spells.filter((spell) => favorites.includes(spell.index.toString()));

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
        Mes Sorts Favoris ({favoriteSpells.length})
      </Typography>

      {favoriteSpells.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            px: { xs: 2, sm: 10, md: 0.5 },
            color: 'text.secondary',
            textAlign: 'center',
            py: 4,
          }}
        >
          Aucun sort favori pour le moment. Ajoutez des sorts à vos favoris !
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
          {favoriteSpells.map((spell, index) => (
            <SwiperSlide key={spell.index} style={{ height: 'auto' }}>
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
                      '&:hover': { backgroundColor: 'action.selectedHover' },
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {spell.spell}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {spell.use}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(spell.index.toString());
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

export default FavoriteSpells;
