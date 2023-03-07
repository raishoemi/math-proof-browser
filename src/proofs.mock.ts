import { Proof, ProofType } from "./types";

export const proofs: Proof[] = [
    {
        id: "1.1",
        type: ProofType.Definition,
        title: "Set",
        why: "",
        what: "\\text{A set is a collection of objects.}",
    },
    {
        id: "1.3",
        type: ProofType.Definition,
        title: "Natural Numbers",
        why: "",
        what: "\\text{The natural numbers (}\\natnums\\text{) are the set of all positive integers:}\\\\\\set{1,2,3,4,...}",
    },
    {
        id: "1.4",
        type: ProofType.Axiom,
        title: "Set Equality",
        why: "",
        what: "\\text{Let }A,B\\text{ be sets. Then }A=B\\iff \\forall a \\in A, a \\in B \\land \\forall b \\in B, b \\in A",
    },
    {
        id: "1.5",
        type: ProofType.Definition,
        title: "Empty Set",
        why: "",
        what: "\\text{The empty set (}\\emptyset\\text{) is the set with no elements.}",
    },
    {
        id: "1.6",
        type: ProofType.Definition,
        title: "Subset",
        why: "",
        what: "\\text{Let }A,B\\text{ be sets. Then }A\\subseteq B\\iff \\forall a \\in A, a \\in B",
    },
];
