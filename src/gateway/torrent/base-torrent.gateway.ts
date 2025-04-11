import type { Torrent } from '../../dto/torrent';
import { IdValueObject } from '../../value-object/id.value-object';

export type BaseTorrentGatewayUpdateOptions = {
  upsert?: boolean;
};

export type BaseTorrentGatewayGetInput = {
  infoHash: string;
};

export type BaseTorrentGatewayListInput = {
  imdbId?: IdValueObject;
  infoHash?: string;
};

export interface BaseTorrentGateway {
  get(input: BaseTorrentGatewayGetInput): Promise<Torrent>;
  update(torrent: Torrent, options?: BaseTorrentGatewayUpdateOptions): Promise<void>;
  list(input: BaseTorrentGatewayListInput): Promise<Torrent[]>;
}

export const BaseTorrentGateway = Symbol('BaseTorrentGateway');
