import { createLoader } from "app/effect.server";
import { Effect } from "effect";
import { LoaderArguments } from "../../../../../src/mod";

export const GET = createLoader(
	Effect.gen(function* () {
		const { params } = yield* LoaderArguments;

		const id = String(params.id);

		if (!id) {
			return yield* Effect.fail(new Response("Bad Request", { status: 400 }));
		}

		return {
			id,
		} as const;
	}),
);
