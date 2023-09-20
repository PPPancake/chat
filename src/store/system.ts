import { ref, reactive, watch } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';
import { platform as getPlatform } from '@tauri-apps/api/os';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { Language, Theme, TauriCommand, DEFAULT_HOST, Model } from '../constants';

export const useSystemStore = defineStore('system', () => {
  const { locale } = useI18n();
  const config = reactive<AppSystem.IConfig>({
    openaiAPIKey: '',
    locale: takeLocale(navigator.language),
    theme: takeTheme(Theme.Auto),
    fontSize: 13,
    host: DEFAULT_HOST,
    model: Model.GPT_35_TURBO,
  });
  const platform = ref('');

  const update = (payload: AppSystem.IConfig) => {
    Object.assign(config, payload, {
      locale: takeLocale(payload.locale),
      theme: takeTheme(payload.theme),
    });
  };

  const handleChangeTheme = async (theme: Theme) => {
    const root = document.querySelector('html');
    Object.values(Theme).forEach(theme => root?.classList.remove(theme));
    root?.classList.add(await takeThemeValue(theme));
  };

  // 监听主题更新, 初始化时立即调用
  watch(() => config.theme, () => handleChangeTheme(config.theme), { immediate: true });

  // 监听语言变更
  watch(() => config.locale, () => locale.value = config.locale, {
    immediate: true,
  });

  watch(() => config, () => {
    invoke(TauriCommand.SystemWriteConfig, {
      config: JSON.stringify(config, null, 2),
    });
  }, { deep: true }); // 深度监视：监视对象内部的属性变化

  // 监听(等待)系统主题变更，这个事件是由tauri桌面应用程序框架派发的
  appWindow.onThemeChanged(({ payload }) => {
    if (config.theme === Theme.Auto) {
      handleChangeTheme(payload as Theme);
    }
  });

  // 主动获取平台信息（操作系统、设备类型等），通过tauri来调用
  getPlatform().then(value => {
    document.querySelector('html')?.classList.add(value);
    platform.value = value;
  });

  return {
    config,
    platform,
    update,
  };
});

// 初始化设置语言
const takeLocale = (locale: string): Language => {
  if (Object.values(Language).includes(locale as Language)) {
    return locale as Language;
  }
  return Language.ZH_CN;
};

// 初始化设置主题
const takeTheme = (theme: string | Theme) => {
  if (Object.values(Theme).includes(theme as Theme)) {
    return theme as Theme;
  }
  return Theme.Auto;
};

// 获取主题值
const takeThemeValue = async (theme: Theme): Promise<Theme> => {
  if (theme === Theme.Auto) {
    const result = await appWindow.theme();
    return result as Theme;
  }
  return theme;
};
