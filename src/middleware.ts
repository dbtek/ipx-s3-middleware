import { NextFunction, Request, Response } from 'express';
import { createIPXMiddleware, IPX } from 'ipx';

export const createS3IpxMiddleware = (ipx: IPX, baseUrl: string) => (req: Request, res: Response, next: NextFunction) => {
  const [_, cmds, ...rest] = req.url.split('/');
  const segments = [cmds, baseUrl, ...rest];
  req.url = '/' + segments.join('/');
  return createIPXMiddleware(ipx)(req, res);
}