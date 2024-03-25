/* eslint-disable no-console */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Path } from 'path-parser';

import { FramePostInfo, getFramePostInfo } from '../getFramePostInfo';
import { RenderFrameImage } from './FrameImage';
import { GiveHomeFrame } from './frames/give/GiveHomeFrame';

export const FRAME_ROUTER_URL_BASE = `/api/frames/router`;

type PathWithHandler = {
  path: Path;
  handler: (
    req: VercelRequest,
    res: VercelResponse,
    params: Record<string, any>
  ) => void;
  method: 'GET' | 'POST';
};

const router: {
  paths: PathWithHandler[];
} = {
  paths: [],
};

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log('frame router invoked', req.query);
  const { path } = req.query;
  if (!path) {
    return res.status(404).send(`no path provided`);
  }
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).send(`method not supported ${req.method}`);
  }
  const handler = getHandler('/' + ((path as string) ?? ''), req.method);
  if (!handler) {
    return res.status(404).send(`no handler found for ${path}`);
  }
  return handler(req, res);
}

const getHandler = (path: string, m: 'GET' | 'POST') => {
  for (const { path: p, handler, method } of router.paths) {
    if (method !== m) {
      continue;
    }
    const params = p.test(path);
    if (params) {
      return (req: VercelRequest, res: VercelResponse) => {
        handler(req, res, params);
      };
    }
  }
  return undefined;
};

const addPath = (
  path: string,
  method: 'GET' | 'POST',
  handler: (
    req: VercelRequest,
    res: VercelResponse,
    params: Record<string, string>
  ) => void
) => {
  const p = new Path(path);
  router.paths.push({
    path: p,
    method,
    handler,
  });
  return path;
};

// FRAME
// Image/Meta Tags
// Buttons
// - onPost -> Does Things, and redirects/returns a Frame???
// - externalLink

export type ResourceIdentifier = {
  resourcePathExpression: string;
  getResourceId: (params: Record<string, string>) => string;
};

export type Frame = {
  id: string;
  imageNode: (params: Record<string, string>) => Promise<React.ReactNode>;
  resourceIdentifier: ResourceIdentifier;
};

export type Button = {
  title: string;
  action: 'post' | 'link';
  // only use target for external links
  target?: string;
  // only use onPost for post
  onPost?: (
    info: FramePostInfo,
    params: Record<string, string>
  ) => Promise<Frame>;
};

const addFrame = (frame: Frame) => {
  // always add a post route
  addPath(
    `/post/${frame.id}${frame.resourceIdentifier.resourcePathExpression}`,
    'POST',
    async (req, res, params) => {
      // do things
      // actually parse the post????
    }
  );

  // always add an image route
  // @ts-ignore
  addPath(
    `/img/${frame.id}${frame.resourceIdentifier.resourcePathExpression}`,
    'GET',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_req, res /*, params*/) => {
      RenderFrameImage({
        // children: await frame.imageNode(params),
        res,
      });
    }
  );
};

addFrame(GiveHomeFrame);