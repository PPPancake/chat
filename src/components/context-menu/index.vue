<template>
  <!-- prevent:在事件处理函数执行后，组织事件的默认行为，即不显示浏览器的上下文菜单 -->
  <div
    class="context-menu-wrap"
    @contextmenu.prevent="handleContextmenu"
    @click="hideContextmenu"
  >

    <slot></slot>
  </div>
  <!-- 里面的菜单组件被转移到body的DOM中 -->
  <teleport to="body">
    <div
      class="context-menu ps-f pd-6"
      ref="contextmenuRef"
      v-if="hasRender"
      v-show="visible"
      :style="{
        top: y,
        left: x,
      }"
    >
      <slot name="menu"></slot>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch, nextTick } from 'vue';

const hasRender = ref(false);
const visible = ref(false);
const contextmenuRef = ref<HTMLDivElement | null>(null);
const x = ref('0px');
const y = ref('0px');

// 声明自定义事件open
const emits = defineEmits<{
  (e: 'open'): void,
}>();

// 开关菜单
const toggle = (v?: boolean) => {
  if (v === undefined) {
    return visible.value != visible.value;
  }
  visible.value = v;
}

// 关闭菜单
const hideContextmenu = () => toggle(false);

// 打开菜单
const handleContextmenu = (e: MouseEvent) => {
  hasRender.value = true;
  toggle(true);
  handlePosition(e.clientX, e.clientY);
  emits('open'); // 触发自定义的open事件
};

// 处理菜单出现的位置
const handlePosition = (left: number, top: number) => {
  nextTick(() => {
    const width = contextmenuRef.value?.clientWidth || 100;
    const height = contextmenuRef.value?.clientHeight || 100;
    const [windowWidth, windowHeight ] = [window.innerWidth, window.innerHeight];

    // todo
    x.value = `${Math.min(left, windowWidth - width - 10)}px`;
    y.value = `${Math.min(top, windowHeight - height - 10)}px`;
  });
};

watch(visible, (value) => {
  if (value) {
    document.addEventListener('click', handleBodyClick, true);
    document.addEventListener('contextmenu', handleBodyClick, true);
    disableScroll();
  } else {
    document.removeEventListener('click', handleBodyClick, true);
    document.removeEventListener('contextmenu', handleBodyClick, true);
    enableScroll();
  }
});

const handleBodyClick = (evt: Event) => {
  if (!evt.target || !contextmenuRef.value) {
    return;
  }

  // 点击关闭按钮，则关闭
  if ((evt.target as HTMLElement).hasAttribute('data-auto-close')) {
    return hideContextmenu();
  }

  const notOutside = contextmenuRef.value.contains(evt.target as Node);
  // 点击了上下文菜单的外部，则关闭
  if (!notOutside) {
    hideContextmenu();
  }
};


// 阻止鼠标事件的默认行为，从而自定义
const preventDefault = (e: MouseEvent) => e.preventDefault();

// 阻止上下左右键的默认行为
const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault();
  }
};

// 禁止滚动
const disableScroll = () => {
  window.addEventListener('wheel', preventDefault, { passive: false });
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

// 启用滚动
const enableScroll = () => {
  window.removeEventListener('wheel', preventDefault);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleBodyClick, true);
  document.removeEventListener('contextmenu', handleBodyClick, true);
  enableScroll();
});
</script>

<style lang="less">
.context-menu-wrap {
  padding: 0;
  margin: 0;
}

.context-menu {
  min-width: 80px;
  backdrop-filter: blur(20px);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  z-index: 100000;
  font-size: var(--font-size-3);
  overflow: hidden;
}
</style>