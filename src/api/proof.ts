import { proofs } from "proofs.mock";
import { Proof } from "types";

abstract class ProofApiBase {
	abstract getProof(id: string): Promise<Proof>;
}

export class ProofApi extends ProofApiBase {
	getProof(id: string): Promise<Proof> {
		// TODO Actually do fetch stuff
		return Promise.reject();
	}
}

export class MockProofApi extends ProofApiBase {
	getProof(id: string): Promise<Proof> {
		const foundProofs = proofs.filter((proof) => proof.id === id);
		if (foundProofs.length > 1)
			return Promise.reject("Found more than one proof with id: ${id}");
		if (foundProofs.length === 0)
			return Promise.reject(`Could not find proof with id: ${id}`);
		return Promise.resolve(foundProofs[0]);
	}
}
