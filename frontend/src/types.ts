import { ProofType, CourseTag } from "shared-types";
export type Proof = {
  title: string;
  what: string;
  why: string;
  type: ProofType;
  id: string;
  courseTag: CourseTag;
};
