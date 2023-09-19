<template>
  <section class="container h-full d-flex flex-column">
    会话列表
    <el-scrollbar class="ps-r" style="flex: 1 1 auto;">
      <ul>
        <li v-for="item in sessions" :key = "item.id">
          <context-menu @open="handleContextMenu(item.id)">
            <div
              class="session phorz-10 pvert-16 d-flex ps-r"
              @click="console.log('click')"
            >
              <avatar
                class="avater"
                :size="36"
              />
              
              <div class="content pl-10 pr-6">
                <p class="content-title ellipsis pr-30 pb-4">{{ item.name }}</p>
                <p class="content-abstract ellipsis">{{ item.content }}</p>
              </div>
              <div class="ps-a t-assist date">
                {{ item.latest }}
              </div>


            </div>
          </context-menu>
        </li>
      </ul>
    </el-scrollbar>
  </section>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
// import { useSessionStore } from '../../../store/session';
import ContextMenu from '../../../components/context-menu/index.vue';
import { CONTEXT_ID } from '../symbol';
import Avatar from './avater.vue';
const contextId = ref('');
provide(CONTEXT_ID, contextId);

// const store = useSessionStore();
const sessions = [{
  'id':'1',
  'name': 'name1',
  'content': '内容1',
  'latest': '2022/10/1'
}, {
  'id':'2',
  'name': 'name2',
  'content': '内容2',
  'latest': '2022/10/1'
},
{
  'id':'3',
  'name': 'name3',
  'content': '内容3',
  'latest': '2022/10/1'
}];

const handleContextMenu = (id: string) => console.log(id);

</script>

<style lang="less" scoped>
.container {
  font-size: var(--font-size-3);
  flex: 0 0 15rem;
  width: 15rem;
  background: var(--el-bg-color-overlay);
  border-right: 1px solid var(--el-border-color-extra-light);

  .toolbar {
    flex: 0 0 auto;
  }

  .session {
    user-select: none;
    &.sticky-top {
      background-color: var(--link-sticky-bg-color);
    }
    &.active {
      background-color: var(--link-active-bg-color);
    }
  }

  .content {
    flex: 1 1 auto;
    overflow: hidden;

    * {
      cursor: default;
    }

    &-title {
      font-size: var(--font-size-3);
    }

    &-abstract {
      font-size: var(--font-size-2);
      color: var(--el-disabled-text-color);
    }
  }

  .date {
    cursor: default;
    right: 6px;
    top: 5px;
  }

  .avatar {
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius-regular);
    opacity: .85;
  }
}
</style>