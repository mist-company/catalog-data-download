import { container } from "tsyringe";
import { DatabaseTitleGateway } from "./gateway/title/database-title.gateway";
import { DatabaseTorrentGateway } from "./gateway/torrent/database-torrent.gateway";
import { QueueHelper } from "./helper/queue/queue.helper";
import { LoggerHelper } from "./helper/logger/logger.helper";
import {
	BaseLoggerHelper,
	LoggerHelperMeta,
} from "./helper/logger/base-logger.helper";
import { BaseQueueHelper } from "./helper/queue/base-queue.helper";
import { BaseTitleGateway } from "./gateway/title/base-title.gateway";
import { BaseTorrentGateway } from "./gateway/torrent/base-torrent.gateway";
import { DatabaseHelper } from "./helper/database.helper";
import { BaseTorrentClientGateway } from "./gateway/torrent-client/base-torrent-client.gateway";
import { HttpTorrentClientGateway } from "./gateway/torrent-client/http-torrent-client.gateway";
import { BaseDownloadGateway } from "./gateway/download/base-download.gateway";
import { DatabaseDownloadGateway } from "./gateway/download/database-download.gateway";

export const dependencies = container
	.register(LoggerHelperMeta, { useValue: {} })
	.register(DatabaseHelper, DatabaseHelper)
	.register(BaseQueueHelper, QueueHelper)
	.register(BaseLoggerHelper, LoggerHelper)
	.register(BaseTitleGateway, DatabaseTitleGateway)
	.register(BaseTorrentGateway, DatabaseTorrentGateway)
	.register(BaseTorrentClientGateway, HttpTorrentClientGateway)
	.register(BaseDownloadGateway, DatabaseDownloadGateway);
