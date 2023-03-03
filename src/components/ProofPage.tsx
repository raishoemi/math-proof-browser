import React from "react";
import { useParams } from "react-router-dom";

const ProofPage: React.FC = () => {
    const { id } = useParams();
	return <div>proof page: {id}</div>;
};

export default ProofPage;
