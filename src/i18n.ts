import { createI18n, DefineDateTimeFormat }from 'vue-i18n';
import { Language } from './constants';
import zhCN from './locales/zh-CN.json';
import en from './locales/en.json';

const dateTimeFormats: DefineDateTimeFormat = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  weekday: {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
};

export const i18n = createI18n({
  legacy: false, // 禁用vue2风格配置，使用vue3风格的配置
  datetimeFormats: {
    en: dateTimeFormats,
    'zh-CN': dateTimeFormats,
  },
  locale: Language.ZH_CN, // 默认语言环境
  messages: {
    en,
    'zh-CN': zhCN,
  },
});
