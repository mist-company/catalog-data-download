import type { Title } from "../../dto/title";
import type { IdValueObject } from "../../value-object/id.value-object";

export type BaseTitleGatewayGetInput = {
	imdbId: IdValueObject;
};

export interface BaseTitleGateway {
	get(input: BaseTitleGatewayGetInput): Promise<Title | null>;
}

export const BaseTitleGateway = Symbol.for("BaseTitleGateway");
