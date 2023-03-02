import { Proof, ProofType } from "./types";

export const proofs: Proof[] = [
    {
        type: ProofType.Definition,
        why: "Let $A$ be a set, and $*$ be an operation on $A$. Then $*$  is closed if for all $a,b \\in A$, it is true that $a * b \\in A$.",
        what: "Closed Opeartion",
        id: "1.1.1",
    },
    {
        type: ProofType.Definition,
        why: "Let $A$ be a set, and $*$ be an operation on $A$. Then $*$ is associative if for all $a,b,c \\in A$, it is true that $a * (b * c) = (a * b) * c$.",
        what: "Associative Operation",
        id: "1.1.2",
    },
    {
        type: ProofType.Definition,
        why: "Let $A$ be a set, and $*$ be an operation on $A$. Then $*$ is commutative if for all $a,b \\in A$, $a * b = b * a$.",
        what: "Commutative Operation",
        id: "1.1.3",
    },
    {
        type: ProofType.Definition,
        why: "Let $A$ be a set, and $*,\\&$ be operations on $A$, where $A$ is closed under them. Then $*$ is distributive over $\\&$ if for all $a,b,c \\in A$, it is true that $a * (b \\& c) = (a * b) \\& (a * c)$.",
        what: "Distribution",
        id: "1.1.4",
    },
    {
        type: ProofType.Definition,
        why: "Let $A$ be a set, and $*$ be an operation on $A$. Then $*$ is neutral if there exists an element $e \\in A$ such that for all $a \\in A$, $a * e = e * a = a$.",
        what: "Neutral Element",
        id: "1.1.5",
    },
    {
        type: ProofType.Theorem,
        why: "Let $*$ be an operation on a set $A$. $A$ contains no more than one neutral element.",
        what: "",
        id: "1.1.6",
    },
    {
        type: ProofType.Corollary,
        what: "",
        id: "1.1.7",
        why: "If $e \\in A$ is a neutral element for $*$, then $e$ is unique for $*$."
    }
];
