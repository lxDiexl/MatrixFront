import { describe, it, expect } from 'vitest';
import {
  createEmptyMatrix,
  formatNumber,
  mapStatsToTable
} from '../../mappers/matrix.mapper';
import { MatrixStatsEntity } from '../../entities/matrix-stats.entity';

describe('matrix.mapper', () => {
  describe('createEmptyMatrix', () => {
    it('debe crear matriz vacía del tamaño correcto', () => {
      const matrix = createEmptyMatrix(3);
      expect(matrix).toHaveLength(3);
      expect(matrix[0]).toHaveLength(3);
      expect(matrix).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });

    it('debe crear matriz 2x2', () => {
      const matrix = createEmptyMatrix(2);
      expect(matrix).toEqual([
        [0, 0],
        [0, 0]
      ]);
    });
  });

  describe('formatNumber', () => {
    it('debe formatear números con 4 decimales por defecto', () => {
      expect(formatNumber(3.14159265)).toBe('3.1416');
      expect(formatNumber(10)).toBe('10.0000');
    });

    it('debe formatear con decimales personalizados', () => {
      expect(formatNumber(3.14159265, 2)).toBe('3.14');
      expect(formatNumber(3.14159265, 6)).toBe('3.141593');
    });
  });

  describe('mapStatsToTable', () => {
    it('debe mapear estadísticas a formato de tabla', () => {
      const stats: MatrixStatsEntity = {
        average: 2.5,
        isDiagonal: true,
        max: 5,
        min: 1,
        sum: 10
      };

      const result = mapStatsToTable(stats);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ label: 'Promedio', value: '2.5000' });
      expect(result[1]).toEqual({ label: '¿Es diagonal?', value: 'Sí' });
      expect(result[2]).toEqual({ label: 'Máximo', value: '5.0000' });
      expect(result[3]).toEqual({ label: 'Mínimo', value: '1.0000' });
      expect(result[4]).toEqual({ label: 'Suma', value: '10.0000' });
    });

    it('debe mostrar "No" cuando no es diagonal', () => {
      const stats: MatrixStatsEntity = {
        average: 0,
        isDiagonal: false,
        max: 0,
        min: 0,
        sum: 0
      };

      const result = mapStatsToTable(stats);
      expect(result[1]).toEqual({ label: '¿Es diagonal?', value: 'No' });
    });
  });
});
