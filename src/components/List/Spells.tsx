import useFetchSpells from '../../hooks/useFetchSpell';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Spells = () => {
  const { spells, loading, error } = useFetchSpells();
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
      Sorts :
      </Typography>
      <Swiper
  modules={[Navigation, Autoplay]}
  navigation
  spaceBetween={20}
  slidesPerView={5}
  centeredSlides={false}
  centerInsufficientSlides={false}
  grabCursor={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
>
  {spells.map((spell, index) => (
    <SwiperSlide key={spell.index} style ={{ height: "auto" }}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea
          onClick={() => setSelectedCard(index)}
          data-active={selectedCard === index ? '' : undefined}
          sx={{
            height: "100%",
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': { backgroundColor: 'action.selectedHover' },
            },
          }}
        >
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {spell.spell}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {spell.use}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>

    </Box>
    </>
  );
};

export default Spells;
