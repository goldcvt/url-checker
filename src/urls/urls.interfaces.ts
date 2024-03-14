export type UrlPlain = {
  id: number;
  lastCheckedAt: Date | null;
  lastCheckStatus: number | null;
  lastResolvedIp: string;
  url: string;
};

export interface IUrlRepository {
  updateCheckResults: (
    data: Pick<
      UrlPlain,
      'id' | 'lastCheckedAt' | 'lastResolvedIp' | 'lastCheckStatus'
    >,
  ) => Promise<void>;
  getAll: () => Promise<UrlPlain[]>;
  save: (
    data: Pick<UrlPlain, 'url' | 'lastResolvedIp'> | Omit<UrlPlain, 'id'>,
  ) => Promise<UrlPlain>;
}
