import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { ManagedRuntime } from "effect";

import { Effect, Match } from "effect";
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

type LoaderVerb = "HEAD" | "GET";
type ActionVerb = "POST" | "PUT" | "DELETE";

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

	function matchLoader(
		handler: Partial<Record<LoaderVerb, ReturnType<typeof createLoader>>>,
	) {
		return (args: LoaderFunctionArgs) => {
			const verb = args.request.method as LoaderVerb;

			const match = Match.type<LoaderVerb>().pipe(
				Match.when("HEAD", () => handler.HEAD),
				Match.when("GET", () => handler.GET),
				Match.exhaustive,
			);

			const loader = match(verb);

			if (!loader) {
				throw new Response("Method not Allowed", { status: 405 });
			}

			return loader(args);
		};
	}

	function matchActions(
		actions: Partial<Record<ActionVerb, ReturnType<typeof createAction>>>,
	) {
		return (args: ActionFunctionArgs) => {
			const verb = args.request.method as ActionVerb;

			const match = Match.type<ActionVerb>().pipe(
				Match.when("POST", () => actions.POST),
				Match.when("PUT", () => actions.PUT),
				Match.when("DELETE", () => actions.DELETE),
				Match.exhaustive,
			);

			const action = match(verb);

			if (!action) {
				throw new Response("Method Not Allowed", { status: 405 });
			}

			return action(args);
		};
	}

	return {
		createLoader,
		createAction,
		matchLoader,
		matchActions,
	} as const;
}
