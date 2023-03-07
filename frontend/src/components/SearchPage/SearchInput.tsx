// Using react-jss add a nicely styled text for searching

import React from "react";
import { createUseStyles } from "react-jss";

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ onChange, value }) => {
	const classes = useStyles();
	return (
		<input
			value={value}
			className={classes.searchInput}
			placeholder="Search..."
			onChange={onChange}
		/>
	);
};

const useStyles = createUseStyles({
	searchInput: {
        height: "4vh",
		width: "100%",
		boxSizing: "border-box",
		padding: "2vh",
		borderRadius: "5px",
		boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
		border: "none",
		outline: "none",
		fontSize: "16px",
		"&:focus": {
			boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",
		},
	},
});
export default SearchInput;
