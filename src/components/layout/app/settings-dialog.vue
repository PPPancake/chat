<template>
  <el-dialog
    cneter 
    align-center 
    append-to-body
    v-model="visible"
  >
    <el-scrollbar height="400px">
      <el-divider content-position="left">version</el-divider>
      <el-form
        label-position="top"
        size="small"
      >
        <el-form-item>
          <el-input type="password" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, inject, computed, Ref, onMounted } from 'vue';
import { SETTINGS_VISIBLE } from './symbol';

const visible = inject(SETTINGS_VISIBLE) as Ref<boolean>;
</script>