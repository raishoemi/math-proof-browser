import React, { useEffect, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { Proof } from "../types";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Props {
  proof: Proof;
}

const ProofResult: React.FC<Props> = ({ proof }) => {
  const classes = useStyles();
  const parsedWhy = useMemo(() => proof.why.split("$"), [proof.why]);

  return (
    <div className={classes.proofResult}>
      <div className={classes.proofHeader}>
        <span className={classes.what}>{proof.what}</span>
        <span className={classes.id}>{proof.id}</span>
      </div>
      <span className={classes.why}>
        {parsedWhy.map((text, index) => {
          if (index % 2 === 0) {
            return text;
          } else {
            return <InlineMath math={text} />;
          }
        })}
      </span>
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
  },
  proofHeader: {
    display: "flex",
    flexDirection: "row",
  },
  what: {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "black",
    width: "90%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  why: {
    fontSize: "1.0em",
    color: "black",
  },
  id: {
    fontSize: "1.0em",
    color: "black",
    marginBottom: "1em",
    width: "10%",
    justifySelf: "flex-end",
    textAlign: "right",
  },
});

export default ProofResult;
