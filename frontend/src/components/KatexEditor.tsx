import React, { useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { createUseStyles } from "react-jss";
import Katex from "./Katex";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  label: {
    htmlFor: string;
    text: string;
  };
  textAreaExtraProps: UseFormRegisterReturn;
  error?: boolean;
}

const KatexEditor: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [isPreviewModeActive, setIsPreviewModeActive] = React.useState(false);
  const { ref, ...restOfTextAreaProps } = props.textAreaExtraProps;
  const katexRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isPreviewModeActive) {
      katexRef.current?.focus();
    } else {
      textAreaRef.current?.focus();
    }
  }, [isPreviewModeActive]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value);
  };

  const togglePreview = () => {
    setIsPreviewModeActive((isActive) => !isActive);
  };

  return (
    <>
      <div className={classes.previewButtonContainer}>
        <label htmlFor={props.label.htmlFor}>{props.label.text}</label>

        <div
          title="You can use Ctrl+Enter to toggle preview mode"
          className={classes.previewCheckboxContainer}
          onClick={togglePreview}
        >
          <input
            type="checkbox"
            className={classes.previewCheckbox}
            checked={isPreviewModeActive}
            readOnly
          />
          <span className={classes.previewCheckboxText}>Preview</span>
        </div>
      </div>
      {isPreviewModeActive ? (
        <div ref={katexRef} className={classes.katexPreviewContainer}>
          <Katex text={props.value} />
        </div>
      ) : (
        <>
          <textarea
            ref={(e) => {
              textAreaRef.current = e;
              ref(e);
            }}
            {...restOfTextAreaProps}
            className={classes.textArea}
            onChange={handleChange}
            value={props.value}
          />
          {props.error && <span>This field is required</span>}
        </>
      )}
    </>
  );
};

const useStyles = createUseStyles({
  textArea: {
    width: "100%",
    height: "85%",
    backgroundColor: "#fff",
    fontFamily: "system-ui",
    fontSize: "1em",
  },
  previewButtonContainer: {
    height: "15%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: "1%",
  },
  previewButton: {
    fontSize: 16,
    cursor: "pointer",
    height: "3vh",
    width: "10%",
    backgroundColor: "#E0624D",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#EC9B7B",
      transform: "translateY(-2px)",
    },
  },
  katexPreviewContainer: {
    border: "1px solid #000",
    boxShadow: "0 0 5px rgba(0,0,0,0.5)",
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    padding: "1%",
    minHeight: "65%",
    overflowY: "auto",
  },

  previewCheckboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  },
  previewCheckbox: {
    cursor: "pointer",
    position: "relative",
    width: "1.2rem",
    height: "1.2rem",
    "&:before": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "1px solid #9e9e9e",
      borderRadius: "3px",
      boxSizing: "border-box",
      transition: "all 0.2s ease",
    },
    "&:hover:before": {
      borderColor: "#2196f3",
    },
    "&:checked:before": {
      background: "#2196f3",
      borderColor: "#2196f3",
    },
    "&:checked:after": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(45deg)",
      width: "0.5rem",
      height: "0.2rem",
      borderBottom: "2px solid white",
      borderRight: "2px solid white",
    },
  },
  previewCheckboxText: {
    fontSize: "1rem",
    color: "#444",
    userSelect: "none",
  },
});

export default KatexEditor;
