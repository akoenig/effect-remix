import { ManagedRuntime } from "effect";
import { Remix } from "../../src/mod.ts";
import { Services } from "./services/mod.ts";

const runtime = ManagedRuntime.make(Services);

export const { createLoader, createAction, matchActions, matchLoader } =
	Remix<Services>(runtime);
