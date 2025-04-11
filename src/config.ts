export const DB_URL = process.env.DB_URL;
export const DB_NAME = process.env.DB_NAME ?? 'catalog-local';
export const REDIS_URL = process.env.REDIS_URL;
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
export const PORT = process.env.PORT ?? 3000;
export const CHECK_DOWNLOADS_JOB_NAME = process.env.CHECK_DOWNLOADS_JOB_NAME ?? 'check-downloads-job-local';
export const CATALOG_DOWNLOAD_QUEUE_NAME = process.env.CATALOG_DOWNLOAD_QUEUE_NAME ?? 'catalog-download-queue-local';
export const WORKER_CONCURRENCY = parseInt(process.env.WORKER_CONCURRENCY ?? '1', 10);
