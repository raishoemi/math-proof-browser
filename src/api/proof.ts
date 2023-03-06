import { proofs } from "proofs.mock";
import { Proof } from "types";

abstract class ProofApiBase {
	abstract getProof(id: string): Promise<Proof>;
	abstract searchProofs(query: string): Promise<Proof[]>;
}

export class ProofApi extends ProofApiBase {
	getProof(id: string): Promise<Proof> {
		// TODO Actually do fetch stuff
		return Promise.reject();
	}

	searchProofs(query: string): Promise<Proof[]> {
		// TODO Actually do fetch stuff
		// Implement pagiation, prioriization (id equality > title equality > description equality)
		return Promise.reject();
	}
}

export class MockProofApi extends ProofApiBase {
	getProof(id: string): Promise<Proof> {
		const foundProofs = proofs.filter((proof) => proof.id === id);
		if (foundProofs.length > 1)
			return Promise.reject(`Found more than one proof with id: ${id}`);
		if (foundProofs.length === 0)
			return Promise.reject(`Could not find proof with id: ${id}`);
		return Promise.resolve(foundProofs[0]);
	}

	async searchProofs(query: string): Promise<Proof[]> {
		const foundProofs = proofs.filter((proof) =>
			proof.title.toLowerCase().includes(query.toLowerCase()),
		);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		return Promise.resolve(foundProofs);
	}
}
