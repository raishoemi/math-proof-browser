export type Proof = {
	title: string;
	what: string;
	why: string;
	type: ProofType;
	id: string; // TODO: Can this type be more specific than string? It's a sematic version number.
};

export enum ProofType {
	Theorem = "Theorem",
	Lemma = "Lemma",
	Definition = "Definition",
	Corollary = "Corollary",
}
