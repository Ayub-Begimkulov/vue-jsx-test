import { defineComponent, ref } from 'vue';
import Button from './NormalComponents/RefTestComponent.vue';

interface InputProps {
  label: string;
  value: string;
  onInput(e: Event): void;
}

function typeFunction<T extends (...args: any[]) => any>() {
  return Function as unknown as {
    new (): T;
  };
}

const InputComponent = defineComponent({
  name: 'Input',
  props: {
    label: String,
    value: String,
    onInput: {
      type: typeFunction<(val: Event) => void>(),
      required: true,
    },
  },
  setup({ label, value, onInput }) {
    return () => (
      <label>
        {label}
        <input type="text" value={value} onInput={onInput} />
      </label>
    );
  },
});

export const App = defineComponent({
  name: 'App',
  setup() {
    const inputValue = ref('');
    const divRef = ref<HTMLDivElement>();

    const onChange = (e: Event) => {
      inputValue.value += (e.target as HTMLInputElement).value;
    };

    return () => (
      <div ref={divRef}>
        {inputValue.value}
        <InputComponent
          label="test input"
          value={inputValue.value}
          onInput={onChange}
        />
        <Button />
      </div>
    );
  },
});
