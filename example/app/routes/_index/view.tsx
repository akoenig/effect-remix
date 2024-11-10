import type { loader } from "./route";

import { useLoaderData } from "@remix-run/react";

export function RandomNumberView() {
	const { currentNumber } = useLoaderData<typeof loader>();

	return (
		<div className="container p-4">
			<h1 className="text-2xl">Current Random Number</h1>
			<p className="font-bold">{currentNumber}</p>
		</div>
	);
}
