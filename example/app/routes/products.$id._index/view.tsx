import type { GET } from "./handlers/get.ts";

import { Form, useFetcher, useLoaderData } from "@remix-run/react";

export function ProductDetailView() {
	const { id } = useLoaderData<typeof GET>();
	const fetcher = useFetcher();

	const isSubmitting = fetcher.state === "submitting";

	return (
		<div className="container pt-10 flex flex-col gap-4">
			<h1 className="text-2xl">Product with ID: {id}</h1>

			<fetcher.Form method="POST">
				<input type="hidden" name="id" value={id} />

				<button
					type="submit"
					className="border rounded-xl py-1 px-4 border-blue-500 text-blue-500"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Buying ..." : "Buy"}
				</button>
			</fetcher.Form>
		</div>
	);
}
