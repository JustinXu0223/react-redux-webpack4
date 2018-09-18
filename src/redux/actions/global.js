/**
 * @component global.js
 * @description App 动作常量
 * @time 2018/5/2
 * @author JUSTIN XU
 */
// i18n
export const INIT_LANGUAGE = 'APP/INIT_LANGUAGE';
export const CHANGE_LANGUAGE = 'APP/CHANGE_LANGUAGE';
export const CHANGE_I18N = 'APP/CHANGE_I18N';

// block chain
export const WEB_BLOCKCHAIN_REQUEST = 'APP/WEB_BLOCKCHAIN_REQUEST';
export const WEB_BLOCKCHAIN_RESPONSE = 'APP/WEB_BLOCKCHAIN_RESPONSE';

export const WEB_CHANGE_BLOCKCHAIN = 'APP/WEB_CHANGE_BLOCKCHAIN';

// actions
export const initLanguageAction = () => ({
  type: INIT_LANGUAGE,
});

export const changeLanguageAction = code => ({
  type: CHANGE_LANGUAGE,
  payload: code,
});
