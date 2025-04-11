import { inject, injectable, singleton } from 'tsyringe';
import { Download } from '../../dto/download';
import { DatabaseHelper } from '../../helper/database.helper';
import { BaseDownloadGateway, BaseDownloadGatewayGetInput } from './base-download.gateway';

@injectable()
@singleton()
export class DatabaseDownloadGateway implements BaseDownloadGateway {
  readonly #database: DatabaseHelper;

  constructor(@inject(DatabaseHelper) database: DatabaseHelper) {
    this.#database = database;
  }

  async insert(download: Download): Promise<void> {
    const collection = await this.#database.getCollection('downloads');
    await collection.insertOne({ ...download, imdbId: download.imdbId.value });
  }

  async get({ infoHash }: BaseDownloadGatewayGetInput): Promise<Download | null> {
    const collection = await this.#database.getCollection('downloads');
    const download = await collection.findOne<Download>({ infoHash });
    return download ?? null;
  }

  async update(download: Download): Promise<void> {
    const collection = await this.#database.getCollection('downloads');
    await collection.updateOne({ infoHash: download.infoHash }, { $set: { ...download } });
  }
}
