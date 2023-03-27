import React from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";

interface Props {
  title: string;
  text: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSureModal: React.FC<Props> = ({
  title,
  text,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const classes = useStyles();
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className={classes.modal}>
      <></>
      <div className={classes.modal}>
        <div className={classes.title}>{title}</div>
        <div className={classes.text}>{text}</div>
        <div className={classes.buttons}>
          <button className={classes.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles(() => ({
  modal: {
    fontFamily: "system-ui",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "20vw",
    height: "15vh",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    marginLeft: 10,
    padding: "8px 16px",
    borderRadius: 4,
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      // Use a matching backgroundColor to the one above
      backgroundColor: "#0069d9",
    },
  },
  cancelButton: {
    marginLeft: 10,
    padding: "8px 16px",
    borderRadius: 4,
    color: "#fff",
    backgroundColor: "#6c757d",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#61676c",
    },
  },
}));

export default AreYouSureModal;
