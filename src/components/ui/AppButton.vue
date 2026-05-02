<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'md',
  },

  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  hideTextOnMobile: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    :class="[
      'inline-flex items-center gap-1.5 font-medium transition-colors shrink-0 cursor-pointer',
      'disabled:opacity-40 disabled:cursor-not-allowed',

      size === 'sm' && 'text-xs px-2.5 py-1.5 rounded-md',
      size === 'md' && 'text-sm px-3 py-2 rounded-lg',
      size === 'lg' && 'text-sm px-5 py-2.5 rounded-xl font-semibold',

      variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
      variant === 'ghost' &&
        'text-muted-foreground border border-border hover:bg-muted hover:text-foreground',
      variant === 'secondary' && 'text-foreground border border-border hover:bg-muted',
      variant === 'danger' && 'bg-destructive text-white hover:bg-destructive/90',
    ]"
  >
    <span v-if="$slots.icon && !loading" class="w-4 h-4 flex items-center justify-center">
      <slot name="icon" />
    </span>

    <span v-if="loading" class="flex gap-0.5 items-center">
      <span
        class="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style="animation-delay: 0s"
      />
      <span
        class="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style="animation-delay: 0.15s"
      />
      <span
        class="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style="animation-delay: 0.3s"
      />
    </span>

    <span v-if="$slots.default && !loading" :class="hideTextOnMobile ? 'hidden sm:inline' : ''">
      <slot />
    </span>
  </button>
</template>
