export type Proof = {
  title: string;
  what: string;
  why: string;
  type: ProofType;
  id: string;
  courseTag: CourseTag;
};

export enum ProofType {
  Theorem = "Theorem",
  Lemma = "Lemma",
  Definition = "Definition",
  Corollary = "Corollary",
  Axiom = "Axiom",
  Claim = "Claim",
}

export enum CourseTag {
  LinearAlgebra = "LinearAlgebra",
  Calculus = "Calculus",
}
