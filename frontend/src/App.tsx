import React from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "./colors";
import router from "./components/Router";
import Logo from "./components/Logo";
import { RouterProvider } from "react-router";

const App: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.screen}>
        <RouterProvider router={router} />
        <div className={classes.logoContainer}>
          <Logo />
        </div>
      </div>
    </>
  );
};

const useStyles = createUseStyles({
  screen: {
    position: "relative",
    width: "100%",
    height: "98vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.Secondary2,
    overflow: "hidden",
  },
  logoContainer: {
    width: "20vh",
    position: "absolute",
    marginTop: "3vh",
    marginLeft: "3vh",
    left: 0,
    top: 0,
  },
});

export default App;
