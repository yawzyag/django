import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { get } from "../../utils/axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { withRouter } from "react-router-dom";

const TeacherDashboard = ({history}) => {
  const [courses, setCourses] = useState([]);
  const renderList = () => {
    return courses.map((item) => {
      return (
        <ListItem onClick={() => history.push(`/curso/${item.id}`)}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary={item.title} />
          <p >Ir</p>
        </ListItem>
      );
    });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await get(`api/courses`);
        setCourses(resp.data)
      } catch (error) {
        console.log("getData -> error", error);
      }
    };
    getData();
  }, []);
  return <Grid>{renderList()}</Grid>;
};

export default withRouter(TeacherDashboard);
