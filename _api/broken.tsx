import React from 'react';

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ImageResponse } from '@vercel/og';
import { Readable } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';
import ReactDOM from 'react-dom/server';

// @ts-ignore
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {

    const hi = ReactDOM.renderToString("yo");
    console.log(hi);
    
    const s = <div>hi</div>;

    // just having this code breaks everything
    const ir = new ImageResponse(s);
    console.log(ir);

    Readable.fromWeb(ir.body as ReadableStream<any>).pipe(res);
  } catch (e: any) {
    console.error(`${e.message}`);
    return res.status(500).send(`Failed to generate the image: ${e.message}`);
  } finally {
    console.log('finally');
  }
}
