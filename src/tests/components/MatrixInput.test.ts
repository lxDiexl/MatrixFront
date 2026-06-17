import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MatrixInput from '../../components/MatrixInput.vue';

describe('MatrixInput.vue', () => {
  it('debe renderizar la matriz correctamente', () => {
    const matrix = [[1, 2], [3, 4]];
    const wrapper = mount(MatrixInput, {
      props: { matrix, readonly: false }
    });

    const inputs = wrapper.findAll('input');
    expect(inputs).toHaveLength(4);
    expect((inputs[0].element as HTMLInputElement).value).toBe('1');
    expect((inputs[1].element as HTMLInputElement).value).toBe('2');
    expect((inputs[2].element as HTMLInputElement).value).toBe('3');
    expect((inputs[3].element as HTMLInputElement).value).toBe('4');
  });

  it('debe marcar inputs como readonly cuando readonly es true', () => {
    const matrix = [[1, 2]];
    const wrapper = mount(MatrixInput, {
      props: { matrix, readonly: true }
    });

    const inputs = wrapper.findAll('input');
    inputs.forEach(input => {
      expect((input.element as HTMLInputElement).readOnly).toBe(true);
    });
  });

  it('debe emitir evento update:matrix cuando se cambia un valor', async () => {
    const matrix = [[1, 2]];
    const wrapper = mount(MatrixInput, {
      props: { matrix, readonly: false }
    });

    const input = wrapper.find('input');
    await input.setValue('5');
    await input.trigger('input');

    expect(wrapper.emitted()).toHaveProperty('update:matrix');
  });
});
