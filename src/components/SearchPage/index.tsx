import ProofResult from "./ProofResult";
import SearchInput from "./SearchInput";
import { proofApi } from "api";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { Proof } from "types";

// TODO: onChange should be a debounced function
const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [searchResults, setSearchResults] = useState<Proof[]>([]);

    useEffect(() => {
        setIsSearching(true);
        proofApi
            .searchProofs(debouncedSearchQuery)
            .then((results) => setSearchResults(results))
            .catch((err) => console.log(err))
            .finally(() => setIsSearching(false));
    }, [debouncedSearchQuery]);

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchInputContainer}>
                <div className={classes.searchInput}>
                    <SearchInput
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
            </div>
            <div className={classes.searchResultsContainer}>
                {isSearching
                    ? [...Array(4)].map((_, i) => (
                        <div className={classes.skeletonResult} key={`skeleton-${i}`}>
                            <div className={classes.loadingBar} />
                        </div>
                    ))
                    : searchResults.map((proof) => (
                        <div
                            key={proof.id}
                            className={classes.searchResultContainer}
                            onClick={() => navigate(`/proofs/${proof.id}`)}
                            onKeyUp={() => navigate(`/proofs/${proof.id}`)}
                        >
                            <ProofResult proof={proof} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    searchContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    searchInputContainer: {
        height: "15%",
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        width: "40%",
    },
    searchResultsContainer: {
        width: "50%",
        height: "80%",
        overflow: "auto",
        overflowY: "overlay",
    },
    searchResultContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "15%",
        marginBottom: "5%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        border: "none",
        outline: "none",
        fontSize: "16px",
        color: "#333",
        backgroundColor: "#fff",
        transition: "all 0.15s ease-in-out",
        "&:hover": {
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",
        },
    },
    skeletonResult: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "90%",
        height: "15%",
        marginBottom: "5%",
        backgroundColor: "#EAEAEA",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    loadingBar: {
        height: "100%",
        position: "relative",
        top: 0,
        left: "-150%",
        background: `linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)`,
        animation: "$loading 1.5s infinite",
    },
    "@keyframes loading": {
        "0%": {
            left: "-150%",
        },
        "50%": {
            left: "150%",
        },
        "100%": {
            left: "150%",
        },
    },
});

export default SearchPage;
