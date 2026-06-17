import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorMessage from '../../components/ErrorMessage.vue';

describe('ErrorMessage.vue', () => {
  it('debe renderizar el mensaje de error', () => {
    const message = 'Error al procesar la matriz';
    const wrapper = mount(ErrorMessage, {
      props: { message }
    });

    expect(wrapper.text()).toContain(message);
  });

  it('debe emitir evento close al hacer clic en cerrar', async () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: 'Error test' }
    });

    await wrapper.find('.error-close').trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('debe mostrar el icono de advertencia', () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: 'Test' }
    });

    expect(wrapper.find('.error-icon').text()).toBe('⚠️');
  });
});
