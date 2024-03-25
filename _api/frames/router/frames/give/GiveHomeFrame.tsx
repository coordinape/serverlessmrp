import React from 'react';

import { FramePostInfo } from '../../../getFramePostInfo';
import { Frame } from '../../router';

import {
  getGiveFromParams,
  giveResourceIdentifier,
} from './getGiveFromParams';
import { GiveGiverFrame } from './GiveGiverFrame';

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

const onPost = async (info: FramePostInfo, params: Record<string, string>) => {
  // who are you? which frame to return
  // const give = await getGiveFromParams(params);
  // if (!give || !give.target_profile_public || !give.giver_profile_public) {
  //   throw new NotFoundError('give not found');
  // }

  type role = 'rando' | 'giver' | 'target';

  // let role: role = 'rando';
  // if (info.profile.id === give.giver_profile_public.id) {
  //   role = 'giver';
  // } else if (info.profile.id === give.target_profile_public.id) {
  //   role = 'target';
  // }

  // if (role === 'giver') {
    return GiveGiverFrame;
  // }

  // TODO: hey @singer fix this
  // } else if (role === 'target') {
  //     // const s = <TargetFrame give={give} />;
  //     // const sString = ReactDOM.renderToString(s);
  //     // return res.status(200).send(sString);
  // } else if (role === 'rando') {
  //     const s = <RandoFrame give={give} />;
  //     const sString = ReactDOM.renderToString(s);
  //     return res.status(200).send(sString);

  return GiveHomeFrame;
};

export const GiveHomeFrame: Frame = {
  id: 'give',
  homeFrame: true,
  resourceIdentifier: giveResourceIdentifier,
  imageNode: homeFrameImageNode,
  buttons: [
    {
      title: 'Enter the Arena',
      action: 'post',
      onPost: onPost,
    },
  ],
};
