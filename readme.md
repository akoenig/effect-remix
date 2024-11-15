# Effect with Remix / Remix with Effect

Abstraction layer which lets you use Effect within your Remix-based application.

## Installation

The package is hosted on JSR. You can install it via:

```sh
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
```

## Usage

For a simple usage example, check the /example directory in this repository.

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

You can create loaders using the `createLoader` function. Here's an example:

```ts
export const loader = createLoader(Effect.gen(function* () {
  // Remix Loader Function Arguments: https://remix.run/docs/en/main/route/loader#loader
  const { request, params } = yield* LoaderArguments;

  // ... use your services, perform some business logic.

  // ... return a response.
  return { hello: "world" } as const;
}));
```

In your view component, use Remix's `useLoaderData` hook to access the loader's result:

```tsx
export default function MyView() {
  const { hello } = useLoaderData<typeof loader>();

  return (
    <div>Hello {hello}</div>
  );
}
```

### `createAction`

To handle form submissions or other actions, use the `createAction` function:

```ts
export const action = createAction(Effect.gen(function* () {
  // Remix Action Function Arguments: https://remix.run/docs/en/main/route/action
  const { request, params } = yield* ActionArguments;

  // ... use your services, perform some business logic.

  // When successful, redirect somewhere else.
  return redirect("/");
}));
```

### Advanced Loaders with `matchLoader`

For more control over loader requests (e.g., handling different HTTP methods), use `matchLoader`:

```ts
const GET = createLoader(Effect.gen(function* () {
  // Remix Loader Function Arguments: https://remix.run/docs/en/main/route/loader#loader
  const { request, params } = yield* LoaderArguments;

  // ... use your services, perform some business logic.

  // ... return a response.
  return { hello: "world" } as const;
}));

export const loader = mountLoader({
  GET,
  // or HEAD
});
```

### Advanced Actions with `matchActions`

Similarly, you can define multiple actions using `matchActions`:

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
