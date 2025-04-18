import "reflect-metadata";
import type { Job } from "bullmq";
import { PORT, WORKER_CONCURRENCY } from "./config";
import { worker } from "./worker";
import server from "./server";
import { dependencies } from "./dependencies";
import { LoggerHelper } from "./helper/logger/logger.helper";

(async () => {
	const logger = dependencies.resolve(LoggerHelper);
	server.listen(PORT, () => {
		logger.info(`server listening on port ${PORT}`);
		logger.info(`UI available at http://localhost:${PORT}/ui`);
		logger.info(`API available at http://localhost:${PORT}/api`);
	});
	await worker
		.on("ready", () =>
			logger.info(`waiting for jobs - concurrency:${WORKER_CONCURRENCY}`),
		)
		.on("failed", (job: Job, err: Error) =>
			logger.error(err, `job ${job.name} failed: ${err.message}`),
		)
		.run();
})();
