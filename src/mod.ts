import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { ManagedRuntime } from "effect";

import { Effect } from "effect";
import { Context, Layer } from "effect";

export class LoaderArguments extends Context.Tag(
	"@akoenig/effect-remix/LoaderArguments",
)<
	LoaderArguments,
	{
		readonly request: LoaderFunctionArgs["request"];
		readonly params: LoaderFunctionArgs["params"];
	}
>() {}

export class ActionArguments extends Context.Tag(
	"@akoenig/effect-remix/ActionArguments",
)<
	ActionArguments,
	{
		readonly request: ActionFunctionArgs["request"];
		readonly params: ActionFunctionArgs["params"];
	}
>() {}

export function Remix<R>(runtime: ManagedRuntime.ManagedRuntime<R, unknown>) {
	function createLoader<A, RF>(
		effect: Effect.Effect<A, RF, R | LoaderArguments>,
	) {
		return function loader(args: LoaderFunctionArgs) {
			const LoaderArgumentsLive = Layer.succeed(
				LoaderArguments,
				LoaderArguments.of(args),
			);

			const execute = effect.pipe(Effect.provide(LoaderArgumentsLive));

			return runtime.runPromise(execute);
		};
	}

	function createAction<A, RF>(
		effect: Effect.Effect<A, RF, R | ActionArguments>,
	) {
		return function action(args: ActionFunctionArgs) {
			const ActionArgumentsLive = Layer.succeed(
				ActionArguments,
				ActionArguments.of(args),
			);

			const execute = effect.pipe(Effect.provide(ActionArgumentsLive));

			return runtime.runPromise(execute);
		};
	}

	return { createLoader, createAction } as const;
}
