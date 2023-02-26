import React from 'react';
import { createUseStyles } from 'react-jss';
import SearchPanel from './SearchPanel';


const App: React.FC<{}> = () => {
  const classes = useStyles();
  console.log(classes);
  return (
    <div className={classes.screen}>
      <div className={classes.searchContainer}>
        <SearchPanel />
      </div>
      <div className={classes.proofContainer}></div>
    </div>
  );
}

const useStyles = createUseStyles({
  screen: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2eaec'
  },
  searchContainer: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  proofContainer: {
    width: '70%',
    height: '100%',
  },
});

export default App;
