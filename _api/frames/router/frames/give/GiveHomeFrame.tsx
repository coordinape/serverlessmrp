import React from 'react';

import { Frame } from '../../router';

import {
  giveResourceIdentifier,
} from './getGiveFromParams';

const homeFrameImageNode = async (params: Record<string, string>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 64,
        padding: 16,
      }}
    >
      {/*<OGAvatar avatar={give.giver_profile_public.avatar} />*/}
      {/*<div>{give.giver_profile_public.name}</div>*/}
      <div>GAVE TO</div>
      {/*<OGAvatar avatar={give.target_profile_public.avatar} />*/}
      {/*<div>{give.target_profile_public.name}</div>*/}
    </div>
  );
};


export const GiveHomeFrame: Frame = {
  id: 'give',
  resourceIdentifier: giveResourceIdentifier,
  imageNode: homeFrameImageNode,
};
