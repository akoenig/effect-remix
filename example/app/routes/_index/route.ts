import { Effect } from "effect";
import { createLoader } from "../../effect.server.ts";
import { LoaderArguments } from "../../../../src/mod.ts";
import { RandomNumberService } from "app/services/random-number-service";

export const loader = createLoader(
	Effect.gen(function* () {
		const { request } = yield* LoaderArguments;
		const randomNumberService = yield* RandomNumberService;

		return { currentNumber: yield* randomNumberService.next() };
	}),
);

export { RandomNumberView as default } from "./view.tsx";
