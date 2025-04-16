import { BaseTorrentGateway } from "../gateway/torrent/base-torrent.gateway";
import { BaseTitleGateway } from "../gateway/title/base-title.gateway";
import { inject, injectable } from "tsyringe";
import { BaseLoggerHelper } from "../helper/logger/base-logger.helper";
import { DownloadStatus } from "../dto/download";
import { BaseTorrentClientGateway } from "../gateway/torrent-client/base-torrent-client.gateway";
import { BaseDownloadGateway } from "../gateway/download/base-download.gateway";

export type DownloadTitleUseCaseInput = {
	infoHash: string;
};

@injectable()
export class DownloadTitleUseCase {
	readonly #logger: BaseLoggerHelper;
	readonly #titleGateway: BaseTitleGateway;
	readonly #torrentGateway: BaseTorrentGateway;
	readonly #torrentClientGateway: BaseTorrentClientGateway;
	readonly #downloadGateway: BaseDownloadGateway;

	constructor(
		@inject(BaseLoggerHelper) logger: BaseLoggerHelper,
		@inject(BaseTitleGateway) titleGateway: BaseTitleGateway,
		@inject(BaseTorrentGateway) torrentGateway: BaseTorrentGateway,
		@inject(BaseTorrentClientGateway)
		torrentClientGateway: BaseTorrentClientGateway,
		@inject(BaseDownloadGateway) downloadGateway: BaseDownloadGateway,
	) {
		this.#titleGateway = titleGateway;
		this.#torrentGateway = torrentGateway;
		this.#torrentClientGateway = torrentClientGateway;
		this.#downloadGateway = downloadGateway;
		this.#logger = logger.child({ component: DownloadTitleUseCase.name });
	}

	async execute(input: DownloadTitleUseCaseInput): Promise<void> {
		const download = await this.#downloadGateway.get({
			infoHash: input.infoHash,
		});
		if (download) {
			this.#logger.info({ input }, "download already exists");
			const { path, status } = await this.#torrentClientGateway.get(
				input.infoHash,
			);
			await this.#downloadGateway.update({ ...download, path, status });
			this.#logger.info(
				{ input, path, status },
				"download already exists, updated",
			);
			return;
		}
		await this.#createDownload(input);
	}

	async #createDownload(input: DownloadTitleUseCaseInput): Promise<void> {
		const { infoHash } = input;
		const torrent = await this.#torrentGateway.get({ infoHash });
		const { imdbId } = torrent;
		const title = await this.#titleGateway.get({ imdbId });
		if (!title) {
			this.#logger.info({ imdbId }, "title not found");
			return;
		}
		await this.#downloadGateway.insert({
			imdbId,
			title: torrent.title,
			infoHash: torrent.infoHash,
			magnetUri: torrent.magnetUri,
			quality: "unknown",
			status: DownloadStatus.PENDING,
		});
		this.#logger.info({ imdbId, infoHash }, "torrent enqueued to download");
	}
}
