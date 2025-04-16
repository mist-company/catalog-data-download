import { container } from "tsyringe";
import { InMemoryTorrentGateway } from "../gateway/torrent/in-memory-torrent.gateway";
import { InMemoryTitleGateway } from "../gateway/title/in-memory-title.gateway";
import { BaseLoggerHelper } from "../helper/logger/base-logger.helper";
import { BaseTitleGateway } from "../gateway/title/base-title.gateway";
import { BaseTorrentGateway } from "../gateway/torrent/base-torrent.gateway";
import { DownloadTitleUseCase } from "./download-title.use-case";
import { BaseTorrentClientGateway } from "../gateway/torrent-client/base-torrent-client.gateway";
import { InMemoryTorrentClientGateway } from "../gateway/torrent-client/in-memory-torrent-client.gateway";
import { BaseDownloadGateway } from "../gateway/download/base-download.gateway";
import { InMemoryDownloadGateway } from "../gateway/download/in-memory-download.gateway";

function makeSut() {
	const logger = { child: jest.fn(), debug: jest.fn(), info: jest.fn() };
	logger.child.mockReturnValue({ ...logger });
	const titleGateway = new InMemoryTitleGateway();
	const torrentGateway = new InMemoryTorrentGateway();
	const torrentClientGateway = new InMemoryTorrentClientGateway();
	const downloadGateway = new InMemoryDownloadGateway();
	const sut = container
		.register(BaseLoggerHelper, { useValue: logger })
		.register(BaseTitleGateway, { useValue: titleGateway })
		.register(BaseTorrentGateway, { useValue: torrentGateway })
		.register(BaseTorrentClientGateway, { useValue: torrentClientGateway })
		.register(BaseDownloadGateway, { useValue: downloadGateway })
		.resolve(DownloadTitleUseCase);
	return {
		sut,
		logger,
		titleGateway,
		torrentGateway,
		torrentClientGateway,
		downloadGateway,
	};
}

describe("DownloadTitleUseCase", () => {
	it("is defined", () => {
		const { sut } = makeSut();
		expect(sut).toBeDefined();
	});
});
