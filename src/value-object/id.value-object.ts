export class IdValueObject {
	readonly #id: string;
	readonly #season: string;
	readonly #episode: string;
	readonly #value: string;

	constructor(value: string) {
		this.#value = value.toLocaleLowerCase();
		const [id, season, episode] = this.#value.split(":");
		this.#id = id;
		this.#season = season ? season.padStart(2, "0") : season;
		this.#episode = episode ? episode.padStart(2, "0") : episode;
	}

	get id(): string {
		return this.#id;
	}

	get season(): string {
		return this.#season;
	}

	get episode(): string {
		return this.#episode;
	}

	get value(): string {
		return this.#value;
	}

	isEqual(other: IdValueObject): boolean {
		return this.#value === other.value;
	}

	isComposed(): boolean {
		return this.#season !== undefined && this.#episode !== undefined;
	}

	toJSON(): string {
		return this.#value;
	}

	toString(): string {
		return this.#value;
	}
}
