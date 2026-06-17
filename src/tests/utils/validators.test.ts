import { describe, it, expect } from 'vitest';
import {
  isValidNumber,
  isValidMatrix,
  sanitizeNumber,
  sanitizeMatrix,
  isValidMatrixSize
} from '../../utils/validators';

describe('validators', () => {
  describe('isValidNumber', () => {
    it('debe retornar true para números válidos', () => {
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(42)).toBe(true);
      expect(isValidNumber(-10.5)).toBe(true);
    });

    it('debe retornar false para valores inválidos', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('42')).toBe(false);
      expect(isValidNumber(null)).toBe(false);
      expect(isValidNumber(undefined)).toBe(false);
    });
  });

  describe('isValidMatrix', () => {
    it('debe retornar true para matrices válidas', () => {
      expect(isValidMatrix([[1, 2], [3, 4]])).toBe(true);
      expect(isValidMatrix([[0]])).toBe(true);
    });

    it('debe retornar false para matrices inválidas', () => {
      expect(isValidMatrix([])).toBe(false);
      expect(isValidMatrix([[1, 2], [3]])).toBe(false);
      expect(isValidMatrix([[1, 'a']])).toBe(false);
      expect(isValidMatrix('not-a-matrix')).toBe(false);
    });
  });

  describe('sanitizeNumber', () => {
    it('debe sanitizar números correctamente', () => {
      expect(sanitizeNumber(42)).toBe(42);
      expect(sanitizeNumber('42')).toBe(42);
      expect(sanitizeNumber('invalid')).toBe(0);
      expect(sanitizeNumber(null)).toBe(0);
    });
  });

  describe('sanitizeMatrix', () => {
    it('debe sanitizar matrices correctamente', () => {
      expect(sanitizeMatrix([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
      expect(sanitizeMatrix([[1, 'a'], ['b', 2]])).toEqual([[1, 0], [0, 2]]);
    });
  });

  describe('isValidMatrixSize', () => {
    it('debe validar tamaños correctos', () => {
      expect(isValidMatrixSize(2)).toBe(true);
      expect(isValidMatrixSize(5)).toBe(true);
      expect(isValidMatrixSize(10)).toBe(true);
    });

    it('debe rechazar tamaños incorrectos', () => {
      expect(isValidMatrixSize(1)).toBe(false);
      expect(isValidMatrixSize(11)).toBe(false);
      expect(isValidMatrixSize(-5)).toBe(false);
    });
  });
});
