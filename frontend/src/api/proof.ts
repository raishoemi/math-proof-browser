import { proofs } from "proofs.mock";
import { Proof } from "types";

const API_URL = "http://localhost:3001";

abstract class ProofApiBase {
  abstract getProof(id: string): Promise<Proof>;
  abstract searchProofs(query: string): Promise<Proof[]>;
}

export class ProofApi extends ProofApiBase {
  async getProof(id: string): Promise<Proof> {
    const response = await fetch(`${API_URL}/proofs/${id}`);
    if (response.status === 200) {
      const proof = await response.json();
      return Promise.resolve(proof);
    } else if (response.status === 404) {
      return Promise.reject("Proof not found");
    }
    return Promise.reject("Unknown error");
  }

  async searchProofs(query: string): Promise<Proof[]> {
    const response = await fetch(`${API_URL}/proofs?q=${query}`);
    if (response.status === 200) {
      const proofs = await response.json();
      return Promise.resolve(proofs);
    }
    return Promise.reject("Unknown error");
  }

  async createProof(proof: Proof): Promise<void> {
    const response = await fetch(`${API_URL}/proofs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (response.status !== 201) {
      return Promise.reject("Unknown error");
    }
  }

  async deleteProof(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/proofs/${id}`, {
      method: "DELETE",
    });
    if (response.status === 404) {
      return Promise.reject("Proof not found");
    } else if (response.status !== 200) {
      return Promise.reject("Unknown error");
    }
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
      proof.title.toLowerCase().includes(query.toLowerCase())
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve(foundProofs);
  }
}
