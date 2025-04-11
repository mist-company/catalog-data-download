import { DownloadStatus } from '../../dto/download';
import { BaseTorrentClientGateway, BaseTorrentClientGatewayGetOutput } from './base-torrent-client.gateway';

export class HttpTorrentClientGateway implements BaseTorrentClientGateway {
  readonly #baseUrl: string;
  #cookie: string | null;

  constructor() {
    this.#baseUrl = 'http://utils-qbittorrent-100-125-241-117.traefik.me/api/v2';
  }

  async add(magnetUri: string): Promise<void> {
    await this.#authenticate();
    const res = await fetch(`${this.#baseUrl}/torrents/add`, {
      method: 'POST',
      body: `urls=${magnetUri}`,
      headers: { cookie: this.#cookie, 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!res.ok) throw new Error(`Failed to add torrent: ${res.statusText}`);
  }

  async get(infoHash: string): Promise<BaseTorrentClientGatewayGetOutput> {
    await this.#authenticate();
    const res = await fetch(`${this.#baseUrl}/torrents/info?hashes=${infoHash}`, {
      method: 'GET',
      headers: { cookie: this.#cookie },
    });
    if (!res.ok) throw new Error(`Failed to get torrent: ${res.statusText}`);
    const [torrent] = (await res.json()) as Array<{ content_path: string; state: string }>;
    return torrent
      ? {
          status: this.#mapStatus(torrent.state),
          path: torrent['content_path'],
        }
      : null;
  }

  #mapStatus(status: string): DownloadStatus {
    const statusMap: Record<string, DownloadStatus> = {
      downloading: DownloadStatus.IN_PROGRESS,
      metaDL: DownloadStatus.IN_PROGRESS,
      forcedDL: DownloadStatus.IN_PROGRESS,
      queuedDL: DownloadStatus.IN_PROGRESS,
      stalledDL: DownloadStatus.IN_PROGRESS,
      checkingDL: DownloadStatus.IN_PROGRESS,
      allocating: DownloadStatus.IN_PROGRESS,
      uploading: DownloadStatus.COMPLETED,
      pausedUP: DownloadStatus.COMPLETED,
      queuedUP: DownloadStatus.COMPLETED,
      stalledUP: DownloadStatus.COMPLETED,
      checkingUP: DownloadStatus.COMPLETED,
      forcedUP: DownloadStatus.COMPLETED,
      pausedDL: DownloadStatus.PAUSED,
      error: DownloadStatus.FAILED,
      missingFiles: DownloadStatus.FAILED,
      checkingResumeData: DownloadStatus.PENDING,
      moving: DownloadStatus.PENDING,
      unknown: DownloadStatus.PENDING,
    };
    return statusMap[status] ?? DownloadStatus.PENDING;
  }

  async #authenticate(): Promise<void> {
    if (!this.#cookie) {
      await this.#getCookie();
    }
  }

  async #getCookie(): Promise<void> {
    const res = await fetch(`${this.#baseUrl}/auth/login`, {
      method: 'POST',
      body: 'username=admin&password=3kD2xv7wK',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const cookie = res.headers.get('set-cookie');
    if (!cookie) throw new Error('Failed to get cookie');
    this.#cookie = cookie;
  }
}
