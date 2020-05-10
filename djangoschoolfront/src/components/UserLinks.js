import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const UserLinks = ({ data }) => {
    const handelLink = (text) => {
        if (text === "Examenes") {
          return "/examenes";
        }
        return "#";
      };
  return (
    <>
      {data.map((text, index) => (
        <Link
          key={text}
          to={`${handelLink(text)}`}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <ListItem button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      ))}
    </>
  );
};

export default UserLinks;
