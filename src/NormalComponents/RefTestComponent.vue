<template>
  <!-- string refs will not give error in editor, and harder to maintain -->
  <div ref="divStringRef"></div>
  <!-- 
    value refs will highlight the error in edit 
    and it's most likely possible to add compile
    time validation for template if vscode plugins could do that
  -->
  <div :ref="divRefSetter"></div>
</template>

<script lang="ts">
import { shallowRef, ComponentPublicInstance, onMounted } from 'vue';

function useElementRef<T extends Element>() {
  const elementRef = shallowRef<T>();

  const refSetter = (value: Element | ComponentPublicInstance | null) => {
    elementRef.value = value as T;
  };

  return [elementRef, refSetter] as const;
}

export default {
  name: 'Button',
  setup() {
    // would also work with ref, but shallow seems like a better choice
    const divStringRef = shallowRef<HTMLDivElement>();
    const [divRefValue, divRefSetter] = useElementRef<HTMLDivElement>();

    console.log(divStringRef.value);
    console.log(divRefValue.value);

    onMounted(() => {
      console.log(divStringRef.value);
      console.log(divRefValue.value);
    });

    return { divStringRef, divRefSetter };
  },
};
</script>
