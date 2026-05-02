<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import ComboboxBase from '@/components/ui/ComboboxBase.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()

// ── DONNÉES RÉFÉRENTIELLES ─────────────────────────────────────────────────────
const producteurs = [
  { value: 'prod-001', label: 'Koné Amadou' },
  { value: 'prod-002', label: 'Diabaté Fatoumata' },
  { value: 'prod-003', label: 'Traoré Jean-Pierre' },
  { value: 'prod-004', label: 'Coulibaly Marie' },
]

const produits = [
  { value: 'cacao', label: 'Cacao' },
  { value: 'cafe', label: 'Café' },
  { value: 'coton', label: 'Coton' },
  { value: 'noix', label: 'Noix de cajou' },
]

const chauffeurs = [
  { value: 'ch-001', label: 'Bamba Seydou' },
  { value: 'ch-002', label: 'Ouattara Ibrahima' },
  { value: 'ch-003', label: "N'Guessan Paul" },
]

const vehicules = [
  { value: 'veh-001', label: 'AB 1234 CI — Camion benne' },
  { value: 'veh-002', label: 'CD 5678 CI — Pick-up' },
  { value: 'veh-003', label: 'EF 9012 CI — Tracteur' },
]

// Options décision analyse
const decisionsOptions = [
  { value: 'accepte', label: 'Accepté' },
  { value: 'rejet', label: 'Rejet' },
  { value: 'deuxieme', label: '2ème qualité' },
  { value: 'attente', label: 'En attente' },
]

// ── ÉTAT DU FORMULAIRE ─────────────────────────────────────────────────────────
const form = ref({
  date: new Date().toISOString().split('T')[0],
  numPiece: 'ACH-2026-001',
  producteur: null,
  produit: null,
  telephone: '',
  chauffeur: null,
  connaissement: '',
  vehicule: null,
})

// ── LIGNES DE PESÉE ────────────────────────────────────────────────────────────
let nextId = 4
const pesees = ref([
  {
    id: 1,
    numLot: 'LOT-001',
    poidsBrut: '1250',
    nbSacs: '25',
    poidsNet: '1225',
    dateHeure: new Date().toISOString().slice(0, 16),
    selected: false,
  },
  {
    id: 2,
    numLot: 'LOT-002',
    poidsBrut: '980',
    nbSacs: '20',
    poidsNet: '960',
    dateHeure: new Date().toISOString().slice(0, 16),
    selected: false,
  },
  {
    id: 3,
    numLot: 'LOT-003',
    poidsBrut: '1540',
    nbSacs: '31',
    poidsNet: '1510',
    dateHeure: new Date().toISOString().slice(0, 16),
    selected: false,
  },
])

// ── ANALYSE ────────────────────────────────────────────────────────────────────
const analyse = ref({
  tauxHumidite: '',
  piates: '',
  germes: '',
  mites: '',
  defectueuse: '',
  grainage: '',
  moisie: '',
  ardoisees: '',
  classement: '',
  decision: '',
})

// ── COMPUTED PESÉES ────────────────────────────────────────────────────────────
const totalPoidsBrut = computed(() =>
  pesees.value.reduce((s, p) => s + (parseFloat(p.poidsBrut) || 0), 0),
)
const totalPoidsNet = computed(() =>
  pesees.value.reduce((s, p) => s + (parseFloat(p.poidsNet) || 0), 0),
)
const totalSacs = computed(() => pesees.value.reduce((s, p) => s + (parseInt(p.nbSacs) || 0), 0))

const allSelected = computed({
  get: () => pesees.value.length > 0 && pesees.value.every((p) => p.selected),
  set: (v) => pesees.value.forEach((p) => (p.selected = v)),
})
const someSelected = computed(() => pesees.value.some((p) => p.selected))

// ── ACTIONS ────────────────────────────────────────────────────────────────────
const addRow = () => {
  pesees.value.push({
    id: nextId++,
    numLot: '',
    poidsBrut: '',
    nbSacs: '',
    poidsNet: '',
    dateHeure: new Date().toISOString().slice(0, 16),
    selected: false,
  })
}
const removeSelected = () => {
  pesees.value = pesees.value.filter((p) => !p.selected)
}

const goToPage = () => router.push({ name: 'AchatList' })

// Formater les totaux
const fmt = (n) => n.toLocaleString('fr-CI', { maximumFractionDigits: 2 })
</script>

<template>
  <div class="p-4 sm:p-6 space-y-5 pb-24 md:pb-6">
    <!-- ── PAGE HEADER ──────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div class="min-w-0">
        <h1 class="text-xl font-semibold text-foreground truncate">Saisie — Fiche de Pesée</h1>
        <p class="text-sm text-muted-foreground mt-0.5 hidden sm:block">
          Dossier : {{ form.numPiece }}
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <AppButton variant="ghost" size="md" :hide-text-on-mobile="true" @click="goToPage">
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h8"
              />
            </svg>
          </template>
          Voir achats
        </AppButton>

        <AppButton variant="secondary" size="md" :hide-text-on-mobile="true">
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </template>
          Annuler
        </AppButton>

        <AppButton variant="primary" size="md" :hide-text-on-mobile="true">
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </template>
          Enregistrer
        </AppButton>
      </div>
    </div>

    <!-- ── INFORMATIONS DE PROVENANCE ──────────────────────────────────────── -->
    <div class="bg-card rounded-xl border border-border overflow-hidden" id="info-provenance">
      <div class="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <h2 class="text-sm font-semibold text-foreground">Informations de provenance</h2>
      </div>

      <div class="p-5 space-y-4">
        <!-- Ligne 1 : N° Dossier + Producteur + Produit -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AppInput
            v-model="form.numPiece"
            label="N° Dossier"
            placeholder="ACH-2026-001"
            :disabled="true"
            :mono="true"
            :no-icon="true"
          />

          <div class="flex flex-col gap-1.5">
            <span class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >Producteur</span
            >
            <ComboboxBase
              scroll-container="#info-provenance"
              v-model="form.producteur"
              :items="producteurs"
              placeholder="Sélectionner un producteur…"
              width="100%"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >Produit</span
            >
            <ComboboxBase
              scroll-container="#info-provenance"
              v-model="form.produit"
              :items="produits"
              placeholder="Sélectionner un produit…"
              width="100%"
            />
          </div>
        </div>

        <!-- Ligne 2 : Téléphone + Chauffeur + Véhicule -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AppInput
            v-model="form.telephone"
            label="Téléphone"
            placeholder="+225 07 00 00 00 00"
            :no-icon="true"
          />

          <div class="flex flex-col gap-1.5">
            <span class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >Chauffeur</span
            >
            <ComboboxBase
              scroll-container="#info-provenance"
              v-model="form.chauffeur"
              :items="chauffeurs"
              placeholder="Sélectionner un chauffeur…"
              width="100%"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >Véhicule</span
            >
            <ComboboxBase
              scroll-container="#info-provenance"
              v-model="form.vehicule"
              :items="vehicules"
              placeholder="Sélectionner un véhicule…"
              width="100%"
            />
          </div>
        </div>

        <!-- Ligne 3 : Connaissement -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AppInput
            v-model="form.connaissement"
            label="Connaissement"
            placeholder="BL-2026-XXXX"
            :mono="true"
            :no-icon="true"
          />
        </div>
      </div>
    </div>

    <!-- ── DÉTAILS DES PESÉES ───────────────────────────────────────────────── -->
    <div class="bg-card rounded-xl border border-border overflow-hidden">
      <!-- Header -->
      <div
        class="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30 flex-wrap gap-2"
      >
        <h2 class="text-sm font-semibold text-foreground">Détails des pesées</h2>
        <div class="flex items-center gap-3">
          <button
            @click="addRow"
            class="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Ajouter
          </button>
          <button
            v-if="someSelected"
            @click="removeSelected"
            class="flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Supprimer
          </button>
        </div>
      </div>

      <div class="block overflow-auto" id="pesees-table-wrapper">
        <table class="w-full text-sm min-w-175">
          <thead>
            <tr class="bg-muted/40 border-b border-border">
              <th class="px-3 py-3 w-10 text-left">
                <input
                  type="checkbox"
                  v-model="allSelected"
                  class="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32"
              >
                N° de Lot
              </th>
              <th
                class="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32"
              >
                Poids brut (kg)
              </th>
              <th
                class="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground w-28"
              >
                Nbre de sacs
              </th>
              <th
                class="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground w-32"
              >
                Poids net (kg)
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground w-48"
              >
                Date
              </th>
              <th class="w-8 px-2 py-3"></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-border">
            <tr
              v-for="pesee in pesees"
              :key="pesee.id"
              class="group hover:bg-muted/30 transition-colors"
              :class="pesee.selected ? 'bg-primary/5' : ''"
            >
              <!-- Checkbox -->
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  v-model="pesee.selected"
                  class="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
              </td>

              <!-- N° Lot — text, mono, sans icône -->
              <td class="px-3 py-2">
                <AppInput
                  v-model="pesee.numLot"
                  type="text"
                  placeholder="LOT-XXX"
                  :no-icon="true"
                  :mono="true"
                />
              </td>

              <!-- Poids brut — number, aligné droite -->
              <td class="px-3 py-2">
                <AppInput
                  v-model="pesee.poidsBrut"
                  type="number"
                  placeholder="0"
                  :min="0"
                  :step="0.01"
                />
              </td>

              <!-- Nombre de sacs — number entier -->
              <td class="px-3 py-2">
                <AppInput v-model="pesee.nbSacs" type="number" placeholder="0" :min="0" :step="1" />
              </td>

              <!-- Poids net — number, aligné droite -->
              <td class="px-3 py-2">
                <AppInput
                  v-model="pesee.poidsNet"
                  type="number"
                  placeholder="0"
                  :min="0"
                  :step="0.01"
                />
              </td>

              <!-- Date et heure — type datetime-local, sans icône -->
              <td class="px-3 py-2">
                <AppInput v-model="pesee.dateHeure" type="date" :no-icon="true" />
              </td>

              <!-- Supprimer ligne -->
              <td class="px-2 py-2">
                <button
                  @click="pesees.splice(pesees.indexOf(pesee), 1)"
                  class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>

          <!-- Totaux -->
          <tfoot>
            <tr class="bg-muted/20 border-t-2 border-border">
              <td
                colspan="2"
                class="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Totaux
              </td>
              <td class="px-3 py-2.5 text-xs font-bold font-mono text-right text-foreground">
                {{ fmt(totalPoidsBrut) }} kg
              </td>
              <td class="px-3 py-2.5 text-xs font-bold font-mono text-right text-foreground">
                {{ totalSacs }} sacs
              </td>
              <td class="px-3 py-2.5 text-xs font-bold font-mono text-right text-primary">
                {{ fmt(totalPoidsNet) }} kg
              </td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Footer table -->
      <div class="px-5 py-3 border-t border-border">
        <button
          @click="addRow"
          class="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Ajouter une ligne
        </button>
      </div>
    </div>

    <!-- ── BULLETIN D'ANALYSE ────────────────────────────────────────────────── -->
    <div class="bg-card rounded-xl border border-border overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <div>
          <h2 class="text-sm font-semibold text-foreground">Bulletin d'analyse</h2>
          <p class="text-xs text-muted-foreground mt-0.5">
            Résultats du contrôle qualité — tous les taux en %
          </p>
        </div>
      </div>

      <div class="p-5 space-y-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AppInput
            v-model="analyse.tauxHumidite"
            label="Taux d'humidité"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.piates"
            label="Piates"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.germes"
            label="Germés"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.mites"
            label="Mitées"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.defectueuse"
            label="Défectueuse"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.grainage"
            label="Grainage"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.moisie"
            label="Moisie"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />
          <AppInput
            v-model="analyse.ardoisees"
            label="Ardoisées"
            placeholder="0.00"
            :no-icon="true"
            :mono="true"
          />

          <AppInput
            v-model="analyse.classement"
            label="Classement"
            placeholder="Ex : Grade A"
            :no-icon="true"
          />

          <!-- ✅ AppSelect pour la décision -->
          <AppSelect
            v-model="analyse.decision"
            label="Décision"
            placeholder="Choisir une décision…"
            :options="decisionsOptions"
            :required="true"
          />
        </div>
      </div>
    </div>

    <!-- ── FOOTER MOBILE FIXE ───────────────────────────────────────────────── -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3.5 flex items-center justify-end gap-3 z-20 md:hidden"
    >
      <AppButton variant="secondary" size="md">Annuler</AppButton>
      <AppButton variant="primary" size="md" class="px-6">Enregistrer</AppButton>
    </div>
  </div>
</template>
