import React from 'react';
import { createUseStyles } from 'react-jss';
import { Colors } from './colors';
import SearchPage from './SearchPanel';
import Logo from './components/Logo';


const App: React.FC<{}> = () => {
    const classes = useStyles();
    console.log(classes);
    return (
        <>
            <div className={classes.screen}>
                <div className={classes.searchContainer}>
                    <SearchPage />
                </div>
                <div className={classes.logoContainer}>
                    <Logo />
                </div>
            </div>
        </>
    );
}

const useStyles = createUseStyles({
    screen: {
        position: 'relative',
        width: '100%',
        height: '98vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.Secondary2,
        overflow: 'hidden'
    },
    searchContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        marginTop: '3vh',
        marginLeft: '3vh',
        left: 0,
        top: 0,
    }
});

export default App;
