import { ResourceIdentifier } from '../../router';


export const giveResourceIdentifier: ResourceIdentifier = {
  resourcePathExpression: '/:giveId',
  getResourceId: (params: Record<string, string>) => {
    return `/${params.giveId}`;
  },
};

export const getGiveFromParams = async (params: Record<string, string>) => {
  const giveStr = params.giveId;
  if (!giveStr) {
    throw new Error('no giveId provided');
  }

  const giveId = Number(giveStr);

  return {hi:"dude"};
};
