import { proofApi } from "api";
import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { InlineMath } from "react-katex";
import { redirect, useParams } from "react-router-dom";
import { Proof } from "types";

const ProofPage: React.FC = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [proof, setProof] = React.useState<Proof | null>(null);
    const [isProofNotFound, setIsProofNotFound] = React.useState(false);

    useEffect(() => {
        if (id) {
            proofApi
                .getProof(id)
                .then((proof) => setProof(proof))
                .catch(() => setIsProofNotFound(true));
        } else {
            redirect("/");
        }
    }, [id]);

    if (isProofNotFound) {
        return <div>Proof not found</div>;
    }
    if (!proof) {
        return <div>loading...</div>;
    }
    return (
        <div className={classes.container}>
            <div className={classes.proofId}>{proof.id}</div>
            <div className={classes.proofTitle}>
                {proof.type} {proof.title && ` - ${proof.title}`}
            </div>
            <div className={classes.proofContainer}>
                <div className={classes.proofContentContainer}>
                    <InlineMath math={proof.what} />
                    {proof.why && (
                        <>
                            <hr className={classes.proofWhySeparator} />
                            <InlineMath
                                math={proof.why}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    container: {
        width: "70%",
        paddingTop: "3%",
    },
    proofId: {
        fontSize: "1.2rem",
        paddingBottom: "1%",
    },
    proofTitle: {
        fontSize: "1.5rem",
        paddingBottom: "2%",
        fontWeight: "bold",
    },
    proofContainer: {
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
        backgroundColor: "#f5f5f5",
        minHeight: "20%",
        maxHeight: "80%",
        width: "100%",
        border: "1px solid black",
        borderRadius: "5px",
    },
    proofContentContainer: {
        width: "96%",
        height: "100%",
        marginLeft: "2%",
        marginRight: "2%",
        marginTop: "2%",
        marginBottom: "2%",
    },
    proofWhySeparator: {
        width: "100%",
        height: "1px",
        backgroundColor: "black",
        marginTop: "2%",
        marginBottom: "2%",
        opacity: "0.2",
    },
});

export default ProofPage;
