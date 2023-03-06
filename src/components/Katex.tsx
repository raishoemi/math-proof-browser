import React from "react";
import katex from "katex";

interface Props {
    text: string;
}

const Katex: React.FC<Props> = ({ text }) => {
	return (
		<span
			dangerouslySetInnerHTML={{
				__html: katex.renderToString(text, {
					displayMode: false,
					throwOnError: false,
					trust: true,
				}),
			}}
		/>
	);
};

export default Katex;
