// From https://mui.com/material-ui/react-card/
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RsvpButton from '../components/rsvpButton'

export default function ImgMediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={"/post/" + props.link}>
      <CardMedia
        component="img"
        height="140"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions>
        <RsvpButton id={props.link}></RsvpButton>
        <Button size="small">See Post</Button>
      </CardActions>
    </Card>
  );
}
