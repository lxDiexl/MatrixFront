<template>
  <table class="stats-table">
    <tbody>
      <tr v-for="(row, index) in statsData" :key="index">
        <td>
          <strong>{{ row.label }}:</strong>
        </td>
        <td>{{ row.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MatrixStatsEntity } from '../entities/matrix-stats.entity';
import { mapStatsToTable } from '../mappers/matrix.mapper';

interface Props {
  stats: MatrixStatsEntity;
}

const props = defineProps<Props>();

const statsData = computed(() => mapStatsToTable(props.stats));
</script>

<style scoped>
.stats-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: #eaeaea;
  background-color: #222;
}

.stats-table td {
  padding: 10px;
  border: 1px solid #555;
}
</style>
