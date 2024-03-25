import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';
import React from 'react';

import {VercelRequest, VercelResponse} from '@vercel/node';
import { ImageResponse } from '@vercel/og';

export default async function handler(req: VercelRequest, res: VercelResponse){
  const ir = new ImageResponse(<div>horse</div>);
  Readable.fromWeb(ir.body as ReadableStream<any>).pipe(res);
};
