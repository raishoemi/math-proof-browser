import React from "react";
import { createUseStyles } from "react-jss";
import { Proof } from "../../types";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Props {
    proof: Proof;
}

const ProofResult: React.FC<Props> = ({ proof }) => {
    const classes = useStyles();

    return (
        <div className={classes.proofResult}>
            <div className={classes.proofHeader}>
                <div className={classes.titleContainer}>
                    <span className={classes.titleType}>{proof.type}</span>
                    {proof.title && (
                        <span className={classes.title}> - {proof.title}</span>
                    )}
                </div>
                <span className={classes.id}>{proof.id}</span>
            </div>
            <InlineMath math={proof.what} />
        </div>
    );
};

const useStyles = createUseStyles({
    proofResult: {
        width: "92%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    proofHeader: {
        display: "flex",
        flexDirection: "row",
    },
    titleContainer: {
        fontSize: "1.2em",
        width: "90%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "inline-block",
    },
    titleType: {
        fontWeight: "bold",
    },
    title: {
        fontStyle: "italic",
    },
    id: {
        fontWeight: "bold",
        fontSize: "1.0em",
        color: "black",
        marginBottom: "1em",
        width: "10%",
        justifySelf: "flex-end",
        textAlign: "right",
    },
});

export default ProofResult;
