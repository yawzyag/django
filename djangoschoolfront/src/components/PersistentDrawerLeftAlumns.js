import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "../utils/axios";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ImageIcon from '@material-ui/icons/Image';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Tests from "./test/Tests";
import { Link, withRouter } from "react-router-dom";
import Links from "./Links";
import UserLinks from "./UserLinks";
import TeacherDashboard from "./teacher";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


const PersistentDrawerLeftCurso = ({ match, history }) => {
  let studentsArray = []
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [students, setStudents] = useState(studentsArray);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState({ id: null, student: null, teacher: null });
  const [session, setSession] = useState(false);
  const [data, setData] = useState(false);

  const renderMaterias = () => {
    return data.map((item) => {
      return <Typography variant="h6"
      noWrap>{item.title}</Typography>;
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handelLink = (text) => {
    if (text === "Iniciar session") {
      return "/login";
    }
    if (text === "Crear cuenta") {
      return "/register";
    }
    return "#";
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseSession = async () => {
    try {
      const headers = { headers: { Authorization: `Token ${session}` } };
      const url = `${process.env.REACT_APP_API_URL}api/auth/logout`;
      await axios.post(url, {}, headers);
    } catch (error) {
      console.log("handleCloseSession -> error", error.response.data.detail);
    } finally {
      history.push("/");
    }
  };
  const getUser = async (id) => {
    try {
      const res = await get(`api/users/${id}`)
      setStudents([...students, res.data])
      const resp1 = await get(`api/auth/user_type`)
      console.log("getUser -> resp1", resp1)
      
      studentsArray = [...studentsArray, res.data]
    } catch (error) {
      console.log("getUser -> error", error)  
    }
  }
  useEffect(() => {
    studentsArray = []
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
    setSession(token);

    const getType = async () => {
      try {
        const resp = await get(`api/courses/1`);
        
        setData(resp.data.students);
        const dataUser = resp.data.students.forEach((item) =>{
          getUser(item)
          return ([])
        });
      } catch (error) {
        console.log("getType -> error", error);
      }
      setLoading(false);
    };
    getType();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            School
          </Typography>
          {session && (
            <Typography
              onClick={handleCloseSession}
              style={{ marginLeft: "auto" }}
              variant="h6"
              noWrap
            >
              Cerrar session
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {<UserLinks data={["Dashboard", "Usuario", "Asignaturas"]} />}
        </List>
        <Divider />
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container maxWidth="sm">
        <p
          className="arrowBack"
          onClick={() => {
            history.goBack();
          }}
        ><ChevronLeftIcon /> atras
        </p>
          <h1>Lista de alumnos</h1>
          {students.map((item) => {
            return (<div>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img src={`https://source.unsplash.com/random?user${item.id}`} alt="avatar"></img>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nombre" secondary={item.name} />
              <ListItemText primary="Email" secondary={item.email} />
            </ListItem>
            </div>)
          })}
        </Container>
      </main>
    </div>
  );
};

export default withRouter(PersistentDrawerLeftCurso);
