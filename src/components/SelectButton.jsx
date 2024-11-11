
// import { styled } from "@mui/material";
// import React from "react";

// const SelectButton = ({ children, selected, onClick }) => {
//   const useStyles = makeStyles({
//     selectbtn: {
//       border: "1px solid gold",
//       borderRadius: 5,
//       padding: 10,
//       paddingLeft: 20,
//       paddingRight: 20,
//       fontFamily: "Montserrat",
//       cursor: "pointer",
//       backgroundColor: selected ? "gold" : "",  
//       color: selected ? "black" : "",
//       fontWeight: selected ? 700 : 500,
//       "&:hover": {
//         backgroundColor: "gold",
//         color: "black",
//       },
//       width: "22%",
//       //   margin: 5,
//     },
//   });

//   const classes = useStyles();
//   return (
//     <span onClick={onClick} className={classes.selectbtn}>
//       {children}
//     </span>
//   );
// };

// export default SelectButton;

import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const styles = {
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "transparent",
    color: selected ? "black" : "inherit",
    fontWeight: selected ? 700 : 500,
    width: "22%",
    textAlign: "center",
    transition: "background-color 0.3s, color 0.3s", // Add transition for smooth effect
    ...(selected && {
      color: "black",
      fontWeight: "700",
    }),
    ":hover": {
      backgroundColor: "gold",
      color: "black",
    },
  };

  return (
    <span onClick={onClick} style={styles}>
      {children}
    </span>
  );
};

export default SelectButton;
