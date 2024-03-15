import React from 'react';

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ImageResponse } from '@vercel/og';
import ReactDOM from 'react-dom/server';

// @ts-ignore
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const s = <div>hi</div>;

    // just having this code breaks everything
    const ir = new ImageResponse(s);
    console.log(ir);

    // convert s to a string
    const sString = ReactDOM.renderToString(s);
    return res.status(200).send(sString);
  } catch (e: any) {
    console.error(`${e.message}`);
    return res.status(500).send(`Failed to generate the image: ${e.message}`);
  } finally {
    console.log('finally');
  }
}
