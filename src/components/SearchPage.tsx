import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import ProofResult from "./ProofResult";
import SearchInput from "./SearchInput";
import { proofs as mockPoofs } from "../proofs.mock";

// TODO: After implementing API search, it should occur button press and no onChange
const SearchPage: React.FC = () => {
	const classes = useStyles();
	const [proofs, _] = useState(mockPoofs); // TODO: initial value should be an empty array
	return (
		<div className={classes.searchContainer}>
			<div className={classes.searchInputContainer}>
				<div className={classes.searchInput}>
					<SearchInput onChange={() => {}} />
				</div>
			</div>
			<div className={classes.searchResultsContainer}>
				{proofs.map((proof) => (
					<div key={proof.id} className={classes.searchResultContainer}>
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
		width: "100%",
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
});

export default SearchPage;
