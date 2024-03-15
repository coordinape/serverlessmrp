import React from 'react';

import { ImageResponse } from '@vercel/og';
import ReactDOM from 'react-dom/server';

export const config = {
  runtime: 'edge',
};
export const edge = true;

// @ts-ignore
export default async function handler(req: Request, res: Response) {
  try {
    const s = <div>hi</div>;

    // just having this code breaks everything
    const ir = new ImageResponse(s);
    console.log(ir);

    // convert s to a string
    const sString = ReactDOM.renderToString(s);
    return new Response(sString);
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`);
  } finally {
    console.log('finally');
  }
}
