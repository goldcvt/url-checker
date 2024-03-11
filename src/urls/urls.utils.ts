export const pickPort = ({
  schema,
  port,
}: {
  schema: 'http' | 'https';
  port: string;
}): number => {
  const portNumber = Number(port);
  if (portNumber) {
    return portNumber;
  }

  if (schema === 'http') {
    return 80;
  }

  return 443;
};

export const getSchema = (protocol: string) => {
  const parsedProtocol =
    protocol.at(-1) === ':' ? protocol.slice(0, -1) : protocol;

  if (parsedProtocol === 'http' || parsedProtocol === 'https') {
    return parsedProtocol;
  }

  return 'https';
};
