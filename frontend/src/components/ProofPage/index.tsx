import { proofApi } from "api";
import Katex from "components/Katex";
import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Proof } from "types";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import AreYouSureModal from "components/AreYouSureModal";

const ProofPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [proof, setProof] = React.useState<Proof | null>(null);
  const [isProofNotFound, setIsProofNotFound] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  const deleteProof = () => {
    if (proof) proofApi.deleteProof(proof.id).then(() => navigate("/"));
  };

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
    <>
      <div className={classes.container}>
        <div className={classes.proofId}>{proof.id}</div>
        <div className={classes.proofHeader}>
          <div className={classes.proofTitle}>
            {proof.type} {proof.title && ` - ${proof.title}`}
          </div>
          <TrashIcon className={classes.trashIcon} onClick={toggleModal} />
          <AreYouSureModal
            title={"Delete Proof"}
            text={`are you sure you wish to delete proof ${proof.id}?`}
            isOpen={isModalOpen}
            onConfirm={deleteProof}
            onCancel={() => setIsModalOpen(false)}
          />
        </div>
        <div className={classes.proofContainer}>
          <div className={classes.proofContentContainer}>
            <Katex text={proof.what} />
            {proof.why && (
              <>
                <hr className={classes.proofWhySeparator} />
                <Katex text={proof.why} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
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
  proofHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "2%",
    alignItems: "center",
  },
  proofTitle: {
    fontSize: "1.5rem",
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
  trashIcon: {
    width: "2.5%",
    cursor: "pointer",
    "&:hover": {
      fill: "#ff0000",
      transform: "scale(1.05)",
      transition: "fill 0.2s ease-in-out",
    },
  },
});

export default ProofPage;
