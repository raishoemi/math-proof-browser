import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "system-ui",
  },
  proofID: {
    width: "8%",
  },
  courseTag: {
    width: "20%",
  },
  proofType: {
    width: "20%",
  },
  proofTitle: {
    width: "60%",
  },
  form: {
    width: "100%",
    fontFamily: "system-ui",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    "& > div": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
      "& > label": {
        marginBottom: 5,
      },
      "& > input, & > select": {
        padding: "10px 15px",
        border: "1px solid #ccc",
        borderRadius: 5,
        fontSize: 16,
        "&:focus": {
          outline: "none",
          borderColor: "#4d90fe",
          boxShadow: "0 0 5px #4d90fe",
        },
      },
      "& > span": {
        color: "red",
        fontSize: 12,
        marginTop: 5,
      },
    },
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4d90fe",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#357ae8",
    },
    alignSelf: "center",
    width: "15%",
  },
  katexEditorContainer: {
    height: "20vh",
  },
});
