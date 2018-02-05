import { isNumeric } from './numberUtils';

function range(from, to) {
  if (!isNumeric(from) || !isNumeric(to)) {
    throw new Error('Range from and to must be numbers');
  }
  const result = [];

  for (let index = from; index < to; index += 1) {
    result.push(index);
  }

  return result;
}

export default range;
