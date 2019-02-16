/**
 * @component reducer
 * @description App reducer
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import i18n from 'i18n/zh';
import * as Types from '../actions/global';

const initValues = {
  code: 'zh',
  i18n,
};

// language
export const language = (state = initValues, action) => {
  switch (action.type) {
    case Types.CHANGE_LANGUAGE: {
      return { ...state,
        code: action.payload,
      };
    }
    case Types.CHANGE_I18N: {
      return { ...state,
        i18n: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
