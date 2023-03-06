import React from "react";
import { createUseStyles } from "react-jss";

// TODO: When you make the logo, make sure it looks clickable
// can also animate a little bit when hovering
const Logo: React.FC<{}> = () => {
    const classes = useStyles();
    const navigateToHome = () => {
        if (window.location.pathname !== "/") {
            window.location.replace("/");
        }
    };
    return (
        <h1
            className={classes.logo}
            onClick={navigateToHome}
            onKeyUp={navigateToHome}
        >
            Logo
        </h1>
    );
};

const useStyles = createUseStyles({
    logo: {
        cursor: "pointer",
    },
});

export default Logo;
