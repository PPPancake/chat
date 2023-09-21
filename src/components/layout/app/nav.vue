<template>
  <div
    data-tauri-drag-region
    class="toolbar d-flex flex-column h-full ps-r"
  >
    <div class="logo w-full"></div>

    <div data-tauri-drag-region class="w-full menus">
      <router-link
        class="menu d-inline-block w-full ta-c"
        :to="{ name: ViewKey.Chat }"
      >
        <chat-round-filled v-if="isActive(ViewKey.Chat)" />
        <chat-round v-else />
      </router-link>
    </div>

    <div class="settings">
      <i
        class="menu d-inline-block w-full ta-c"
        @click="settingsVisible = !settingsVisible; console.log(settingsVisible)"
      >
        <operation />
      </i>
    </div>
  </div>
  <settings-dialog />
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import { ViewKey } from '../../../constants';
import { ChatRound, Operation } from '@element-plus/icons-vue';
import ChatRoundFilled from '../../../assets/chat-round-filled.svg?skipsvgo';
import { SETTINGS_VISIBLE } from './symbol';
import SettingsDialog from './settings-dialog.vue';

const route = useRoute();

console.log(route.name);
const isActive = (viewKey: ViewKey) => route.name === viewKey;

const settingsVisible = ref(false);
provide(SETTINGS_VISIBLE, settingsVisible);

</script>

<style lang="less" scoped>
.toolbar {
  flex: 0 0 66px;
  padding: 25px 15px 15px 15px;
  background-color: var(--app-nav-bg-color);

  .logo {
    flex: 0 0 36px;
    height: 36px;
    background-image: url(../../../assets/logo-light.png);
    background-size: cover;
  }

  .menus {
    flex: 1 1 auto;
  }

  .settings {
    flex: 0 0 36px;
  }

  .menu {
    margin: 1rem 0;
    padding: .5rem 0;
    color: var(--el-text-color-placeholder);

    &.router-link-active {
      color: var(--el-color-success);
    }

    &:active {
      color: var(--el-color-success);
    }

    svg {
      width: 1.85rem;
      height: 1.85rem;
      cursor: pointer;
    }
  }
}
</style>
