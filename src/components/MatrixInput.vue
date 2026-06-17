<template>
  <table class="matrix-table">
    <tbody>
      <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
        <td v-for="(value, colIndex) in row" :key="colIndex">
          <input
            v-model.number="localMatrix[rowIndex][colIndex]"
            type="number"
            class="matrix-input"
            :readonly="readonly"
            @input="handleInputChange(rowIndex, colIndex)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  matrix: number[][];
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
});

const emit = defineEmits<{
  'update:matrix': [matrix: number[][]];
}>();

const localMatrix = ref<number[][]>(JSON.parse(JSON.stringify(props.matrix)));

watch(
  () => props.matrix,
  (newMatrix) => {
    localMatrix.value = JSON.parse(JSON.stringify(newMatrix));
  },
  { deep: true }
);

const handleInputChange = (row: number, col: number): void => {
  if (!props.readonly) {
    emit('update:matrix', localMatrix.value);
  }
};
</script>

<style scoped>
.matrix-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: #eaeaea;
  background-color: #222;
}

.matrix-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #555;
  box-sizing: border-box;
  background-color: #333;
  color: #eaeaea;
  text-align: center;
}

.matrix-input:read-only {
  background-color: #2a2a2a;
  cursor: not-allowed;
}
</style>
