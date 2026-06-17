import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MatrixStats from '../../components/MatrixStats.vue';
import { MatrixStatsEntity } from '../../entities/matrix-stats.entity';

describe('MatrixStats.vue', () => {
  it('debe renderizar todas las estadísticas', () => {
    const stats: MatrixStatsEntity = {
      average: 2.5,
      isDiagonal: true,
      max: 5,
      min: 1,
      sum: 10
    };

    const wrapper = mount(MatrixStats, {
      props: { stats }
    });

    expect(wrapper.text()).toContain('Promedio:');
    expect(wrapper.text()).toContain('2.5000');
    expect(wrapper.text()).toContain('¿Es diagonal?:');
    expect(wrapper.text()).toContain('Sí');
    expect(wrapper.text()).toContain('Máximo:');
    expect(wrapper.text()).toContain('5.0000');
    expect(wrapper.text()).toContain('Mínimo:');
    expect(wrapper.text()).toContain('1.0000');
    expect(wrapper.text()).toContain('Suma:');
    expect(wrapper.text()).toContain('10.0000');
  });

  it('debe mostrar "No" cuando no es diagonal', () => {
    const stats: MatrixStatsEntity = {
      average: 0,
      isDiagonal: false,
      max: 0,
      min: 0,
      sum: 0
    };

    const wrapper = mount(MatrixStats, {
      props: { stats }
    });

    expect(wrapper.text()).toContain('No');
  });
});
