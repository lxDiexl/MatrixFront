/**
 * Valida que un valor sea un número válido
 * @param value - Valor a validar
 * @returns true si es un número válido
 */
export const isValidNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Valida que una matriz sea válida
 * @param matrix - Matriz a validar
 * @returns true si es una matriz válida
 */
export const isValidMatrix = (matrix: unknown): boolean => {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return false;
  }

  const rowLength = (matrix[0] as unknown[]).length;

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== rowLength) {
      return false;
    }

    for (const value of row) {
      if (!isValidNumber(value)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Sanitiza un valor numérico
 * @param value - Valor a sanitizar
 * @returns Valor sanitizado o 0 si es inválido
 */
export const sanitizeNumber = (value: unknown): number => {
  const num = Number(value);
  return isValidNumber(num) ? num : 0;
};

/**
 * Sanitiza una matriz
 * @param matrix - Matriz a sanitizar
 * @returns Matriz sanitizada
 */
export const sanitizeMatrix = (matrix: unknown[][]): number[][] => {
  if (!Array.isArray(matrix)) {
    return [];
  }

  return matrix.map(row => {
    if (!Array.isArray(row)) {
      return [];
    }
    return row.map(value => sanitizeNumber(value));
  });
};

/**
 * Valida el tamaño de una matriz
 * @param size - Tamaño a validar
 * @returns true si el tamaño es válido (entre 2 y 10)
 */
export const isValidMatrixSize = (size: number): boolean => {
  return isValidNumber(size) && size >= 2 && size <= 10;
};
