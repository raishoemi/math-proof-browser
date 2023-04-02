import { useEffect, useState } from "react";
import KatexEditor from "components/KatexEditor";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { CourseTag, Proof, ProofType } from "types";
import { proofApi } from "api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

// TODO: Make it so what/why take up most of the screen. ID/course/type should all be in the same row
// TODO: Style textareas like the other inputs (boder, onFocus, etc.)

/**
 * This component supports adding a new proof or editing an existing proof.
 * If the URL contains a query parameter "id", then the component will
 * load the proof with that ID and prefill the form with the proof's data.
 * Otherwise, the component will create a new proof.
 */
const AddNewProofPage = () => {
  const classes = useStyles();
  const [searchParams, _] = useSearchParams();
  const [existingProof, setExistingProof] = useState<Proof | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const existingProofID = searchParams.get("id");

  useEffect(() => {
    if (existingProofID) {
      proofApi
        .getProof(existingProofID)
        .then((proof) => {
          setExistingProof(proof);
        })
        .catch((err) => {
          toast(err, {
            type: "error",
          });
        });
    }
  }, []);

  useEffect(() => {
    if (existingProof !== null) {
      setValue("id", existingProof.id);
      setValue("courseTag", existingProof.courseTag);
      setValue("type", existingProof.type);
      setValue("title", existingProof.title);
      setValue("what", existingProof.what);
      setValue("why", existingProof.why);
      setWhatValue(existingProof.what);
      setWhyValue(existingProof.why);
    }
  }, [existingProof]);

  const [whyValue, setWhyValue] = useState("");
  const [whatValue, setWhatValue] = useState("");

  const onSubmit = (data: any) => {
    if (existingProofID) {
      proofApi
        .updateProof(data)
        .then(() => {
          navigate(`/proofs/${existingProofID}`);
        })
        .catch((err) => {
          toast(err, {
            type: "error",
          });
        });
    } else {
      proofApi
        .createProof(data)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          toast(err, {
            type: "error",
          });
        });
    }
  };

  if (existingProofID && !existingProof) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.pageContainer}>
      <h1 className={classes.pageTitle}>
        {existingProofID ? "Edit" : "Add"} Proof
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            disabled={!!existingProofID}
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
            error={!!errors.what}
          />
        </div>
        <div className={classes.katexEditorContainer}>
          <KatexEditor
            value={whyValue}
            onChange={(newValue) => setWhyValue(newValue)}
            label={{ htmlFor: "why", text: "Why" }}
            textAreaExtraProps={register("why")}
            error={!!errors.why}
          />
        </div>

        <div>
          <button className={classes.submitButton} type="submit">
            {existingProof === null ? "Submit" : "Update"}
          </button>
        </div>
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

export default AddNewProofPage;
