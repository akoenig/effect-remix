import { ManagedRuntime } from "effect";
import { Remix } from "@akoenig/effect-remix";
import { Services } from "./services/mod.ts";

const runtime = ManagedRuntime.make(Services);

export const { createLoader, createAction, matchActions, matchLoader } =
	Remix<Services>(runtime);
