<script setup>
import AuthLayout from '@/layout/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { ref } from 'vue'

// 'request' | 'sent'
const step = ref('request')
const email = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  errorMsg.value = ''
  if (!email.value || !email.value.includes('@')) {
    errorMsg.value = 'Veuillez saisir une adresse e-mail valide.'
    return
  }
  loading.value = true
  await new Promise((r) => setTimeout(r, 1400))
  loading.value = false
  step.value = 'sent'
}

function retry() {
  step.value = 'request'
  email.value = ''
  errorMsg.value = ''
}
</script>

<template>
  <AuthLayout>
    <Transition name="slide" mode="out-in">
      <!-- ═══ ÉTAPE 1 : formulaire ═══ -->
      <div v-if="step === 'request'" key="request">
        <!-- Lien retour -->
        <router-link
          to="/"
          class="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style="color: var(--muted-foreground)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--primary)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Retour à la connexion
        </router-link>

        <!-- Icône -->
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style="background: var(--secondary)"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="6" width="24" height="17" rx="3" fill="var(--primary)" opacity="0.15" />
            <rect
              x="2"
              y="6"
              width="24"
              height="17"
              rx="3"
              stroke="var(--primary)"
              stroke-width="1.8"
            />
            <path
              d="M2 11l12 7 12-7"
              stroke="var(--primary)"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <circle cx="21" cy="7" r="5" fill="var(--accent)" />
            <path
              d="M21 4.5v3M21 9v.3"
              stroke="var(--foreground)"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <!-- Titre -->
        <div class="mb-7">
          <h1 class="text-3xl font-bold mb-2" style="color: var(--foreground)">
            Mot de passe oublié ?
          </h1>
          <p class="text-sm leading-relaxed" style="color: var(--muted-foreground)">
            Saisissez votre e-mail et nous vous enverrons un lien pour réinitialiser votre mot de
            passe.
          </p>
        </div>

        <!-- Erreur -->
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

        <form @submit.prevent="handleSubmit" novalidate class="space-y-5">
          <!-- ✅ Remplace label + div.relative + svg + input + @focus/@blur -->
          <AppInput
            v-model="email"
            type="email"
            label="Adresse e-mail"
            placeholder="vous@exemple.com"
            autocomplete="email"
            :error="errorMsg && !email ? 'Champ requis' : ''"
          />

          <!-- ✅ Remplace le bouton submit avec loading manuel -->
          <AppButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            :disabled="loading"
            class="w-full justify-center"
            style="box-shadow: 0 4px 16px rgba(31, 122, 62, 0.3)"
          >
            Envoyer le lien
          </AppButton>
        </form>

        <p class="text-xs text-center mt-5" style="color: var(--muted-foreground)">
          Vous n'avez pas reçu l'e-mail ? Vérifiez votre dossier spam.
        </p>
      </div>

      <!-- ═══ ÉTAPE 2 : confirmation ═══ -->
      <div v-else key="sent" class="text-center">
        <!-- Checkmark animé -->
        <div
          class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style="background: var(--secondary)"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="var(--primary)" opacity="0.12" />
            <path
              class="check-path"
              d="M11 20l7 7 12-14"
              stroke="var(--primary)"
              stroke-width="2.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h2 class="text-2xl font-bold mb-3" style="color: var(--foreground)">E-mail envoyé !</h2>
        <p class="text-sm leading-relaxed mb-8" style="color: var(--muted-foreground)">
          Un lien de réinitialisation a été envoyé à<br />
          <strong style="color: var(--primary)">{{ email }}</strong
          >.
        </p>

        <!-- Étapes visuelles (inchangées) -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div class="flex flex-col items-center gap-1">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style="
                background: var(--secondary);
                color: var(--primary);
                border: 1.5px solid var(--primary);
              "
            >
              1
            </div>
            <span class="text-xs" style="color: var(--muted-foreground)">Ouvrir l'e-mail</span>
          </div>
          <div class="w-8 h-px" style="background: var(--border)" />
          <div class="flex flex-col items-center gap-1">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style="
                background: var(--secondary);
                color: var(--primary);
                border: 1.5px solid var(--primary);
              "
            >
              2
            </div>
            <span class="text-xs" style="color: var(--muted-foreground)">Cliquer le lien</span>
          </div>
          <div class="w-8 h-px" style="background: var(--border)" />
          <div class="flex flex-col items-center gap-1">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style="
                background: var(--secondary);
                color: var(--primary);
                border: 1.5px solid var(--primary);
              "
            >
              3
            </div>
            <span class="text-xs" style="color: var(--muted-foreground)">Nouveau mdp</span>
          </div>
        </div>

        <div class="space-y-3">
          <!-- ✅ Remplace le <a> stylé manuellement -->
          <AppButton
            variant="primary"
            size="lg"
            class="w-full justify-center"
            style="box-shadow: 0 4px 16px rgba(31, 122, 62, 0.3)"
            @click="$router.push('/login')"
          >
            Retour à la connexion
          </AppButton>

          <!-- ✅ Remplace le bouton ghost avec @mouseenter/@mouseleave manuels -->
          <AppButton variant="ghost" size="lg" class="w-full justify-center" @click="retry">
            Essayer avec un autre e-mail
          </AppButton>
        </div>
      </div>
    </Transition>
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

.slide-enter-active {
  transition:
    opacity 0.3s,
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-leave-active {
  transition:
    opacity 0.2s,
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.check-path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: drawCheck 0.6s 0.2s ease forwards;
}
@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
