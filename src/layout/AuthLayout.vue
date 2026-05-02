<script setup>
// AuthLayout.vue — Layout partagé auth
// Vue 3 (sans TypeScript), Tailwind v4, thème style.css vert
</script>

<template>
  <div class="min-h-screen flex bg-[var(--background)]">
    <!-- ══════════════════════════════════════════
         PANNEAU GAUCHE — image Pexels + overlay
    ═══════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:px-14 relative">
      <!-- Logo mobile -->
      <div class="absolute top-6 left-6 flex items-center gap-2 lg:hidden">
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center"
          style="background: var(--primary)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 8v14h6v-7h4v7h6V8L12 2z" fill="white" />
          </svg>
        </div>
        <span class="text-lg font-bold" style="color: var(--foreground)">
          EcoFreight<span style="color: var(--primary)">.</span>
        </span>
      </div>

      <div class="w-full max-w-[400px]">
        <slot />
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         PANNEAU DROIT — slot formulaire
    ═══════════════════════════════════════════ -->
    <div class="hidden lg:flex lg:w-[52%] relative overflow-hidden" aria-hidden="true">
      <!-- Image Pexels : port cargo logistique -->
      <img
        src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Overlay dégradé vert -->
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            135deg,
            rgba(15, 46, 28, 0.92) 0%,
            rgba(31, 122, 62, 0.78) 55%,
            rgba(63, 163, 77, 0.5) 100%
          );
        "
      />

      <!-- Contenu -->
      <div class="relative z-10 flex flex-col justify-between h-full w-full p-12">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style="background: var(--accent)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 8v14h6v-7h4v7h6V8L12 2z" fill="#0f2e1c" />
            </svg>
          </div>
          <span class="text-white text-2xl font-bold tracking-tight">
            EcoFreight<span style="color: var(--accent)">.</span>
          </span>
        </div>

        <!-- Tagline + stats + temoignage -->
        <div class="space-y-10">
          <div class="space-y-4">
            <h2 class="text-white text-[2.6rem] font-bold leading-tight">
              Livraisons durables,<br />
              <span style="color: var(--accent)">impact positif.</span>
            </h2>
            <p class="text-white/70 text-base leading-relaxed max-w-xs">
              Gérez vos expéditions mondiales avec traçabilité en temps réel et empreinte carbone
              réduite.
            </p>
          </div>

          <!-- Chiffres clés -->
          <div class="flex gap-10">
            <div>
              <p class="text-3xl font-bold" style="color: var(--accent)">98%</p>
              <p class="text-white/60 text-sm mt-1">Taux de livraison</p>
            </div>
            <div>
              <p class="text-3xl font-bold" style="color: var(--accent)">150+</p>
              <p class="text-white/60 text-sm mt-1">Pays couverts</p>
            </div>
            <div>
              <p class="text-3xl font-bold" style="color: var(--accent)">−40%</p>
              <p class="text-white/60 text-sm mt-1">CO₂ émis</p>
            </div>
          </div>

          <!-- Témoignage -->
          <div
            class="rounded-2xl p-5 max-w-sm"
            style="
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.18);
              backdrop-filter: blur(8px);
            "
          >
            <p class="text-white/90 text-sm italic leading-relaxed">
              "EcoFreight a transformé notre chaîne logistique. Rapide, fiable et éco-responsable."
            </p>
            <div class="flex items-center gap-3 mt-4">
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style="background: var(--accent); color: var(--foreground)"
              >
                AM
              </div>
              <div>
                <p class="text-white text-sm font-semibold">Amara Mbaye</p>
                <p class="text-white/50 text-xs">Directrice Logistique, DakarExport</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
