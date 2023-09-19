<template>
  <div
    class="context-menu-wrap"
  >
   <slot></slot>
  </div>
</template>

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