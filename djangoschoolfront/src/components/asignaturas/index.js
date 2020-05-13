import React, { useEffect, useState } from "react";
import Asignatura from "./Asignatura";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const Asignaturas = () => {
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
      <h1>Asignaturas</h1>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        {tests.map((item) => {
          return <Asignatura key={item.id} data={item} />;
        })}
      </Grid>
    </>
  );
};

export default Asignaturas;
