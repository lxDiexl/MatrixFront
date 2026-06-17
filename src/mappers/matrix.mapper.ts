import { MatrixStatsEntity } from '../entities/matrix-stats.entity';

/**
 * Crea una matriz vacía de tamaño n x n
 * @param size - Tamaño de la matriz
 * @returns Matriz vacía inicializada con ceros
 */
export const createEmptyMatrix = (size: number): number[][] => {
  const matrix: number[][] = [];
  for (let i = 0; i < size; i++) {
    matrix.push(Array(size).fill(0));
  }
  return matrix;
};

/**
 * Formatea un valor numérico para visualización
 * @param value - Valor a formatear
 * @param decimals - Número de decimales (default: 4)
 * @returns Valor formateado
 */
export const formatNumber = (value: number, decimals = 4): string => {
  return value.toFixed(decimals);
};

/**
 * Convierte estadísticas a formato de tabla
 * @param stats - Estadísticas a formatear
 * @returns Array de pares clave-valor para renderizar
 */
export const mapStatsToTable = (
  stats: MatrixStatsEntity
): Array<{ label: string; value: string }> => {
  return [
    { label: 'Promedio', value: formatNumber(stats.average) },
    { label: '¿Es diagonal?', value: stats.isDiagonal ? 'Sí' : 'No' },
    { label: 'Máximo', value: formatNumber(stats.max) },
    { label: 'Mínimo', value: formatNumber(stats.min) },
    { label: 'Suma', value: formatNumber(stats.sum) }
  ];
};
