// From https://mui.com/material-ui/react-card/
import * as React from 'react';
import {useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RsvpButton from '../components/rsvpButton'
import CalendarButton from '../components/googleCalendar.js'
import {AuthContext} from '../context/AuthContext'
import DeleteButton from '../components/deleteButton.js'

// expand post interface
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ImgMediaCard(props) {
  const {user} = useContext(AuthContext)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        <Typography variant="body2" color="text.secondary">
          {props.startTime} to {props.endTime}
        </Typography>
      </CardContent>
      </CardActionArea>


      <CardActions disableSpacing>
        <RsvpButton id={props.link} author={props.userId} RSVP_List={props.RSVP_List}></RsvpButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />Details
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="h5">Description:</Typography>
          <Typography paragraph>{props.content}</Typography>
          <Typography variant="h5">Location:</Typography>
          <Typography variant="body1">{props.location}</Typography>
          <Typography variant="h5">Organizer:</Typography>
          <Typography variant="body1">{props.organizer}</Typography>


          <CalendarButton 
              summary={props.title}
              description={props.content}
              location={props.location}
              start={props.startTime}
              end={props.endTime}
          ></CalendarButton>

         {user && (user._id === props.userId) && <DeleteButton id={props.link}></DeleteButton>}
        </CardContent>
      </Collapse>
    </Card>
  );
}
