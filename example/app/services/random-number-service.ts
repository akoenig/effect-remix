import { Effect } from "effect";

export class RandomNumberService extends Effect.Service<RandomNumberService>()(
	"RandomNumberService",
	{
		effect: Effect.gen(function* () {
			return {
				next() {
					return Effect.succeed(Math.floor(Math.random() * 1000));
				},
			} as const;
		}),
	},
) {}
