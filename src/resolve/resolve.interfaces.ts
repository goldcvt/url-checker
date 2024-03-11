export interface IResolveResult {
  ip: string;
}

export interface IResolverService {
  resolve: (url: string) => Promise<IResolveResult>;
}
