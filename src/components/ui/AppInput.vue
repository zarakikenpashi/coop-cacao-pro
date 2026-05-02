<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // 'text' | 'email' | 'password' | 'date' | 'number'
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).slice(2, 8)}`,
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
  noIcon: {
    type: Boolean,
    default: false,
  },
  // Taille du champ : 'md' (défaut, 36px) | 'sm' (32px, pour tableaux)
  size: {
    type: String,
    default: 'md',
  },
  // ── Props spécifiques type="number" ──────────────────────────────
  // Valeur minimale
  min: {
    type: [Number, String],
    default: undefined,
  },
  // Valeur maximale
  max: {
    type: [Number, String],
    default: undefined,
  },
  // Pas d'incrément (ex: 0.01 pour 2 décimales)
  step: {
    type: [Number, String],
    default: undefined,
  },
  // Aligner le texte à droite (utile pour montants/poids)
  textRight: {
    type: Boolean,
    default: false,
  },
  // Suffixe affiché à droite du champ (ex: "kg", "%", "FCFA")
  suffix: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type
})

// Icône gauche uniquement pour ces types (number n'a pas d'icône par défaut)
const hasLeftIcon = computed(
  () => !props.noIcon && ['email', 'date', 'password', 'text'].includes(props.type),
)

// Suffix à droite (number uniquement, si défini)
const hasSuffix = computed(() => props.type === 'number' && !!props.suffix)

// Emit : pour type number, on renvoie un Number si possible
function onInput(e) {
  const raw = e.target.value
  if (props.type === 'number') {
    // Valeur vide → ''  |  sinon → Number
    emit('update:modelValue', raw === '' ? '' : Number(raw))
  } else {
    emit('update:modelValue', raw)
  }
}
</script>

<template>
  <div class="ai-root">
    <!-- Label -->
    <label v-if="label" :for="id" class="ai-label">
      {{ label }}
      <span v-if="required" class="ai-required">*</span>
    </label>

    <!-- Wrapper -->
    <div class="ai-wrap">
      <!-- Icône gauche (text / email / date / password) -->
      <span v-if="hasLeftIcon" class="ai-icon-left" aria-hidden="true">
        <svg v-if="type === 'email'" width="14" height="14" viewBox="0 0 15 15" fill="none">
          <rect
            x="1"
            y="3"
            width="13"
            height="9"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <path
            d="M1 5.5l6.5 4 6.5-4"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else-if="type === 'password'" width="14" height="14" viewBox="0 0 15 15" fill="none">
          <rect
            x="3"
            y="7"
            width="9"
            height="7"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <path
            d="M5 7V5a2.5 2.5 0 015 0v2"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else-if="type === 'date'" width="14" height="14" viewBox="0 0 15 15" fill="none">
          <rect
            x="1"
            y="3"
            width="13"
            height="11"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <path
            d="M1 7h13M5 1v3M10 1v3"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 15 15" fill="none">
          <path
            d="M2 11.5V13h1.5l7-7L9 4.5l-7 7zM12.85 3.65a1 1 0 000-1.5l-1-1a1 1 0 00-1.5 0l-1 1 2.5 2.5 1-1z"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <!-- Champ input -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="type === 'number' ? min : undefined"
        :max="type === 'number' ? max : undefined"
        :step="type === 'number' ? step : undefined"
        :class="[
          'ai-input',
          size === 'sm' ? 'ai-input--sm' : 'ai-input--md',
          error ? 'ai-input--error' : '',
          disabled ? 'ai-input--disabled' : '',
          mono || type === 'number' ? 'ai-input--mono' : '',
          hasLeftIcon ? 'ai-input--icon-left' : '',
          type === 'password' ? 'ai-input--icon-right' : '',
          textRight || type === 'number' ? 'ai-input--right' : '',
          hasSuffix ? 'ai-input--has-suffix' : '',
        ]"
        @input="onInput"
      />

      <!-- Suffixe (kg, %, FCFA…) -->
      <span v-if="hasSuffix" class="ai-suffix" aria-hidden="true">
        {{ suffix }}
      </span>

      <!-- Toggle password -->
      <button
        v-if="type === 'password'"
        type="button"
        class="ai-toggle"
        :aria-label="showPassword ? 'Masquer' : 'Afficher'"
        @click="showPassword = !showPassword"
      >
        <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3" />
        </svg>
        <svg v-else width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
            stroke="currentColor"
            stroke-width="1.3"
          />
          <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3" />
          <line
            x1="2"
            y1="2"
            x2="14"
            y2="14"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <!-- Erreur -->
    <Transition name="err">
      <p v-if="error" class="ai-error">
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
    <p v-if="hint && !error" class="ai-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
/* ── Variables ── */
.ai-root {
  --ai-primary: var(--primary);
  --ai-fg: var(--foreground);
  --ai-bg: var(--card);
  --ai-muted-fg: var(--muted-foreground);
  --ai-border: var(--border);
  --ai-ring: rgba(31, 122, 62, 0.15);
  --ai-radius: var(--radius);
  --ai-error: var(--destructive);

  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: inherit;
}

/* Label */
.ai-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ai-muted-fg);
}
.ai-required {
  color: var(--ai-error);
  margin-left: 2px;
}

/* Wrapper */
.ai-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

/* Icône gauche */
.ai-icon-left {
  position: absolute;
  left: 10px;
  pointer-events: none;
  color: var(--ai-muted-fg);
  opacity: 0.6;
  display: flex;
  align-items: center;
}

/* Suffixe */
.ai-suffix {
  position: absolute;
  right: 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ai-muted-fg);
  pointer-events: none;
  user-select: none;
  font-family: ui-monospace, 'Cascadia Code', monospace;
}

/* Toggle password */
.ai-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ai-muted-fg);
  opacity: 0.6;
  display: flex;
  align-items: center;
  transition:
    opacity 0.15s,
    color 0.15s;
}
.ai-toggle:hover {
  opacity: 1;
  color: var(--ai-fg);
}

/* Input */
.ai-input {
  width: 100%;
  padding: 0 12px;
  background: var(--ai-bg);
  border: 1px solid var(--ai-border);
  border-radius: var(--ai-radius);
  color: var(--ai-fg);
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

/* Tailles */
.ai-input--md {
  height: 36px;
  font-size: 14px;
}
.ai-input--sm {
  height: 32px;
  font-size: 12px;
}
.ai-input::placeholder {
  color: var(--ai-muted-fg);
}
.ai-input:hover:not(.ai-input--disabled) {
  border-color: var(--ai-primary);
}
.ai-input:focus {
  border-color: var(--ai-primary);
  box-shadow: 0 0 0 3px var(--ai-ring);
}

/* Modificateurs */
.ai-input--error {
  border-color: var(--ai-error);
}
.ai-input--error:focus {
  border-color: var(--ai-error);
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.15);
}
.ai-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ai-input--mono {
  font-family: ui-monospace, 'Cascadia Code', monospace;
}
.ai-input--right {
  text-align: right;
}
.ai-input--icon-left {
  padding-left: 32px;
}
.ai-input--icon-right {
  padding-right: 32px;
}
/* Laisser de la place pour le suffixe à droite */
.ai-input--has-suffix {
  padding-right: 40px;
}

/* Supprimer les flèches natives du type number */
.ai-input[type='number']::-webkit-inner-spin-button,
.ai-input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ai-input[type='number'] {
  -moz-appearance: textfield;
}

/* Erreur */
.ai-error {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--ai-error);
  margin-top: 2px;
}

/* Hint */
.ai-hint {
  font-size: 12px;
  color: var(--ai-muted-fg);
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
