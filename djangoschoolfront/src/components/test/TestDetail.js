import React, { useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const TestDetail = (props) => {
  const [test, setTest] = useState();
  const { match, id, history } = props;
  const classes = useStyles();
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}api/tests/${parseInt(id)}`;
        const resp = await axios.get(url);
        setTest(resp.data);
      } catch (error) {
        console.log("getData -> error", error.response.data.detail);
        history.push("/examenes");
      }
    };
    getData();
  }, []);
  return (
    <>
      <p
        className="arrowBack"
        onClick={() => {
          history.goBack();
        }}
      >
        <ChevronLeftIcon /> atras
      </p>
      {test && (
        <Grid xs={12} sm={12} item>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`https://source.unsplash.com/random?exam${test.id}`}
                title="exam"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {test.title}
                </Typography>
                {test.detail && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {test.detail}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions className="detailCardNote">
              {test.note || test.note === 0 ? (
                <>
                  {" "}
                  <Button size="small" color="primary">
                    Felicidades, esta es tu nota
                  </Button>
                  <Typography gutterBottom variant="h6" component="h2">
                    {test.note}
                  </Typography>
                </>
              ) : (
                <>
                  <Button size="small" color="primary">
                    Aun no se ah creado tu nota
                  </Button>
                  <Typography gutterBottom variant="h6" component="h2">
                    #
                  </Typography>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default withRouter(TestDetail);
