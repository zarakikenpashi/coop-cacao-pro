<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AuthLayout from '@/layout/AuthLayout.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = 'Veuillez remplir tous les champs.'
    return
  }
  if (!email.value.includes('@')) {
    errorMsg.value = 'Adresse e-mail invalide.'
    return
  }
  loading.value = true
  await new Promise((r) => setTimeout(r, 1400))
  loading.value = false
  // router.push('/dashboard')
}
</script>

<template>
  <AuthLayout>
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2" style="color: var(--foreground)">Se connecter</h1>
      <p class="text-sm" style="color: var(--muted-foreground)">
        Pas encore de compte ?
        <a href="/register" class="font-semibold hover:underline" style="color: var(--primary)">
          Créer un compte
        </a>
      </p>
    </div>

    <!-- Erreur globale -->
    <Transition name="shake">
      <div
        v-if="errorMsg"
        class="flex items-center gap-2 rounded-xl px-4 py-3 mb-5 text-sm"
        style="background: #fef2f2; border: 1px solid #fca5a5; color: var(--destructive)"
        role="alert"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M8 5v3.5M8 11v.1"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        {{ errorMsg }}
      </div>
    </Transition>

    <!-- Formulaire -->
    <form @submit.prevent="handleLogin" novalidate class="space-y-5">
      <!-- Email -->
      <AppInput
        v-model="email"
        type="email"
        label="Adresse e-mail"
        placeholder="vous@exemple.com"
        autocomplete="email"
        :error="errorMsg && !email ? 'Champ requis' : ''"
      />

      <!-- Mot de passe + lien oublié -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <span
            class="text-xs font-semibold uppercase tracking-wide"
            style="color: var(--muted-foreground)"
          >
            Mot de passe
          </span>
          <router-link
            to="/mot-passe-oublie"
            class="text-xs font-medium hover:underline"
            style="color: var(--primary)"
          >
            Mot de passe oublié ?
          </router-link>
        </div>

        <AppInput
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          :error="errorMsg && !password ? 'Champ requis' : ''"
        />
      </div>

      <!-- Bouton connexion -->
      <AppButton
        type="submit"
        variant="primary"
        size="lg"
        :loading="loading"
        :disabled="loading"
        class="w-full justify-center mt-2"
        style="box-shadow: 0 4px 16px rgba(31, 122, 62, 0.3)"
      >
        Se connecter
      </AppButton>
    </form>
  </AuthLayout>
</template>

<style scoped>
.shake-enter-active {
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}
</style>
