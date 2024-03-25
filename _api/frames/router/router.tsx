/* eslint-disable no-console */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Path } from 'path-parser';

import { RenderFrameImage } from './FrameImage';
import { GiveHomeFrame } from './frames/give/GiveHomeFrame';
import {ImageResponse} from "@vercel/og";
import React from "react";
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

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
    const ir = new ImageResponse(<div>hi</div>);
    Readable.fromWeb(ir.body as ReadableStream<any>).pipe(res);
    return //res.status(404).send(`no handler found for ${path}`);
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
        // handler(req, res, params);
        return res.status(200).send('wut');
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

export type Frame = {
  id: string;
  imageNode: (params: Record<string, string>) => Promise<React.ReactNode>;
};

export type Button = {
  title: string;
  action: 'post' | 'link';
  // only use target for external links
  target?: string;
};

const addFrame = (frame: Frame) => {
  // always add a post route
  addPath(
    `/post/${frame.id}/:giveId`,
    'POST',
    async (req, res, params) => {
      // do things
      // actually parse the post????
    }
  );

  // always add an image route
  // @ts-ignore
  addPath(
    `/img/${frame.id}/:giveId`,
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