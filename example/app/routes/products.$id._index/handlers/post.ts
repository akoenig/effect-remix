import { createAction } from "app/effect.server";
import { Effect } from "effect";
import { ActionArguments } from "../../../../../src/mod";
import { redirect } from "@remix-run/react";

export const POST = createAction(
	Effect.gen(function* () {
		const { request } = yield* ActionArguments;

		const formData = yield* Effect.tryPromise(() => request.formData());

		const id = String(formData.get("id"));

		return redirect(`/products/${id}/success`);
	}),
);
