<script setup lang="ts">
import { ref } from 'vue'

interface SpecCategory {
  title: string
  icon: string
  items: { name: string; price: string; note?: string }[]
}

const specCategories = ref<SpecCategory[]>([
  {
    title: 'Core Hardware',
    icon: 'fa-solid fa-microchip text-cyan-400',
    items: [
      { name: 'AMD EPYC 9754 (x2 Dual Socket)', price: 'Enterprise' },
      { name: '6 TB DDR5-4800 ECC Registered RAM', price: 'Enterprise' },
      { name: 'NVIDIA RTX PRO 6000 Blackwell Max-Q 96GB', price: '$17,999.99' },
      { name: 'Gigabyte MZ73-LM2 Dual Socket SP5 Motherboard', price: 'Server Grade' },
      { name: 'Corsair iCUE Link 9000D Super Full-Tower', price: 'Chassis' }
    ]
  },
  {
    title: 'Storage & Peripherals',
    icon: 'fa-solid fa-hard-drive text-emerald-400',
    items: [
      { name: '1 Petabyte NVMe PCIe 5.0 SAN Storage Array', price: 'Enterprise' },
      { name: 'Asus ProArt PA32KCX 8K Monitors (x4)', price: '$35,196.00' },
      { name: 'Pimax Crystal Super 8K VR Headset', price: '$3,000.00' },
      { name: 'HiFiMAN Susvara Headphones', price: '$5,999.00' }
    ]
  },
  {
    title: 'Macro Infrastructure & Assets',
    icon: 'fa-solid fa-earth-americas text-yellow-400',
    items: [
      { name: 'AMAZON COMPANY', price: '$2.69 Trillion' },
      { name: 'International Space Station (ISS)', price: '$150 Billion' },
      { name: 'U.S. Interstate Highway System', price: '$634 Billion' },
      { name: 'NEOM Mega-Project', price: '$500 Billion' }
    ]
  },
  {
    title: 'Abstract & Metaphysical Upgrades',
    icon: 'fa-solid fa-infinity text-purple-400',
    items: [
      { name: 'The Multiverse (Omniverse Package)', price: '$150 Decillion' },
      { name: 'Localized Trash-Disposal Black Hole', price: '$50 Sextillion' },
      { name: 'Paradox Prevention Insurance', price: '$999 Trillion' },
      { name: 'The Concept of "More" Itself', price: '∞' },
      { name: 'The Absolute Infinity (Ω / Cantor)', price: '∞ × 2' }
    ]
  }
])
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-mono">
    <div class="max-w-5xl mx-auto space-y-8">
      
      <!-- Header -->
      <header class="border-b border-cyan-500/20 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-yellow-300 font-bold uppercase tracking-wider mb-1">
            <i class="fa-solid fa-sparkles"></i> PCPartPicker Legendary Build
          </div>
          <h1 class="text-3xl font-bold text-cyan-300">
            The Ultament PC Build
          </h1>
          <p class="text-xs text-slate-400 mt-1">
            From Dual EPYC 128-core CPUs to Cantor's Absolute Infinity.
          </p>
        </div>

        <div class="bg-slate-900 border border-cyan-500/30 p-3 rounded-lg text-right">
          <span class="block text-xs text-slate-400">Total Price</span>
          <span class="text-xl font-bold text-yellow-300">
            ∞! (Absolute Beyond)
          </span>
        </div>
      </header>

      <!-- Spec Categories Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="cat in specCategories" 
          :key="cat.title"
          class="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/40 transition-colors shadow-lg"
        >
          <h2 class="text-base font-bold text-slate-200 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <i :class="cat.icon"></i>
            {{ cat.title }}
          </h2>

          <ul class="space-y-3">
            <li 
              v-for="item in cat.items" 
              :key="item.name"
              class="flex items-start justify-between text-xs gap-3"
            >
              <span class="text-slate-300">{{ item.name }}</span>
              <span class="text-cyan-400 font-semibold whitespace-nowrap">{{ item.price }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Footer Warning Box -->
      <footer class="bg-slate-900/40 border border-yellow-500/30 rounded-xl p-4 text-xs text-slate-400 flex items-center gap-3">
        <i class="fa-solid fa-triangle-exclamation text-yellow-300 text-xl flex-shrink-0"></i>
        <p>
          <strong class="text-yellow-300">Assembly Warning:</strong> Ensure your localized black hole is positioned away from the dual socket SP5 motherboards to avoid pulling your 6TB DDR5 RAM into event horizon singularity before POST.
        </p>
      </footer>

    </div>
  </main>
</template>