import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    position: "relative",
  },
  spaceX: {
    margin: ".5rem .5rem",
    display: "inline-block",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: ".5rem 0",
  },
  mZero: {
    margin: 0,
  },
}));

export default function Item({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <CardHeader
          avatar={
            <Badge badgeContent={item.cafeRating} color="primary">
              <StarIcon style={{ color: "#ffb400" }} />
            </Badge>
          }
        ></CardHeader>
        <div>
          <Typography
            variant="h6"
            gutterBottom
            style={{ lineHeight: "1.2" }}
            className={classes.mZero}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            display="block"
            gutterBottom
            className={classes.mZero}
            color="textSecondary"
          >
            Rs {item.costForTwo} price for two
          </Typography>
        </div>
      </div>

      <CardMedia className={classes.media} image={'https://d24l7ypac8dw56.cloudfront.net/MenuImages/ca628ef6a5b1e9f495eaacc65e4b6ff2_1502803236-88203-67552.jpg'} title={item.name} />
      <CardContent>
        <div>
          <span className={classes.spaceX}>
            {item.location && <Chip size="small" variant="outlined" label={item.location} />}
          </span>
          <span className={classes.spaceX}>
            {item.cafeTimings && <Chip size="small" variant="outlined" label={`Cafe timings-${item.cafeTimings}`} />}
          </span>
        </div>

        <Typography variant="subtitle2">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description || 'This place is like a vibe . Totally amazing for any type of gathering. I love the dj and music and also the staff is really cool. Love partying here. Food is sooo yummy. I love their fish and chips and spring rools and pizza and prices are also pretty worth it .'}
        </Typography>
      </CardContent>
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name="read-only"
          value={item.cafeRating}
          precision={0.5}
          readOnly
          size="small"
        />
      </Box>
    </Card>
  );
}
