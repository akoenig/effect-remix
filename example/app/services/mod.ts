import { Layer } from "effect";
import { RandomNumberService } from "./random-number-service";
import { DateService } from "./date-service";

export const Services = Layer.mergeAll(
	RandomNumberService.Default,
	DateService.Default,
);

export type Services = RandomNumberService | DateService;
