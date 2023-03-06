import { Proof, ProofType } from "./types";

export const proofs: Proof[] = [
	{
		title: "Closed Operation",
		type: ProofType.Definition,
		why: "",
		what: "\\text{Let }A\\text{ be a set, and }*\\text{ be an operation on }A\\text{. Then }*\\text{ is closed if for all }a,b \\in A\\text{, it is true that }a * b \\in A",
		id: "1.1.1",
	},
	{
		title: "Associative Operation",
		type: ProofType.Definition,
		why: "",
		what: "\\text{Let }A\\text{ be a set, and }*\\text{ be an operation on }A\\text{. Then }*\\text{ is associative if for all }a,b,c \\in A\\text{, it is true that }a * (b * c) = (a * b) * c",
		id: "1.1.2",
	},
	{
		title: "Commutative Operation",
		type: ProofType.Definition,
		why: "",
		what: "\\text{Let }A\\text{ be a set, and }*\\text{ be an operation on }A\\text{. Then }*\\text{ is commutative if for all }a,b \\in A\\text{, it is true that }a * b = b * a",
		id: "1.1.3",
	},
	{
		title: "Distribution",
		type: ProofType.Definition,
		why: "",
		what: "\\text{Let }A\\text{ be a set, and }*,\\&\\text{ be operations on }A\\text{, where }A\\text{ is closed under them. Then }*\\text{ is distributive over }\\&\\text{ if for all }a,b,c \\in A\\text{, it is true that }a * (b \\& c) = (a * b) \\& (a * c)",
		id: "1.1.4",
	},
	{
		title: "Neutral Element",
		type: ProofType.Definition,
		why: "",
		what: "\\text{Let }A\\text{ be a set, and }*\\text{ be an operation on }A\\text{. Then }*\\text{ is neutral if there exists an element }e \\in A\\text{ such that for all }a \\in A\\text{, it is true that }a * e = e * a = a.",
		id: "1.1.5",
	},
	{
		title: "",
		type: ProofType.Theorem,
		why: `\\text{Assume that }e,e' \\in A\\text{, and both are neutral elements for }*\\text{, then we'll see that necessarily }e=e'\\\\
            \\text{Due to }e\\text{ being neutral, }e * e' = e\\\\
            \\text{Due to }e'\\text{ being neutral, }e * e' = e\\\\
            \\text{Therefore, }e = e'
            `,
		what: "\\text{Let }*\\text{ be an operation on a set }A\\text{. }A\\text{ contains no more than one neutral element}",
		id: "1.1.6",
	},
	{
		title: "",
		type: ProofType.Corollary,
		what: "\\text{If }e \\in A\\text{ is a neutral element for }*\\text{, then }e\\text{ is unique for }*",
		id: "1.1.7",
		why: "",
	},
];
