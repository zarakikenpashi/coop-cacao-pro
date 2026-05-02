<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).slice(2, 8)}`,
  },
  options: {
    // [{ value, label }]
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Sélectionner…',
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  mono: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="as-root">
    <!-- Label -->
    <label v-if="label" :for="id" class="as-label">
      {{ label }}
      <span v-if="required" class="as-required">*</span>
    </label>

    <!-- Wrapper -->
    <div class="as-wrap">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'as-select',
          error ? 'as-select--error' : '',
          disabled ? 'as-select--disabled' : '',
          mono ? 'as-select--mono' : '',
          !modelValue ? 'as-select--ph' : '',
        ]"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <!-- Placeholder -->
        <option value="" disabled hidden>{{ placeholder }}</option>

        <!-- Options -->
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <!-- Chevron -->
      <span class="as-chevron" aria-hidden="true">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 4.5l4.5 4.5 4.5-4.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>

    <!-- Erreur -->
    <Transition name="err">
      <p v-if="error" class="as-error">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2" />
          <path
            d="M6 4v2.5M6 8v.2"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
          />
        </svg>
        {{ error }}
      </p>
    </Transition>

    <!-- Hint -->
    <p v-if="hint && !error" class="as-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
/* ── Variables — même source que AppInput & ComboboxBase ── */
.as-root {
  --as-primary: var(--primary);
  --as-fg: var(--foreground);
  --as-bg: var(--card);
  --as-muted-fg: var(--muted-foreground);
  --as-border: var(--border);
  --as-ring: rgba(31, 122, 62, 0.15);
  --as-radius: var(--radius);
  --as-error: var(--destructive);

  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: inherit;
}

/* Label */
.as-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--as-muted-fg);
}
.as-required {
  color: var(--as-error);
  margin-left: 2px;
}

/* Wrapper */
.as-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

/* Select */
.as-select {
  width: 100%;
  height: 36px; /* aligné AppInput & ComboboxBase */
  padding: 0 32px 0 12px; /* place pour le chevron */
  background: var(--as-bg);
  border: 1px solid var(--as-border); /* aligné */
  border-radius: var(--as-radius); /* aligné */
  font-size: 14px; /* aligné */
  color: var(--as-fg);
  font-family: inherit;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s; /* aligné */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.as-select:hover:not(.as-select--disabled) {
  border-color: var(--as-primary); /* aligné AppInput & cb-trigger:hover */
}
.as-select:focus {
  border-color: var(--as-primary);
  box-shadow: 0 0 0 3px var(--as-ring); /* aligné */
}
.as-select--ph {
  color: var(--as-muted-fg); /* placeholder color */
}
.as-select--error {
  border-color: var(--as-error);
}
.as-select--error:focus {
  border-color: var(--as-error);
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.15);
}
.as-select--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.as-select--mono {
  font-family: ui-monospace, 'Cascadia Code', monospace;
}

/* Chevron */
.as-chevron {
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: var(--as-muted-fg);
  display: flex;
  align-items: center;
}

/* Erreur */
.as-error {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--as-error);
  margin-top: 2px;
}

/* Hint */
.as-hint {
  font-size: 12px;
  color: var(--as-muted-fg);
  opacity: 0.7;
  margin-top: 2px;
}

/* Transition erreur */
.err-enter-active {
  animation: errIn 0.25s ease;
}
.err-leave-active {
  transition: opacity 0.15s;
}
.err-leave-to {
  opacity: 0;
}
@keyframes errIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
