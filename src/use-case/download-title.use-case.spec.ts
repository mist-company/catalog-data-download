import { container } from 'tsyringe';
import { InMemoryTorrentGateway } from '../gateway/torrent/in-memory-torrent.gateway';
import { InMemoryTitleGateway } from '../gateway/title/in-memory-title.gateway';
import { BaseLoggerHelper } from '../helper/logger/base-logger.helper';
import { BaseTitleGateway } from '../gateway/title/base-title.gateway';
import { BaseTorrentGateway } from '../gateway/torrent/base-torrent.gateway';
import { DownloadTitleUseCase } from './download-title.use-case';
import { BaseTorrentClientGateway } from '../gateway/torrent-client/base-torrent-client.gateway';
import { InMemoryTorrentClientGateway } from '../gateway/torrent-client/in-memory-torrent-client.gateway';
import { BaseDownloadGateway } from '../gateway/download/base-download.gateway';
import { InMemoryDownloadGateway } from '../gateway/download/in-memory-download.gateway';

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
  return { sut, logger, titleGateway, torrentGateway, torrentClientGateway, downloadGateway };
}

describe('DownloadTitleUseCase', () => {
  it('is defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  // it('calls titleGateway.get with the correct params', async () => {
  //   const titleGatewayGetSpy = jest.spyOn(InMemoryTitleGateway.prototype, 'get');
  //   const { sut } = makeSut();
  //   const movieId = new IdValueObject('tt0000000');
  //   const tvSeriesId = new IdValueObject('tt0000001:1:1');
  //   await sut.execute({ imdbId: 'tt0000000' });
  //   expect(titleGatewayGetSpy).toHaveBeenCalledWith({ imdbId: movieId });
  //   await sut.execute({ imdbId: 'tt0000001:1:1' });
  //   expect(titleGatewayGetSpy).toHaveBeenCalledWith({ imdbId: tvSeriesId });
  // });

  // it('returns an empty array if title is not found', async () => {
  //   const { sut } = makeSut();
  //   const result = await sut.execute({ imdbId: 'tt0000000' });
  //   expect(result).toEqual([]);
  // });

  // it('returns an empty array if no torrents are found', async () => {
  //   jest.spyOn(InMemoryTorrentGateway.prototype, 'search').mockResolvedValueOnce([]);
  //   const { sut, titleGateway } = makeSut();
  //   const titleId = new IdValueObject('tt0000000');
  //   titleGateway.insert({
  //     _id: titleId,
  //     titleType: 'movie',
  //     primaryTitle: 'Some Movie',
  //     originalTitle: 'Some Movie',
  //     startYear: 2015,
  //   } as Title);
  //   const result = await sut.execute({ imdbId: 'tt0000000' });
  //   expect(result).toEqual([]);
  // });

  // it('calls searchableTorrentGateway.search with the correct params for movies', async () => {
  //   const torrentGatewaySearchSpy = jest.spyOn(InMemoryTorrentGateway.prototype, 'search');
  //   const { sut, titleGateway } = makeSut();
  //   const titleId = new IdValueObject('tt0000000');
  //   titleGateway.insert({
  //     _id: titleId,
  //     titleType: 'movie',
  //     primaryTitle: 'Some Movie',
  //     originalTitle: 'Some Movie',
  //     startYear: 2015,
  //   } as Title);
  //   await sut.execute({ imdbId: 'tt0000000' });
  //   expect(torrentGatewaySearchSpy).toHaveBeenCalledWith('Some Movie 2015', 'MOVIE');
  // });

  // it('calls searchableTorrentGateway.search with the correct params for tv series', async () => {
  //   const torrentGatewaySearchSpy = jest.spyOn(InMemoryTorrentGateway.prototype, 'search');
  //   const { sut, titleGateway } = makeSut();
  //   const title = {
  //     _id: new IdValueObject('tt0000000:1:1'),
  //     titleType: 'tvSeries',
  //     primaryTitle: 'Some TV Series',
  //     originalTitle: 'Some TV Series',
  //     startYear: 2015,
  //   } as Title;
  //   titleGateway.insert(title);
  //   await sut.execute({ imdbId: 'tt0000000:1:1' });
  //   expect(torrentGatewaySearchSpy.mock.calls).toEqual(
  //     TorrentHelper.buildQueriesFromTitle(title, title).map((query) => [query, 'TV_SERIES']),
  //   );
  // });
});
