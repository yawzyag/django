import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
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
import Asignaturas from "./asignaturas";
import Alumns from "./Alumns";

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

const PersistentDrawerLeft = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState({ id: null, student: null, teacher: null });
  const [session, setSession] = useState(false);

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
      localStorage.clear()
    } catch (error) {
      console.log("handleCloseSession -> error", error.response.data.detail);
    } finally {
      history.push("/");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
    const getValidation = async () => {
      try {
        const headers = { headers: { Authorization: `Token ${token}` } };
        const url = `${process.env.REACT_APP_API_URL}api/auth/user`;
        await axios.get(url, headers);
      } catch (error) {
        console.log("getValidation -> error", error.response.data.detail);
        history.push("/");
      } finally {
        setLoading(false);
        setSession(token);
      }
    };
    const getType = async () => {
      try {
        const headers = { headers: { Authorization: `Token ${token}` } };
        const url = `${process.env.REACT_APP_API_URL}api/auth/user_type`;
        const resp = await axios.get(url, headers);
        setType({
          id: resp.data.user,
          student: resp.data.is_student,
          teacher: resp.data.is_teach,
        });
      } catch (error) {
        console.log("getValidation -> error", error.response.data.detail);
        history.push("/");
      } finally {
        setLoading(false);
        setSession(token);
      }
    };
    getType();
    getValidation();
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
              style={{ marginLeft: "auto", cursor: "pointer" }}
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
        <Container maxWidth="sm">{!loading && <>

        {type.student && <Asignaturas />}
        {type.student && <Alumns />}
        {type.student && <Tests />}
        {type.teacher && <TeacherDashboard />}
        </>
        }</Container>
      </main>
    </div>
  );
};

export default withRouter(PersistentDrawerLeft);
