import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardComponent({
  label,
  width,
  height,
  maxWidth = "345px",
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  cardBgColor,
  onClickHandler
}) {
  return (
    <Card sx={{ 
            width: width,
            height: height,
            maxWidth: maxWidth,
            marginTop: marginTop,
            marginRight: marginRight,
            marginLeft: marginLeft,
            marginBottom: marginBottom,
          }} 
          onClick={onClickHandler}
    >
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent sx={{ backgroundColor: cardBgColor }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
            {label}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}