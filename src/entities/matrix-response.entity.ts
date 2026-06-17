import { MatrixStatsEntity } from './matrix-stats.entity';

export interface MatrixResponseEntity {
  RotatedMatrix: number[][];
  QMatrix: number[][];
  RMatrix: number[][];
  QStats: MatrixStatsEntity;
  RStats: MatrixStatsEntity;
}
