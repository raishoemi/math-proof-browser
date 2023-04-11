import { useEffect, useState } from "react";
import KatexEditor from "components/KatexEditor";
import { useForm } from "react-hook-form";
import { CourseTag, Proof } from "types";
import { ProofType } from "shared-types";
import { proofApi } from "api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStyles } from "./styles";

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
  const [whyValue, setWhyValue] = useState("");
  const [whatValue, setWhatValue] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const existingProofID = searchParams.get("id");

  const handleError = (error: any) => toast(error, { type: "error" });

  useEffect(() => {
    if (existingProofID) {
      proofApi
        .getProof(existingProofID)
        .then((proof) => {
          setExistingProof(proof);
        })
        .catch(handleError);
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

  const onSubmit = (data: any) => {
    if (existingProofID) {
      proofApi
        .updateProof(data)
        .then(() => {
          navigate(`/proofs/${existingProofID}`);
        })
        .catch(handleError);
    } else {
      proofApi
        .createProof(data)
        .then(() => {
          navigate("/");
        })
        .catch(handleError);
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

export default AddNewProofPage;
