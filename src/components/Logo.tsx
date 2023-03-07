import React from "react";
import { createUseStyles } from "react-jss";
import logo from "assets/logo.svg";

// TODO: Add cool opacity animation and magnifying glass rotation effect, on hover
const Logo: React.FC<{}> = () => {
    const classes = useStyles();
    const navigateToHome = () => {
        if (window.location.pathname !== "/") {
            window.location.replace("/");
        }
    };
    return (
        <img
            alt="logo"
            src={logo}
            className={classes.logo}
            onClick={navigateToHome}
            onKeyUp={navigateToHome}
        />
    );
};

const useStyles = createUseStyles({
    logo: {
        width: "100%",
        cursor: "pointer",
        "&:hover": {
            opacity: 0.6,
        }
    },
});

export default Logo;
