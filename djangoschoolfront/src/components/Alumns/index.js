import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Alumn from "./Alumno";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
const Alumns = () => {
    const classes = useStyles();
  const [tests, setTest] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}api/curricular`;
        const resp = await axios.get(url);
        setTest(resp.data);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <>
      <h1>Alumnos</h1>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid xs={12} sm={6} item>
      <Link to={`/alumnos`} style={{ textDecoration: "none" }}>
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://source.unsplash.com/random?exam${23}`}
              title="exam"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Alumnos
              </Typography>
              {(
                <Typography variant="body2" color="textSecondary" component="p">
                  Detalle de tu curso
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
      </Grid>
    </>
  );
};

export default Alumns;
