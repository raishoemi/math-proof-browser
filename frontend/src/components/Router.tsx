import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate,
} from "react-router-dom";
import ProofPage from "./ProofPage";
import SearchPage from "./SearchPage";
import AddProofPage from "./AddProofPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SearchPage />} />
      <Route path="proofs/:id" element={<ProofPage />} />
      <Route path="/proofs/create" element={<AddProofPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

export default router;
