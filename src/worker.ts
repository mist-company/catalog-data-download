import { Job, Worker } from 'bullmq';
import { CATALOG_DOWNLOAD_QUEUE_NAME, WORKER_CONCURRENCY } from './config';
import { dependencies } from './dependencies';
import { LoggerHelper } from './helper/logger/logger.helper';

const logger = dependencies.resolve(LoggerHelper);

export const worker = new Worker(
  CATALOG_DOWNLOAD_QUEUE_NAME,
  async (job: Job) => {
    logger.error(`unknown job name: ${job.name}`);
  },
  {
    autorun: false,
    concurrency: WORKER_CONCURRENCY,
    connection: { url: process.env.REDIS_URL },
  },
);
