import { mocked } from 'ts-jest/utils'
import * as ipx from 'ipx';
import { Request, Response, NextFunction } from 'express';
import { createS3IpxMiddleware } from './middleware';

jest.mock('ipx');
const mockedIpx = mocked(ipx, true);
const mockedIpxMiddleware = jest.fn();

mockedIpx.createIPXMiddleware.mockImplementation(ipx => mockedIpxMiddleware);

describe('middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  
  const cmds = 's_200x200';
  const pathToImg = 'path/to/image.jpg';
  const baseUrl = 'https://my-bucket.s3.us-west-2.amazonaws.com';

  beforeEach(() => {
    mockRequest = {
      url: `/${cmds}/${pathToImg}`,
    };
    mockResponse = {};
  });

  describe('createS3IpxMiddleware', () => {
    it('should call createIpxMiddleware()', () => {
      const _ipx = mockedIpx.createIPX({});
      createS3IpxMiddleware(_ipx, baseUrl)(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(mockedIpx.createIPXMiddleware.mock.calls).toHaveLength(1);
    });

    it('should update req.url with s3 base url', () => {
      const _ipx = mockedIpx.createIPX({});
      createS3IpxMiddleware(_ipx, baseUrl)(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(mockedIpxMiddleware).toHaveBeenCalledWith({ url: `/${cmds}/${baseUrl}/${pathToImg}` }, mockResponse);
    });
  });
});