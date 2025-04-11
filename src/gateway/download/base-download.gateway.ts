import { Download } from '../../dto/download';

export type BaseDownloadGatewayGetInput = {
  infoHash: string;
};

export interface BaseDownloadGateway {
  insert(input: Download): Promise<void>;
  get(input: BaseDownloadGatewayGetInput): Promise<Download | null>;
  update(input: Download): Promise<void>;
}

export const BaseDownloadGateway = Symbol('BaseDownloadGateway');
