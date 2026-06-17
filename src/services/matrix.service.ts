import axios, { AxiosError } from 'axios';
import { MatrixResponseEntity } from '../entities/matrix-response.entity';
import { API_GO_URL } from '../utils/environment';
import { logger } from '../utils/logger';
import { isValidMatrix } from '../utils/validators';

export class MatrixService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = API_GO_URL;
    logger.info('MatrixService inicializado', { apiUrl: this.apiUrl });
  }

  /**
   * Envía una matriz al servidor para análisis QR
   * @param matrix - Matriz a analizar
   * @returns Respuesta con matrices Q, R y estadísticas
   * @throws Error si la matriz es inválida o hay error en la petición
   */
  async analyzeMatrix(matrix: number[][]): Promise<MatrixResponseEntity> {
    logger.debug('Iniciando análisis de matriz', {
      matrixSize: `${matrix.length}x${matrix[0]?.length || 0}`
    });

    if (!isValidMatrix(matrix)) {
      const error = new Error('Matriz inválida');
      logger.error('Validación de matriz fallida', { error });
      throw error;
    }

    try {
      const url = `${this.apiUrl}/qr`;
      logger.debug('Enviando petición HTTP', { url });

      const response = await axios.post<MatrixResponseEntity>(url, matrix, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      logger.info('Análisis completado exitosamente', {
        statusCode: response.status
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        logger.error('Error en petición HTTP', {
          error: axiosError.message,
          statusCode: axiosError.response?.status,
          url: axiosError.config?.url
        });

        if (axiosError.response?.status === 400) {
          throw new Error('La matriz enviada es inválida');
        } else if (axiosError.response?.status === 500) {
          throw new Error('Error en el servidor. Intente nuevamente');
        } else if (axiosError.code === 'ECONNREFUSED') {
          throw new Error('No se puede conectar al servidor');
        } else if (axiosError.code === 'ETIMEDOUT') {
          throw new Error('La petición ha excedido el tiempo de espera');
        }
      }

      logger.error('Error desconocido', { error });
      throw new Error('Error al procesar la matriz');
    }
  }
}
