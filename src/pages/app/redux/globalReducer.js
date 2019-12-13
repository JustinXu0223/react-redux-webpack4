/**
 * @component globalReducer.js
 * @description app reducer
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import i18n from '../i18n/zh';
import theme from '../theme/light';
import * as types from './globalAction';

const initLanguage = {
  name: 'zh',
  i18n,
};

// language
export function language(state = initLanguage, action) {
  switch (action.type) {
    case types.CHANGE_LANGUAGE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case types.CHANGE_I18N: {
      return {
        ...state,
        i18n: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const initTheme = {
  name: 'light',
  theme,
};

// theme
export function styles(state = initTheme, action) {
  switch (action.type) {
    case types.CHANGE_THEME_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case types.CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
