export type UrlPlain = {
  id: number;
  lastCheckedAt: Date | null;
  lastCheckStatus: number | null;
  lastResolvedIp: string;
  url: string;
};

export interface IUrlRepository {
  save: (data: Omit<UrlPlain, 'id'>) => Promise<UrlPlain>;
  updateCheckResults: (
    data: Pick<
      UrlPlain,
      'id' | 'lastCheckedAt' | 'lastResolvedIp' | 'lastCheckStatus'
    >,
  ) => Promise<void>;
  // Could've used cursor, but why when you could just
  // scale the workers and each would get dedicated batch
  // from a dispatcher service
  getAll: () => Promise<UrlPlain[]>;
}
