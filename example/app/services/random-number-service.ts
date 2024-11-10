import { Effect } from "effect";

export class RandomNumberService extends Effect.Service<RandomNumberService>()(
	"RandomNumberService",
	{
		effect: Effect.gen(function* () {
			return {
				next() {
					return Effect.succeed(Math.random());
				},
			} as const;
		}),
	},
) {}
