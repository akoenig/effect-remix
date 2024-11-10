# Effect with Remix / Remix with Effect

Abstraction layer which lets you use Effect within your Remix-based application.

## Installation

The package is hosted on JSR. You can install it via:

# pnpm
pnpm dlx jsr add @akoenig/effect-remix

# Deno
deno add jsr:@akoenig/effect-remix

# bun
bunx jsr add @akoenig/effect-remix

# npm
npx jsr add @akoenig/effect-remix

# yarn
yarn dlx jsr add @akoenig/effect-remix

## Usage

You can find a simple usage example under `/example` in this repository.

First of all you have to initialize this layer by passing your application-specific layers. Create the file `~/app/effect.server.ts` within your Remix app and place the following content:

```ts
import { Remix } from "@akoenig/effect-remix";

import { ManagedRuntime } from "effect";

// Your services / requirements
import { Services } from "./services/mod.ts";

// Create a managed runtime ...
const runtime = ManagedRuntime.make(Services);

// ... and pass it to the initializer function.
export const { createLoader, createAction, matchActions, matchLoader } =
	Remix<Services>(runtime);
```

Afterwards, you can use the exported functions within your routes.

### `createLoader`

```ts
export const loader = createLoader(Effect.gen(function* () {
  // Remix Loader Function Arguments: https://remix.run/docs/en/main/route/loader#loader
  const { request, params } = yield* LoaderArguments;

  // ... use your services, perform some business logic.

  // ... return a response.
  return { hello: "world" } as const;
}));
```

Now, you can use the result within your view component via Remix's `useLoaderData` hook, like:

```ts
export default function MyView() {
  const { hello } = useLoaderData<typeof loader>();

  return (
    <div>Hello {hello}</div>
  );
}
```

### `createAction`

```ts
export const action = createAction(Effect.gen(function* () {
  // Remix Action Function Arguments: https://remix.run/docs/en/main/route/action
  const { request, params } = yield* ActionArguments;

  // ... use your services, perform some business logic.

  // When successful, redirect somewhere else.
  return redirect("/");
}));
```

### `matchLoader`

Sometimes you want to have a more fine-grained control over the loader request. For example, you want to behave differently on certain HTTP methods. In the context of the loader, there are two possible HTTP methods: `HEAD` and `GET`.

```ts
const GET = createLoader(Effect.gen(function* () {
  // Remix Loader Function Arguments: https://remix.run/docs/en/main/route/loader#loader
  const { request, params } = yield* LoaderArguments;

  // ... use your services, perform some business logic.

  // ... return a response.
  return { hello: "world" } as const;
}));

export const loader = mountLoader({
  GET
});
```

### `matchActions`

Same goes for action requests.

```ts
export const POST = createAction(Effect.gen(function* () {
  // Handle the POST request...
}));

export const PUT = createAction(Effect.gen(function* () {
  // Handle the PUT request...
}));

export const action = matchActions({
  POST,
  PUT
});
```
