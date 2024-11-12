import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CryptoState } from "../../CryptoContext";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const useStyles = makeStyles({
  contanier: {
    width: 350,
    height: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Rubik",
  },
  profile:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"15px",
    height:"90%"
  },
  logout: {
    height:"10%",
    width:"100%",
    marginTop:20,
  },
  watchlist: {
    backgroundColor:"grey",
    width:"100%",
    height:"80%",
    borderRadius:10,
    padding:15,
    paddingTop:10,
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:10,
    overflowY:"auto",
    overflowX:"hidden",
    marginBottom:10,

  }
});



export default function UserDisplay() {
  const [state, setState] = React.useState({
    left: false,
  });
  const classes = useStyles();

  const { user, setAlert } = CryptoState();

  const logout = ()=>{
    signOut(auth);

    setAlert({
      open:true,
      type:"success",
      message:"User Logged Out "
    })
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 40,
              width: 40,
              marginLeft: 5,
              cursor: "pointer",
              backgroundColor: "white",
            }}
            src={user.photoURL}
            alt={user.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.contanier}>
              <div className={classes.profile}>
                <Avatar
                //   className={classes.picture}
                style={{
                    width:100,
                    height:100,
                    cursor:"pointer",
                    backgroundColor:"#1B8E2D",
                    objectFit:"contain"
                }}
                  src={user.photoURL}
                  alt={user.displayName||user.email}
                />
                <span style={{
                    width:"100%",
                    fontSize:23,
                    textAlign:"center",
                    fontWeight:"bolder",
                    wordWrap:"break-word",
                }}>
                    {user.displayName||user.email}
                </span> 
                <div
                className={classes.watchlist}>
                  <span style={{fontSize:16,
                    textShadow:"0 0 5px black"
                  }}>Watchlist</span>
                </div>
              </div>
              <Button
              variant="contained"
              className={classes.logout }
              style={{
                backgroundColor:"#FF6961",
                fontWeight:"bold",
                fontSize:16,
                color:"white"

              }}
              onClick={logout}>Log Out</Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
