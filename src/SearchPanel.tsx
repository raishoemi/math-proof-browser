import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { proofs as mockPoofs } from './proofs.mock';

const SearchPanel: React.FC = () => {
    const classes = useStyles();
    const [proofs, _] = useState(mockPoofs); // TODO: initial value should be an empty array
    return (
        <>
            <div className={classes.searchInputContainer}>
                <input className={classes.searchInput} />
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
        height: '8%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        width: '70%'
    },
    searchResultsContainer: {
        width: '80%',
        height: '88%',
        overflowY: 'auto'
    },
    searchResultContainer: {
        width: '90%',
        height: '15%',
        marginBottom: '5%',
        borderRadius: '5px',
        boxShadow: '0 0 7px 0 rgba(0,0,0,0.7)',
        backgroundColor: 'white'
    },
});

export default SearchPanel;
