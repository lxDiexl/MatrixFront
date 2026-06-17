<template>
  <div class="error-container">
    <div class="error-message">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ message }}</span>
      <button class="error-close" @click="emit('close')">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.error-container {
  margin-bottom: 20px;
}

.error-message {
  background-color: #dc3545;
  color: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-icon {
  font-size: 20px;
  margin-right: 10px;
}

.error-text {
  flex: 1;
}

.error-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.error-close:hover {
  opacity: 0.8;
}
</style>
