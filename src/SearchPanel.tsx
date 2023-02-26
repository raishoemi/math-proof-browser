import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import SearchInput from './components/SearchInput';
import { proofs as mockPoofs } from './proofs.mock';

// TODO: After implementing API search, it should occur button press and no onChange
const SearchPage: React.FC = () => {
    const classes = useStyles();
    const [proofs, _] = useState(mockPoofs); // TODO: initial value should be an empty array
    return (
        <>
            <div className={classes.searchInputContainer}>
                <div className={classes.searchInput} >
                    <SearchInput onChange={() => { }} />
                </div>
            </div>
            <div className={classes.searchResultsContainer}>
                {proofs.map((proof) => (
                    <div className={classes.searchResultContainer}>{proof.title}</div>
                ))}
            </div>
        </>
    );
};

const useStyles = createUseStyles({
    searchInputContainer: {
        height: '15%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        width: '40%'
    },
    searchResultsContainer: {
        width: '50%',
        height: '80%',
        overflow: 'auto',
        overflowY: 'overlay'
    },
    searchResultContainer: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '15%',
        marginBottom: '5%',
        borderRadius: '5px',
        boxShadow: '0 0 7px 0 rgba(0,0,0,0.2)',
        '&:hover': {
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)'
        },
        backgroundColor: 'white',
        cursor: 'pointer',
    },
});

export default SearchPage;
