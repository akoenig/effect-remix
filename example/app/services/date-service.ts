import { Effect } from "effect";

export class DateService extends Effect.Service<DateService>()("DateService", {
	effect: Effect.gen(function* () {
		return {
			unixtime() {
				return Effect.succeed(Date.now() / 1000);
			},
		} as const;
	}),
}) {}
