/**
 * @component reducer
 * @description App reducer
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import i18n from 'i18n/zh';
import theme from 'theme/light';
import * as Types from '../actions/global';

const initLanguage = {
  name: 'zh',
  i18n,
};

// language
export const language = (state = initLanguage, action) => {
  switch (action.type) {
    case Types.CHANGE_LANGUAGE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case Types.CHANGE_I18N: {
      return {
        ...state,
        i18n: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initTheme = {
  name: 'light',
  theme,
};

// theme
export const styles = (state = initTheme, action) => {
  switch (action.type) {
    case Types.CHANGE_THEME_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case Types.CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
