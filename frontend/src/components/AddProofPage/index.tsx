import { useState } from "react";
import KatexEditor from "components/KatexEditor";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { CourseTag, ProofType } from "types";
import { proofApi } from "api";
import { useNavigate } from "react-router-dom";

const AddNewProofPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [whyValue, setWhyValue] = useState("");
  const [whatValue, setWhatValue] = useState("");

  const onSubmit = (data: any) => {
    proofApi.createProof(data).then(() => navigate("/"));
  };

  // TODO: Make it so what/why take up most of the screen. ID/course/type should all be in the same row
  // TODO: Style textareas like the other inputs (boder, onFocus, etc.)

  return (
    <div className={classes.pageContainer}>
      <h1 className={classes.pageTitle}>Add Proof</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            className={classes.proofID}
            type="text"
            {...register("id", { required: true })}
          />
          {errors.id && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="courseTag">Course Tag</label>
          <select
            className={classes.courseTag}
            {...register("courseTag", { required: true })}
          >
            <option value=""></option>
            {Object.values(CourseTag).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.courseTag && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <select
            className={classes.proofType}
            {...register("type", { required: true })}
          >
            <option value=""></option>
            {Object.values(ProofType).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.type && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={classes.proofTitle}
            {...register("title")}
          />
        </div>

        <div className={classes.katexEditorContainer}>
          <KatexEditor
            value={whatValue}
            onChange={(newValue) => setWhatValue(newValue)}
            label={{ htmlFor: "what", text: "What" }}
            textAreaExtraProps={register("what", { required: true })}
          />
        </div>
        <div className={classes.katexEditorContainer}>
          <KatexEditor
            value={whyValue}
            onChange={(newValue) => setWhyValue(newValue)}
            label={{ htmlFor: "why", text: "Why" }}
            textAreaExtraProps={register("why")}
          />
        </div>

        <button className={classes.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const useStyles = createUseStyles({
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
    "& > button": {
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
    },
  },
  submitButton: {
    alignSelf: "center",
    width: "15%",
  },
  katexEditorContainer: {
    height: "20vh",
  },
});

export default AddNewProofPage;
