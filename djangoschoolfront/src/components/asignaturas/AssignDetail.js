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

const AssignDetail = (props) => {
  const [test, setTest] = useState();
  const [user, setUser] = useState();
  const { match, id, history } = props;
  const classes = useStyles();
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}api/curricular/${parseInt(id)}`;
        const resp = await axios.get(url);
        setTest(resp.data);
        const url1 = `${process.env.REACT_APP_API_URL}api/users/${parseInt(resp.data.teacher)}`;
        const resp1 = await axios.get(url1);
        setUser(resp1.data)
      } catch (error) {
        if (error?.response?.data?.detail)console.log("getData -> error", error.response.data.detail);
        history.push("/dashboard");
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
              {user &&
              <>
                  <Button size="small" color="primary">
                    {user.name}
                  </Button>
                  <Typography gutterBottom variant="h6" component="h2">
                    {user.email}
                  </Typography>
            </>
              }
            </CardActions>
            <CardActions className="detailCardNote">
              {user &&
              <>
                  <Button color="primary">
                    nombre
                  </Button>
                  <Typography gutterBottom variant="h4" component="h2">
                    Email
                  </Typography>
            </>
              }
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default withRouter(AssignDetail);
