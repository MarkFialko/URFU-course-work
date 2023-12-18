<template>
  <button
    v-bind="$attrs"
    v-if="type === 'button'"
    @click.prevent
    class="app-button"
    :class="[variant, loading || disabled ? 'disabled' : '']"
  >
    <template v-if="loading">
      <spinner />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
  <router-link
    v-bind="$attrs"
    v-if="type === 'link'"
    :to="to"
    class="app-button"
    :class="[variant, loading || disabled ? 'disabled' : '']"
  >
    <template v-if="loading">
      <spinner />
    </template>
    <template v-else>
      <slot />
    </template>
  </router-link>
</template>

<script setup lang="ts">
import Spinner from '@/shared/components/spinner.vue'
import {defineProps, withDefaults} from "vue";

interface Props {
  type: 'link' | 'button'
  to?: string
  variant: 'common' | 'outline'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'common',
  disabled: false,
  loading: false
})

</script>

<style lang="scss">
.app-button {
  cursor: pointer;
  padding: 0 10px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: $color-green;
  color: $text-color;
  border: none;

  &.disabled {
    background: rgba($color-green, 0.5);
    pointer-events: none;
    cursor: default;
  }

  &.outline {
    background: transparent;
    border: 1px solid $color-green;
    color: $color-green;

    &.disabled {
      background: transparent;
      border: 1px solid rgba($color-green, 0.5);
    }
  }
}
</style>
