import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Alumn = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid xs={12} sm={6} item>
      <Link to={`/asignatura/${data.id}`} style={{ textDecoration: "none" }}>
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://source.unsplash.com/random?exam${data.id}`}
              title="exam"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
              {data.detail && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {data.detail}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default Alumn;
