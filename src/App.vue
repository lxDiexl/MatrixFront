<template>
  <div class="container">
    <h1 class="heading">Factorización QR y Estadísticas de Matriz</h1>

    <ErrorMessage v-if="error" :message="error" @close="closeError" />

    <div class="input-group">
      <label for="matrixSize" class="label">
        Tamaño de la matriz (N x N):
      </label>
      <input id="matrixSize" v-model.number="matrixSize" type="number" min="2" max="10" class="size-input"
        @change="handleSizeChange" />
    </div>

    <div>
      <h3 class="section-heading">Ingresa la matriz:</h3>
      <MatrixInput :matrix="matrixInput" :readonly="false" @update:matrix="handleMatrixUpdate" />
      <br />
      <button :disabled="loading" :class="['button', { 'button-disabled': loading }]" @click="sendMatrix">
        {{ loading ? 'Cargando...' : 'Enviar Matriz' }}
      </button>
    </div>

    <p v-if="loading" class="loading-text">Cargando resultados...</p>

    <template v-if="matrixResponse">
      <div class="matrix-container">
        <h3 class="section-heading">Matriz Rotada</h3>
        <MatrixInput :matrix="matrixResponse.RotatedMatrix" :readonly="true" />
      </div>

      <div class="matrix-container">
        <h3 class="section-heading">Matriz Q</h3>
        <MatrixInput :matrix="matrixResponse.QMatrix" :readonly="true" />
        <h3 class="section-heading">Estadísticas de Q</h3>
        <MatrixStats :stats="matrixResponse.QStats" />
      </div>

      <div class="matrix-container">
        <h3 class="section-heading">Matriz R</h3>
        <MatrixInput :matrix="matrixResponse.RMatrix" :readonly="true" />
        <h3 class="section-heading">Estadísticas de R</h3>
        <MatrixStats :stats="matrixResponse.RStats" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MatrixInput from './components/MatrixInput.vue';
import MatrixStats from './components/MatrixStats.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import { MatrixService } from './services/matrix.service';
import { MatrixResponseEntity } from './entities/matrix-response.entity';
import { createEmptyMatrix } from './mappers/matrix.mapper';
import { logger } from './utils/logger';
import { isValidMatrixSize } from './utils/validators';

const matrixSize = ref<number>(3);
const matrixInput = ref<number[][]>([]);
const matrixResponse = ref<MatrixResponseEntity | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const matrixService = new MatrixService();

onMounted(() => {
  matrixInput.value = createEmptyMatrix(matrixSize.value);
  logger.info('Aplicación inicializada', { matrixSize: matrixSize.value });
});

const handleMatrixUpdate = (newMatrix: number[][]): void => {
  matrixInput.value = newMatrix;
  logger.debug('Matriz actualizada');
};

const handleSizeChange = (): void => {
  if (!isValidMatrixSize(matrixSize.value)) {
    logger.warn('Tamaño de matriz inválido', { size: matrixSize.value });
    error.value = 'El tamaño debe estar entre 2 y 10';
    return;
  }

  matrixInput.value = createEmptyMatrix(matrixSize.value);
  matrixResponse.value = null;
  error.value = null;
  logger.info('Tamaño de matriz cambiado', { newSize: matrixSize.value });
};

const sendMatrix = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  logger.info('Enviando matriz para análisis');

  try {
    const response = await matrixService.analyzeMatrix(matrixInput.value);
    matrixResponse.value = response;
    logger.info('Análisis recibido exitosamente');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
    error.value = errorMessage;
    logger.error('Error al analizar matriz', { error: errorMessage });
  } finally {
    loading.value = false;
  }
};

const closeError = (): void => {
  error.value = null;
};
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  background-color: #181818;
  color: #eaeaea;
  border-radius: 8px;
  max-width: 900px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  color: #eaeaea;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
  color: #ccc;
}

.size-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #555;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #333;
  color: #eaeaea;
}

.button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.button:hover:not(.button-disabled) {
  background-color: #45a049;
}

.button-disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.loading-text {
  text-align: center;
  font-size: 18px;
  color: #bbb;
  margin: 20px 0;
}

.section-heading {
  color: #eaeaea;
  margin-bottom: 10px;
  margin-top: 20px;
}

.matrix-container {
  margin-bottom: 40px;
}
</style>
