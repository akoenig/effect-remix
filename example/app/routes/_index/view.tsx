import type { loader } from "./route";

import { Link, useLoaderData } from "@remix-run/react";

export function RandomNumberView() {
	const { productId } = useLoaderData<typeof loader>();

	return (
		<div className="container p-4">
			<h1 className="text-2xl">Current Random Number</h1>
			<p className="font-bold">{productId}</p>

			<h2 className="py-4 text-blue-500 font-bold">Some random links</h2>
			<ul>
				<li>
					<Link
						prefetch="intent"
						to={`/products/${productId}`}
						className="underline"
					>
						Some random Product
					</Link>
				</li>
			</ul>
		</div>
	);
}
