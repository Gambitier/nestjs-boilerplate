import * as _ from 'lodash';

export const generateDisplayId = (prefix = null) => {
  const tmp = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
  const display_id = `${tmp.slice(0, 4)}-${tmp.slice(4, 8)}`;
  let identifier = display_id;

  if (!_.isEmpty(prefix)) {
    identifier = `${prefix}-${identifier}`;
  }

  return identifier;
};
