<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ComboboxBase from '@/components/ui/ComboboxBase.vue'

const router = useRouter()

// ─── STATE ────────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const filterStatut = ref('all')
const periodeLabel = ref('Janvier 2026')
const pageSize = ref(8)
const currentPage = ref(1)

const showDetailModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const selectedDossier = ref(null)
const dossierToDelete = ref(null)

// ─── RÉFÉRENTIELS EDIT ────────────────────────────────────────────────────────
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
const decisionsOptions = [
  { value: 'accepte', label: 'Accepté' },
  { value: 'rejet', label: 'Rejet' },
  { value: 'attente', label: 'En attente' },
]
const statutOptions = [
  { value: 'En attente', label: 'En attente' },
  { value: 'Payé', label: 'Payé' },
  { value: 'Annulé', label: 'Annulé' },
]

// ─── DONNÉES — DOSSIERS ───────────────────────────────────────────────────────
// Chaque dossier = 1 fiche complète avec pesées + analyse
const dossiers = ref([
  {
    id: 1,
    numPiece: 'ACH-2026-001',
    date: '2026-01-02',
    statut: 'Payé',
    producteur: 'prod-001',
    produit: 'cacao',
    telephone: '+225 07 00 11 22',
    chauffeur: 'ch-001',
    vehicule: 'veh-001',
    connaissement: 'BL-2026-001',
    pesees: [
      {
        id: 1,
        numLot: 'LOT-001',
        poidsBrut: 1250,
        nbSacs: 25,
        poidsNet: 1225,
        dateHeure: '2026-01-02T08:30',
      },
      {
        id: 2,
        numLot: 'LOT-002',
        poidsBrut: 980,
        nbSacs: 20,
        poidsNet: 960,
        dateHeure: '2026-01-02T09:15',
      },
    ],
    analyse: {
      tauxHumidite: 8.2,
      piates: 1.5,
      germes: 0.8,
      mites: 0.3,
      defectueuse: 2.1,
      grainage: 94.5,
      moisie: 0.5,
      ardoisees: 1.2,
      classement: 'Grade A',
      decision: 'accepte',
    },
  },
  {
    id: 2,
    numPiece: 'ACH-2026-002',
    date: '2026-01-05',
    statut: 'En attente',
    producteur: 'prod-002',
    produit: 'cafe',
    telephone: '+225 05 44 33 22',
    chauffeur: 'ch-002',
    vehicule: 'veh-002',
    connaissement: 'BL-2026-002',
    pesees: [
      {
        id: 1,
        numLot: 'LOT-003',
        poidsBrut: 540,
        nbSacs: 12,
        poidsNet: 528,
        dateHeure: '2026-01-05T10:00',
      },
    ],
    analyse: {
      tauxHumidite: 11.5,
      piates: 3.2,
      germes: 1.1,
      mites: 0.6,
      defectueuse: 4.0,
      grainage: 88.0,
      moisie: 1.8,
      ardoisees: 2.5,
      classement: 'Grade B',
      decision: 'deuxieme',
    },
  },
  {
    id: 3,
    numPiece: 'ACH-2026-003',
    date: '2026-01-10',
    statut: 'Payé',
    producteur: 'prod-003',
    produit: 'cacao',
    telephone: '+225 01 23 45 67',
    chauffeur: 'ch-003',
    vehicule: 'veh-001',
    connaissement: 'BL-2026-003',
    pesees: [
      {
        id: 1,
        numLot: 'LOT-004',
        poidsBrut: 2100,
        nbSacs: 42,
        poidsNet: 2058,
        dateHeure: '2026-01-10T07:45',
      },
      {
        id: 2,
        numLot: 'LOT-005',
        poidsBrut: 1800,
        nbSacs: 36,
        poidsNet: 1764,
        dateHeure: '2026-01-10T09:00',
      },
      {
        id: 3,
        numLot: 'LOT-006',
        poidsBrut: 950,
        nbSacs: 19,
        poidsNet: 931,
        dateHeure: '2026-01-10T10:30',
      },
    ],
    analyse: {
      tauxHumidite: 7.8,
      piates: 1.0,
      germes: 0.5,
      mites: 0.2,
      defectueuse: 1.5,
      grainage: 96.0,
      moisie: 0.3,
      ardoisees: 0.8,
      classement: 'Grade A+',
      decision: 'accepte',
    },
  },
  {
    id: 4,
    numPiece: 'ACH-2026-004',
    date: '2026-01-15',
    statut: 'Annulé',
    producteur: 'prod-004',
    produit: 'noix',
    telephone: '+225 07 88 99 00',
    chauffeur: 'ch-001',
    vehicule: 'veh-003',
    connaissement: 'BL-2026-004',
    pesees: [
      {
        id: 1,
        numLot: 'LOT-007',
        poidsBrut: 760,
        nbSacs: 15,
        poidsNet: 745,
        dateHeure: '2026-01-15T08:00',
      },
    ],
    analyse: {
      tauxHumidite: 14.2,
      piates: 6.5,
      germes: 2.3,
      mites: 1.8,
      defectueuse: 7.1,
      grainage: 78.5,
      moisie: 3.2,
      ardoisees: 4.1,
      classement: 'Hors grade',
      decision: 'rejet',
    },
  },
])

// ─── FORMULAIRE ÉDITION (deep copy du dossier sélectionné) ────────────────────
const editForm = reactive({
  id: null,
  numPiece: '',
  date: '',
  statut: '',
  producteur: null,
  produit: null,
  telephone: '',
  chauffeur: null,
  vehicule: null,
  connaissement: '',
  pesees: [],
  analyse: {
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
  },
})

let nextPeseeId = 100

// ─── COMPUTED ─────────────────────────────────────────────────────────────────
const labelProducteur = (v) => producteurs.find((p) => p.value === v)?.label ?? '—'
const labelProduit = (v) => produits.find((p) => p.value === v)?.label ?? '—'

const stats = computed(() => {
  const total = dossiers.value.length
  const attente = dossiers.value.filter((d) => d.statut === 'En attente').length
  const payes = dossiers.value.filter((d) => d.statut === 'Payé').length
  const annules = dossiers.value.filter((d) => d.statut === 'Annulé').length
  const totalKg = dossiers.value.reduce(
    (s, d) => s + d.pesees.reduce((ss, p) => ss + (parseFloat(p.poidsNet) || 0), 0),
    0,
  )
  return { total, attente, payes, annules, totalKg }
})

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return dossiers.value.filter((d) => {
    const matchQ =
      !q ||
      d.numPiece.toLowerCase().includes(q) ||
      labelProducteur(d.producteur).toLowerCase().includes(q) ||
      labelProduit(d.produit).toLowerCase().includes(q) ||
      d.connaissement.toLowerCase().includes(q)
    return matchQ && (filterStatut.value === 'all' || d.statut === filterStatut.value)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))
const paged = computed(() => {
  const s = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(s, s + pageSize.value)
})
const paginationLabel = computed(() => {
  const total = filtered.value.length
  const s = Math.min((currentPage.value - 1) * pageSize.value + 1, total)
  const e = Math.min(currentPage.value * pageSize.value, total)
  return total ? `${s} – ${e} sur ${total}` : '0 résultat'
})

// Totaux pesées dans le modal edit
const editTotalBrut = computed(() =>
  editForm.pesees.reduce((s, p) => s + (parseFloat(p.poidsBrut) || 0), 0),
)
const editTotalNet = computed(() =>
  editForm.pesees.reduce((s, p) => s + (parseFloat(p.poidsNet) || 0), 0),
)
const editTotalSacs = computed(() =>
  editForm.pesees.reduce((s, p) => s + (parseInt(p.nbSacs) || 0), 0),
)

const fmtKg = (n) =>
  n ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n) + ' kg' : '—'
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────
function goToCreate() {
  router.push({ name: 'AchatCreate' })
}

function openEdit(dossier, event) {
  event?.stopPropagation()
  showDetailModal.value = false
  // Deep copy
  Object.assign(editForm, {
    id: dossier.id,
    numPiece: dossier.numPiece,
    date: dossier.date,
    statut: dossier.statut,
    producteur: dossier.producteur,
    produit: dossier.produit,
    telephone: dossier.telephone,
    chauffeur: dossier.chauffeur,
    vehicule: dossier.vehicule,
    connaissement: dossier.connaissement,
    pesees: dossier.pesees.map((p) => ({ ...p })),
    analyse: { ...dossier.analyse },
  })
  showEditModal.value = true
}

function addEditPesee() {
  editForm.pesees.push({
    id: nextPeseeId++,
    numLot: '',
    poidsBrut: '',
    nbSacs: '',
    poidsNet: '',
    dateHeure: new Date().toISOString().slice(0, 16),
  })
}

function removeEditPesee(idx) {
  editForm.pesees.splice(idx, 1)
}

function saveEdit() {
  const idx = dossiers.value.findIndex((d) => d.id === editForm.id)
  if (idx !== -1) {
    dossiers.value[idx] = {
      ...dossiers.value[idx],
      numPiece: editForm.numPiece,
      date: editForm.date,
      statut: editForm.statut,
      producteur: editForm.producteur,
      produit: editForm.produit,
      telephone: editForm.telephone,
      chauffeur: editForm.chauffeur,
      vehicule: editForm.vehicule,
      connaissement: editForm.connaissement,
      pesees: editForm.pesees.map((p) => ({ ...p })),
      analyse: { ...editForm.analyse },
    }
  }
  showEditModal.value = false
}

function askDelete(dossier, event) {
  event?.stopPropagation()
  dossierToDelete.value = dossier
  showDeleteModal.value = true
}

function confirmDelete() {
  if (!dossierToDelete.value) return
  dossiers.value = dossiers.value.filter((d) => d.id !== dossierToDelete.value.id)
  if (selectedDossier.value?.id === dossierToDelete.value.id) {
    showDetailModal.value = false
    selectedDossier.value = null
  }
  dossierToDelete.value = null
  showDeleteModal.value = false
}

// ─── STATUT COLORS ────────────────────────────────────────────────────────────
const statutColor = {
  Payé: 'text-emerald-700 bg-emerald-50 border border-emerald-200',
  'En attente': 'text-amber-700   bg-amber-50   border border-amber-200',
  Annulé: 'text-red-600     bg-red-50     border border-red-200',
}
const statutDot = {
  Payé: 'bg-emerald-500',
  'En attente': 'bg-amber-400',
  Annulé: 'bg-red-400',
}
const decisionColor = {
  accepte: 'text-emerald-700 bg-emerald-50 border border-emerald-200',
  rejet: 'text-red-600     bg-red-50     border border-red-200',
  deuxieme: 'text-amber-700   bg-amber-50   border border-amber-200',
  attente: 'text-blue-700    bg-blue-50    border border-blue-200',
}
const decisionLabel = {
  accepte: 'Accepté',
  rejet: 'Rejet',
  attente: 'En attente',
}

watch([searchQuery, filterStatut], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="p-4 sm:p-6 space-y-4 sm:space-y-5">
    <div class="flex items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-xl font-semibold text-foreground truncate">Dossiers Achats</h1>
        <p class="text-sm text-muted-foreground mt-0.5 hidden sm:block">
          Journal : ACHATS LOCAUX / {{ periodeLabel }}
        </p>
      </div>
      <AppButton variant="primary" size="md" @click="goToCreate">
        <template #icon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </template>
        <span class="hidden sm:inline">Nouveau dossier</span>
      </AppButton>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Total dossiers -->
      <div class="bg-card rounded-xl border border-border shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
            >Dossiers</span
          >
          <div class="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <svg
              class="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-foreground font-mono leading-none">{{ stats.total }}</p>
        <p class="text-xs text-muted-foreground mt-2">Dossiers ce mois</p>
      </div>
      <!-- En attente -->
      <div class="bg-card rounded-xl border border-border shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
            >En attente</span
          >
          <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <svg
              class="w-4 h-4 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-amber-500 leading-none">{{ stats.attente }}</p>
        <p class="text-xs text-muted-foreground mt-2">À valider</p>
      </div>
      <!-- Payés -->
      <div class="bg-card rounded-xl border border-border shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
            >Payés</span
          >
          <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <svg
              class="w-4 h-4 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-emerald-500 leading-none">{{ stats.payes }}</p>
        <p class="text-xs text-muted-foreground mt-2">Dossiers soldés</p>
      </div>
      <!-- Total poids net -->
      <div class="bg-card rounded-xl border border-border shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
            >Poids Net</span
          >
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-foreground font-mono leading-none">
          {{ fmtKg(stats.totalKg) }}
        </p>
        <p class="text-xs text-muted-foreground mt-2">Total réceptionné</p>
      </div>
    </div>

    <!-- ── TABLEAU ────────────────────────────────────────────────────────────── -->
    <div class="bg-card rounded-xl border border-border shadow-sm overflow-auto">
      <!-- Toolbar -->
      <div class="px-4 sm:px-5 py-3.5 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Période -->
            <div class="flex items-center gap-1.5 shrink-0">
              <svg
                class="w-3.5 h-3.5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <input
                v-model="periodeLabel"
                class="text-sm font-medium text-foreground w-32 bg-transparent border-b border-dashed border-border focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div class="w-px h-5 bg-border hidden sm:block" />
            <!-- Recherche -->
            <div class="relative flex-1 min-w-[160px]">
              <svg
                class="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="N° dossier, producteur, produit..."
                class="w-full pl-8 pr-3 py-1.5 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <!-- Filtre statut -->
            <div class="relative">
              <select
                v-model="filterStatut"
                class="appearance-none text-sm pl-3 pr-7 py-1.5 bg-background border border-border rounded-lg text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="all">Tous</option>
                <option value="Payé">Payé</option>
                <option value="En attente">En attente</option>
                <option value="Annulé">Annulé</option>
              </select>
              <svg
                class="w-3 h-3 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
            <!-- Export -->
            <button
              class="flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-2.5 py-1.5 hover:bg-muted hover:text-foreground transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span class="hidden sm:inline text-xs">Exporter</span>
            </button>
          </div>
          <!-- Pagination toolbar -->
          <div class="flex items-center justify-start lg:justify-end gap-2">
            <span class="text-xs text-muted-foreground font-mono shrink-0">{{
              paginationLabel
            }}</span>
            <div class="relative">
              <select
                v-model.number="pageSize"
                class="appearance-none text-xs pl-2.5 pr-6 py-1.5 bg-background border border-border rounded-lg text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option :value="5">5 / page</option>
                <option :value="8">8 / page</option>
                <option :value="15">15 / page</option>
              </select>
              <svg
                class="w-3 h-3 text-muted-foreground absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
            <div class="flex items-center gap-1">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <template v-for="p in totalPages" :key="p">
                <button
                  v-if="Math.abs(p - currentPage) <= 1 || p === 1 || p === totalPages"
                  @click="currentPage = p"
                  class="w-7 h-7 flex items-center justify-center rounded-md border text-xs font-medium transition-colors"
                  :class="
                    p === currentPage
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  "
                >
                  {{ p }}
                </button>
                <span
                  v-else-if="
                    (p === 2 && currentPage > 3) ||
                    (p === totalPages - 1 && currentPage < totalPages - 2)
                  "
                  class="text-muted-foreground text-xs px-0.5"
                  >…</span
                >
              </template>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Desktop -->
      <div class="block overflow-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-muted/40 border-b border-border">
              <th
                class="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 w-36"
              >
                N° Dossier
              </th>
              <th
                class="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-24"
              >
                Date
              </th>
              <th
                class="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3"
              >
                Producteur
              </th>
              <th
                class="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-28"
              >
                Produit
              </th>
              <th
                class="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-28"
              >
                Poids net
              </th>
              <th
                class="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-20"
              >
                Lots
              </th>
              <th
                class="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-28"
              >
                Décision
              </th>
              <th
                class="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-3 w-28"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="d in paged"
              :key="d.id"
              class="border-b border-border transition-colors hover:bg-primary/5 cursor-pointer"
              @click="openDetail(d)"
            >
              <td class="px-4 py-3">
                <span
                  class="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded"
                  >{{ d.numPiece }}</span
                >
              </td>
              <td class="px-3 py-3 text-xs font-mono text-muted-foreground">{{ d.date }}</td>
              <td class="px-3 py-3">
                <span class="text-sm text-foreground">{{ labelProducteur(d.producteur) }}</span>
              </td>
              <td class="px-3 py-3">
                <span
                  class="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded"
                  >{{ labelProduit(d.produit) }}</span
                >
              </td>
              <td class="px-3 py-3 text-right">
                <span class="text-sm font-mono font-semibold text-foreground">
                  {{ fmtKg(d.pesees.reduce((s, p) => s + (parseFloat(p.poidsNet) || 0), 0)) }}
                </span>
              </td>
              <td class="px-3 py-3 text-center">
                <span class="text-sm font-mono text-muted-foreground">{{ d.pesees.length }}</span>
              </td>
              <td class="px-3 py-3">
                <span
                  class="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full"
                  :class="decisionColor[d.analyse.decision]"
                >
                  {{ decisionLabel[d.analyse.decision] ?? '—' }}
                </span>
              </td>
              <td class="px-3 py-3">
                <div class="flex items-center justify-center gap-1">
                  <button
                    @click.stop="openEdit(d, $event)"
                    title="Modifier"
                    class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-amber-600 hover:bg-amber-50 transition-all"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click.stop="askDelete(d, $event)"
                    title="Supprimer"
                    class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!paged.length">
              <td colspan="9" class="text-center py-16 text-muted-foreground text-sm">
                <svg
                  class="w-10 h-10 mx-auto mb-3 text-border"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Aucun dossier trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════════════
       MODAL — VOIR DÉTAILS
  ════════════════════════════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDetailModal && selectedDossier"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm"
        @click.self="showDetailModal = false"
      >
        <div
          class="bg-card rounded-t-2xl sm:rounded-2xl shadow-xl border border-border w-full sm:max-w-lg max-h-[85vh] overflow-y-auto"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10"
          >
            <div class="flex items-center gap-2 flex-wrap">
              <span
                class="text-sm font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded"
                >{{ selectedDossier.numPiece }}</span
              >
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                :class="statutColor[selectedDossier.statut]"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="statutDot[selectedDossier.statut]"
                />{{ selectedDossier.statut }}
              </span>
            </div>
            <button
              @click="showDetailModal = false"
              class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Body -->
          <div class="p-5 space-y-4">
            <!-- Provenance -->
            <div class="bg-muted/40 rounded-xl border border-border p-4 space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Provenance
              </p>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p class="text-xs text-muted-foreground mb-0.5">Producteur</p>
                  <p class="font-medium text-foreground">
                    {{ labelProducteur(selectedDossier.producteur) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground mb-0.5">Produit</p>
                  <p class="font-medium text-primary">
                    {{ labelProduit(selectedDossier.produit) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground mb-0.5">Téléphone</p>
                  <p class="font-mono text-foreground text-xs">
                    {{ selectedDossier.telephone || '—' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground mb-0.5">Connaissement</p>
                  <p class="font-mono text-foreground text-xs">
                    {{ selectedDossier.connaissement }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Pesées -->
            <div class="bg-muted/40 rounded-xl border border-border p-4 space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Pesées — {{ selectedDossier.pesees.length }} lot(s)
              </p>
              <div class="space-y-2">
                <div
                  v-for="p in selectedDossier.pesees"
                  :key="p.id"
                  class="flex items-center justify-between text-xs bg-card rounded-lg border border-border px-3 py-2"
                >
                  <span class="font-mono font-semibold text-foreground">{{ p.numLot }}</span>
                  <span class="text-muted-foreground">{{ p.nbSacs }} sacs</span>
                  <span class="font-mono text-foreground">{{ fmtKg(p.poidsNet) }}</span>
                </div>
              </div>
              <div class="border-t border-border pt-2 flex justify-between text-xs font-semibold">
                <span class="text-muted-foreground">Total net</span>
                <span class="font-mono text-primary">{{
                  fmtKg(
                    selectedDossier.pesees.reduce((s, p) => s + (parseFloat(p.poidsNet) || 0), 0),
                  )
                }}</span>
              </div>
            </div>
            <!-- Analyse -->
            <div class="bg-muted/40 rounded-xl border border-border p-4 space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Analyse
                </p>
                <span
                  class="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full"
                  :class="decisionColor[selectedDossier.analyse.decision]"
                >
                  {{ decisionLabel[selectedDossier.analyse.decision] ?? '—' }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p class="text-muted-foreground">Humidité</p>
                  <p class="font-mono font-semibold text-foreground">
                    {{ selectedDossier.analyse.tauxHumidite }}%
                  </p>
                </div>
                <div>
                  <p class="text-muted-foreground">Grainage</p>
                  <p class="font-mono font-semibold text-foreground">
                    {{ selectedDossier.analyse.grainage }}%
                  </p>
                </div>
                <div>
                  <p class="text-muted-foreground">Classement</p>
                  <p class="font-medium text-foreground">
                    {{ selectedDossier.analyse.classement }}
                  </p>
                </div>
                <div>
                  <p class="text-muted-foreground">Piates</p>
                  <p class="font-mono text-foreground">{{ selectedDossier.analyse.piates }}%</p>
                </div>
                <div>
                  <p class="text-muted-foreground">Germés</p>
                  <p class="font-mono text-foreground">{{ selectedDossier.analyse.germes }}%</p>
                </div>
                <div>
                  <p class="text-muted-foreground">Mitées</p>
                  <p class="font-mono text-foreground">{{ selectedDossier.analyse.mites }}%</p>
                </div>
                <div>
                  <p class="text-muted-foreground">Défect.</p>
                  <p class="font-mono text-foreground">
                    {{ selectedDossier.analyse.defectueuse }}%
                  </p>
                </div>
                <div>
                  <p class="text-muted-foreground">Moisie</p>
                  <p class="font-mono text-foreground">{{ selectedDossier.analyse.moisie }}%</p>
                </div>
                <div>
                  <p class="text-muted-foreground">Ardoisées</p>
                  <p class="font-mono text-foreground">{{ selectedDossier.analyse.ardoisees }}%</p>
                </div>
              </div>
            </div>
            <!-- Actions -->
            <div class="flex gap-2 pt-1">
              <button
                @click="openEdit(selectedDossier, $event)"
                class="flex-1 flex items-center justify-center gap-2 text-sm font-medium border border-border rounded-lg py-2 text-foreground hover:bg-muted transition-colors"
              >
                <svg
                  class="w-4 h-4 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Modifier
              </button>
              <button
                @click="askDelete(selectedDossier, $event)"
                class="flex-1 flex items-center justify-center gap-2 text-sm font-medium border border-destructive/20 rounded-lg py-2 text-destructive hover:bg-destructive/5 transition-colors"
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
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ═══════════════════════════════════════════════════════════════════════════
       MODAL — MODIFIER (3 sections : Provenance + Pesées + Analyse)
  ════════════════════════════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm"
        @click.self="showEditModal = false"
      >
        <div
          class="bg-card rounded-t-2xl sm:rounded-2xl shadow-xl border border-border w-full sm:max-w-3xl max-h-[95vh] overflow-y-auto"
          id="edit-modal-scroll"
        >
          <!-- Header sticky -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="text-base font-semibold text-foreground">Modifier le dossier</h2>
                <p class="text-xs text-muted-foreground mt-0.5">{{ editForm.numPiece }}</p>
              </div>
            </div>
            <button
              @click="showEditModal = false"
              class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <!-- ── 1. INFORMATIONS DE PROVENANCE ──────────────────────────── -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shrink-0"
                >
                  1
                </div>
                <h3 class="text-sm font-semibold text-foreground">Informations de provenance</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4" id="edit-provenance">
                <!-- N° Dossier -->
                <AppInput
                  v-model="editForm.numPiece"
                  label="N° Dossier"
                  :disabled="true"
                  :mono="true"
                  :no-icon="true"
                />
                <!-- Date -->
                <AppInput v-model="editForm.date" label="Date" type="date" />
                <!-- Statut -->
                <AppSelect v-model="editForm.statut" label="Statut" :options="statutOptions" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Producteur -->
                <div class="flex flex-col gap-1.5">
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >Producteur</span
                  >
                  <ComboboxBase
                    scroll-container="#edit-modal-scroll"
                    v-model="editForm.producteur"
                    :items="producteurs"
                    placeholder="Sélectionner…"
                    width="100%"
                  />
                </div>
                <!-- Produit -->
                <div class="flex flex-col gap-1.5">
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >Produit</span
                  >
                  <ComboboxBase
                    scroll-container="#edit-modal-scroll"
                    v-model="editForm.produit"
                    :items="produits"
                    placeholder="Sélectionner…"
                    width="100%"
                  />
                </div>
                <!-- Téléphone -->
                <AppInput
                  v-model="editForm.telephone"
                  label="Téléphone"
                  placeholder="+225 07 00 00 00 00"
                  :no-icon="true"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Chauffeur -->
                <div class="flex flex-col gap-1.5">
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >Chauffeur</span
                  >
                  <ComboboxBase
                    scroll-container="#edit-modal-scroll"
                    v-model="editForm.chauffeur"
                    :items="chauffeurs"
                    placeholder="Sélectionner…"
                    width="100%"
                  />
                </div>
                <!-- Véhicule -->
                <div class="flex flex-col gap-1.5">
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >Véhicule</span
                  >
                  <ComboboxBase
                    scroll-container="#edit-modal-scroll"
                    v-model="editForm.vehicule"
                    :items="vehicules"
                    placeholder="Sélectionner…"
                    width="100%"
                  />
                </div>
                <!-- Connaissement -->
                <AppInput
                  v-model="editForm.connaissement"
                  label="Connaissement"
                  placeholder="BL-2026-XXXX"
                  :mono="true"
                  :no-icon="true"
                />
              </div>
            </div>

            <div class="border-t border-border" />

            <!-- ── 2. DÉTAILS DES PESÉES ───────────────────────────────────── -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    class="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shrink-0"
                  >
                    2
                  </div>
                  <h3 class="text-sm font-semibold text-foreground">Détails des pesées</h3>
                </div>
                <button
                  @click="addEditPesee"
                  class="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Ajouter un lot
                </button>
              </div>

              <!-- Table pesées éditable -->
              <div class="overflow-auto rounded-xl border border-border">
                <table class="w-full text-xs min-w-[560px]">
                  <thead>
                    <tr class="bg-muted/40 border-b border-border">
                      <th
                        class="px-3 py-2 text-left font-semibold uppercase tracking-wide text-muted-foreground w-28"
                      >
                        N° Lot
                      </th>
                      <th
                        class="px-3 py-2 text-right font-semibold uppercase tracking-wide text-muted-foreground w-28"
                      >
                        Poids brut
                      </th>
                      <th
                        class="px-3 py-2 text-right font-semibold uppercase tracking-wide text-muted-foreground w-24"
                      >
                        Nbre sacs
                      </th>
                      <th
                        class="px-3 py-2 text-right font-semibold uppercase tracking-wide text-muted-foreground w-28"
                      >
                        Poids net
                      </th>
                      <th
                        class="px-3 py-2 text-left font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        Date / Heure
                      </th>
                      <th class="w-8 px-2 py-2" />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border">
                    <tr v-for="(p, idx) in editForm.pesees" :key="p.id" class="group">
                      <td class="px-3 py-1.5">
                        <AppInput
                          v-model="p.numLot"
                          type="text"
                          size="sm"
                          placeholder="LOT-XXX"
                          :no-icon="true"
                          :mono="true"
                        />
                      </td>
                      <td class="px-3 py-1.5">
                        <AppInput
                          v-model="p.poidsBrut"
                          type="number"
                          size="sm"
                          placeholder="0"
                          :min="0"
                          :step="0.01"
                        />
                      </td>
                      <td class="px-3 py-1.5">
                        <AppInput
                          v-model="p.nbSacs"
                          type="number"
                          size="sm"
                          placeholder="0"
                          :min="0"
                          :step="1"
                        />
                      </td>
                      <td class="px-3 py-1.5">
                        <AppInput
                          v-model="p.poidsNet"
                          type="number"
                          size="sm"
                          placeholder="0"
                          :min="0"
                          :step="0.01"
                        />
                      </td>
                      <td class="px-3 py-1.5">
                        <AppInput v-model="p.dateHeure" type="date" size="sm" :no-icon="true" />
                      </td>
                      <td class="px-2 py-1.5">
                        <button
                          @click="removeEditPesee(idx)"
                          class="w-6 h-6 flex items-center justify-center rounded text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <svg
                            class="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                    <tr v-if="!editForm.pesees.length">
                      <td colspan="6" class="text-center py-6 text-muted-foreground text-xs">
                        Aucune pesée — cliquez sur « Ajouter un lot »
                      </td>
                    </tr>
                  </tbody>
                  <!-- Totaux -->
                  <tfoot v-if="editForm.pesees.length">
                    <tr class="bg-muted/20 border-t-2 border-border">
                      <td class="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Totaux
                      </td>
                      <td class="px-3 py-2 text-xs font-bold font-mono text-right text-foreground">
                        {{ fmtKg(editTotalBrut) }}
                      </td>
                      <td class="px-3 py-2 text-xs font-bold font-mono text-right text-foreground">
                        {{ editTotalSacs }} sacs
                      </td>
                      <td class="px-3 py-2 text-xs font-bold font-mono text-right text-primary">
                        {{ fmtKg(editTotalNet) }}
                      </td>
                      <td colspan="2" />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class="border-t border-border" />

            <!-- ── 3. BULLETIN D'ANALYSE ───────────────────────────────────── -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shrink-0"
                >
                  3
                </div>
                <h3 class="text-sm font-semibold text-foreground">Bulletin d'analyse</h3>
                <span class="text-xs text-muted-foreground">(taux en %)</span>
              </div>
              <!-- Ligne 1 -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <AppInput
                  v-model="editForm.analyse.tauxHumidite"
                  label="Humidité"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.piates"
                  label="Piates"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.germes"
                  label="Germés"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.mites"
                  label="Mitées"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
              </div>
              <!-- Ligne 2 -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <AppInput
                  v-model="editForm.analyse.defectueuse"
                  label="Défectueuse"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.grainage"
                  label="Grainage"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.moisie"
                  label="Moisie"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
                <AppInput
                  v-model="editForm.analyse.ardoisees"
                  label="Ardoisées"
                  type="number"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  suffix="%"
                  :no-icon="true"
                />
              </div>
              <!-- Classement + Décision -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <AppInput
                  v-model="editForm.analyse.classement"
                  label="Classement"
                  placeholder="Ex : Grade A"
                  :no-icon="true"
                />
                <AppSelect
                  v-model="editForm.analyse.decision"
                  label="Décision"
                  :options="decisionsOptions"
                  :required="true"
                />
              </div>
            </div>

            <!-- ── FOOTER ACTIONS ─────────────────────────────────────────── -->
            <div class="flex flex-col-reverse sm:flex-row gap-2 pt-2 border-t border-border">
              <AppButton
                variant="secondary"
                size="md"
                class="w-full sm:w-auto"
                @click="showEditModal = false"
              >
                Annuler
              </AppButton>
              <AppButton
                variant="primary"
                size="md"
                class="w-full sm:flex-1 justify-center"
                @click="saveEdit"
              >
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
                Enregistrer les modifications
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ═══════════════════════════════════════════════════════════════════════════
       MODAL — CONFIRMER SUPPRESSION
  ════════════════════════════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showDeleteModal && dossierToDelete"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="showDeleteModal = false"
      >
        <div
          class="bg-card rounded-2xl shadow-xl border border-border w-full max-w-sm p-6 space-y-5"
        >
          <div class="flex flex-col items-center text-center gap-3">
            <div class="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg
                class="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-foreground">Supprimer ce dossier ?</h3>
              <p class="text-sm text-muted-foreground mt-1">Cette action est irréversible.</p>
            </div>
          </div>
          <div class="bg-muted/50 rounded-xl border border-border px-4 py-3 space-y-1.5">
            <span
              class="text-xs font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded"
              >{{ dossierToDelete.numPiece }}</span
            >
            <p class="text-sm text-foreground mt-1.5">
              {{ labelProducteur(dossierToDelete.producteur) }} ·
              {{ labelProduit(dossierToDelete.produit) }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ dossierToDelete.pesees.length }} lot(s) ·
              {{
                fmtKg(dossierToDelete.pesees.reduce((s, p) => s + (parseFloat(p.poidsNet) || 0), 0))
              }}
            </p>
          </div>
          <div class="flex gap-3">
            <AppButton
              variant="secondary"
              size="md"
              class="flex-1 justify-center"
              @click="showDeleteModal = false"
              >Annuler</AppButton
            >
            <AppButton
              variant="danger"
              size="md"
              class="flex-1 justify-center"
              @click="confirmDelete"
            >
              <template #icon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </template>
              Supprimer
            </AppButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
