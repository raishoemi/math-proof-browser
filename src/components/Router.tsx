import {
	createRoutesFromElements,
	createBrowserRouter,
	Route,
	Navigate,
} from "react-router-dom";
import ProofPage from "./ProofPage";
import SearchPage from "./SearchPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<SearchPage />} />
			<Route path="proof/:id" element={<ProofPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</>,
	),
);

export default router;
