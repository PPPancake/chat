<template>
  <el-avatar
    class="avatar"
    shape="square"
    :size="size"
    :src="url"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { AssistantAvatars } from '../../constants';

const props = defineProps<{ // 定义属性
  avatar?: AssistantAvatars,
  size: number,
}>();

const url = computed(() => {
  if (props.avatar) {
    return `/avatar/${props.avatar}.svg`;
  }
  return `/avatar/${AssistantAvatars.Logo}.svg`;
});
</script>

<style lang="less" scoped>
.avatar {
  background-color: #fff;
}
</style>
