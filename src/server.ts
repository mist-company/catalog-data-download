import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import express, { type Request, type Response } from 'express';
import { dependencies } from './dependencies';
import { CATALOG_DOWNLOAD_QUEUE_NAME } from './config';
import { Queue } from 'bullmq';
import { LoggerHelper } from './helper/logger/logger.helper';
import { ValidationError } from './errors/validation-error';
import { DownloadTitleUseCase } from './use-case/download-title.use-case';

const bullBoardExpressAdapter = new ExpressAdapter().setBasePath('/ui');

createBullBoard({
  queues: [
    new BullMQAdapter(
      new Queue(CATALOG_DOWNLOAD_QUEUE_NAME, {
        connection: { url: process.env.REDIS_URL },
      }),
    ),
  ],
  serverAdapter: bullBoardExpressAdapter,
});

const app = express();
app.use(express.json());
const logger = dependencies.resolve(LoggerHelper);
const downloadTitleUseCase = dependencies.resolve(DownloadTitleUseCase);

app.post('/api/download', async (req: Request, res: Response) => {
  try {
    const { infoHash } = req.body;
    if (!infoHash) {
      throw new ValidationError('infoHash is required');
    }
    await downloadTitleUseCase.execute({ infoHash });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    if (err instanceof ValidationError) {
      logger.info({ err }, 'validation error');
      return void res.status(400).json({ error: err.message });
    }
    logger.error({ err }, 'error fetching torrents');
    res.status(500).json({ error: 'internal Server Error' });
  }
});

app.use('/ui', bullBoardExpressAdapter.getRouter());

export default app;
