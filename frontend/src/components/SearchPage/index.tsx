import ProofResult from "./ProofResult";
import SearchInput from "./SearchInput";
import { proofApi } from "api";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Proof } from "types";
import { sortByID } from "./sortProofs";
import { toast } from "react-toastify";

const SearchPage: React.FC = () => {
  const classes = useStyles();

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [searchResults, setSearchResults] = useState<Proof[]>([]);

  useEffect(() => {
    setIsSearching(true);
    proofApi
      .searchProofs(debouncedSearchQuery)
      .then((results) => setSearchResults(results.sort(sortByID)))
      .catch((err) => toast.error(err.message))
      .finally(() => setIsSearching(false));
  }, [debouncedSearchQuery]);

  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchInputContainer}>
        <a href="/proofs/create" className={classes.addNewProofButtonLink}>
          <button className={classes.addNewProofButton}>Add Proof</button>
        </a>
        <div className={classes.searchInput}>
          <SearchInput
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        <div className={classes.placeholderDiv}></div>
      </div>
      <div className={classes.searchResultsContainer}>
        {isSearching
          ? [...Array(4)].map((_, i) => (
              <div
                className={`${classes.searchResultContainer} ${classes.skeletonResult}`}
                key={`skeleton-${i}`}
              >
                <div className={classes.loadingBar} />
              </div>
            ))
          : searchResults.map((proof) => (
              <a
                href={`/proofs/${proof.id}`}
                key={proof.id}
                className={classes.searchResultContainerLink}
              >
                <div className={classes.searchResultContainer}>
                  <ProofResult proof={proof} />
                </div>
              </a>
            ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  placeholderDiv: {
    // The purpose of this div is be an invisible 3rd child in the input container,
    // So I can use space-between/space-around to place the button on the left and the input in the middle
    width: "10%",
  },
  addNewProofButtonLink: {
    textDecoration: "none",
    width: "13%",
    height: "40%",
  },
  addNewProofButton: {
    height: "100%",
    width: "100%",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
    backgroundColor: "#E0624D",
    boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#EC9B7B",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    },
  },
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
    justifyContent: "space-around",
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
  searchResultContainerLink: {
    textDecoration: "none",
  },
  skeletonResult: {
    padding: 0,
    transition: "none",
    "&:hover": {
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    cursor: "default",
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
    animation: "$loading ease-in-out 1.5s infinite",
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
