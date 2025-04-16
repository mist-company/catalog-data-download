import type { Download } from "../../dto/download";
import type {
	BaseDownloadGateway,
	BaseDownloadGatewayGetInput,
} from "./base-download.gateway";

export class InMemoryDownloadGateway implements BaseDownloadGateway {
	downlodas: Map<string, Download> = new Map();

	async insert(input: Download): Promise<void> {
		this.downlodas.set(input.infoHash, input);
		await Promise.resolve();
	}

	async get(input: BaseDownloadGatewayGetInput): Promise<Download | null> {
		const download = this.downlodas.get(input.infoHash);
		return Promise.resolve(download ?? null);
	}

	async update(input: Download): Promise<void> {
		this.downlodas.set(input.infoHash, input);
		await Promise.resolve();
	}
}
