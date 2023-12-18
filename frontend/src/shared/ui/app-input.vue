<template>
  <div class="app-input">
    <label class="app-input__label">{{ label }}</label>
    <input
      v-bind='$attrs'
      class="app-input__input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'
interface Props {
  modelValue: string
  placeholder: string
  label: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const handleInput = (event: InputEvent) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  color: $text-color;

  &__label {
    font-size: 16px;
    display: flex;

    margin-bottom: 4px;
  }

  &__input {
    background: transparent;
    color: $text-color;
    transition: border .2s;

    border: 1px solid #22262C;
    height: 48px;
    border-radius: 6px;
    padding: 0 14px;
    width: 100%;

    &:focus, &:hover {
      outline: none;
      border: 1px solid $color-green;
    }

    &:focus-within {
      &::placeholder {
        opacity: 0;
      }
    }

    &::placeholder {
      color: rgba($text-color,0.6);
    }
  }
}
</style>
