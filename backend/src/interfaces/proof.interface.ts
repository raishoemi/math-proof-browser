export interface Proof {
  id: string;
  type: ProofType;
  title: string;
  what: string;
  why: string;
}

export enum ProofType {
  Theorem = 'Theorem',
  Lemma = 'Lemma',
  Definition = 'Definition',
  Corollary = 'Corollary',
  Axiom = 'Axiom',
}
