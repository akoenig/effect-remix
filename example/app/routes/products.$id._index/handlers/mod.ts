import { matchActions, matchLoader } from "app/effect.server";
import { GET } from "./get";
import { POST } from "./post";

export const loader = matchLoader({
	GET,
});

export const action = matchActions({
	POST,
});
