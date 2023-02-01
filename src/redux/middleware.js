import { COMMENT_CREATE } from './types';
import { errorOn } from './actions';
const badWords = ['козел', 'осел'];

export function spamFilter(store) {
  return function (next) {
    return function (action) {
      if (action.type === COMMENT_CREATE) {
        console.log('action type data >>', action.data.text);
        const hasBadWords = badWords.some((res) => action.data.text.includes(res));
        if (hasBadWords) {
          return store.dispatch(errorOn('Уважайте людей!'));
        }
      }
      return next(action);
    };
  };
}