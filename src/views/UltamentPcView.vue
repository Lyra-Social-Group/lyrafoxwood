<script setup lang="ts">
import { ref } from 'vue'

interface SpecCategory {
  title: string
  icon: string
  badgeText: string
  badgeColor: string
  items: { name: string; price: string; note: string }[]
}

const totalCost = '∞! (Absolute Beyond Package)'

const specCategories = ref<SpecCategory[]>([
  {
    title: 'Silicon & Compute Engine',
    icon: 'fa-solid fa-microchip text-cyan-400',
    badgeText: 'Hardware Core',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    items: [
      { name: 'AMD EPYC 9754 (x2 Dual Socket - 256 Cores / 512 Threads)', price: 'Enterprise', note: 'Zen 4c architecture running parallel simulation loops' },
      { name: 'Gigabyte MZ73-LM2 Dual Socket SP5 Server Motherboard', price: 'Server Grade', note: 'Dual SP5 socket with 24 DDR5 DIMM slots & PCIe 5.0' },
      { name: 'G.Skill Trident Z RGB 6 TB DDR5-4800 ECC Registered RAM', price: 'Enterprise', note: 'Unbuffered multi-terabyte error-correcting memory' },
      { name: 'NVIDIA RTX PRO 6000 Blackwell Max-Q 96 GB', price: '$17,999.99', note: '96GB VRAM for rendering hyper-dimensional shaders' },
      { name: 'Asus ROG STRIX LC 360 RGB White Edition CPU Cooler', price: '$411.00', note: 'Custom modified block for planetary liquid nitrogen routing' },
      { name: 'Thermal Grizzly Kryonaut Extreme (33.84g)', price: '$94.99', note: 'Applied across both EPYC heatspreaders' }
    ]
  },
  {
    title: 'Storage Infrastructure & Cold Vaults',
    icon: 'fa-solid fa-database text-emerald-400',
    badgeText: 'Petabyte Array',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    items: [
      { name: '1 Petabyte NVMe PCIe 5.0 SAN Storage Array', price: 'Enterprise', note: 'Direct Fiber Channel connection to local data center' },
      { name: 'Kingston FURY Renegade G5 8 TB M.2 PCIe 5.0 NVMe SSD', price: '$2,955.93', note: 'Blazing fast boot drive for OS and real-time cache' },
      { name: 'Samsung 990 Pro 2 TB M.2 PCIe 4.0 NVMe SSD', price: '$389.00', note: 'Dedicated scratch disk for video rendering' },
      { name: 'Mushkin Source HC 16 TB 2.5" SSD (x3 Array)', price: '$48,372.90', note: 'High-density SATA array for local backup drops' },
      { name: 'Apricorn Aegis Fortress L3 20 TB Hardware Encrypted SSD', price: '$14,199.00', note: 'FIPS 140-3 Level 3 hardware encrypted external vault' }
    ]
  },
  {
    title: 'Peripherals, Visuals & Audio Matrix',
    icon: 'fa-solid fa-desktop text-purple-400',
    badgeText: 'Sensory Output',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    items: [
      { name: 'Asus ProArt Display PA32KCX 32" 8K 60Hz Monitor (x4 Quad Quad Setup)', price: '$35,196.00', note: '32-inch 7680x4320 Mini-LED color accurate screens' },
      { name: 'Pimax Crystal Super 8K Micro-OLED VR Headset', price: '$3,000.00', note: 'Micro-OLED panel clarity for ultra-immersive VRChat worlds' },
      { name: 'HiFiMAN Susvara Planar Magnetic Headphones', price: '$5,999.00', note: 'Ultra-clear acoustic monitoring for audio mixing' },
      { name: 'Edifier S3000MKII 256W Active Bookshelf Speakers', price: '$999.99', note: 'Planar diaphragm tweeters with wireless interconnect' },
      { name: 'ASUS ROG Azoth Extreme 20th Edition Mechanical Keyboard', price: 'Custom', note: 'Full OLED touchscreen display and carbon fiber plate' },
      { name: 'Finalmouse UltralightX Guardian Tiger', price: 'Custom', note: 'Ultralight carbon-composite wireless gaming mouse' },
      { name: 'OBSBOT Tiny 3 4K AI-Powered Tracking Webcam', price: '$349.00', note: 'Auto-framing and PTZ control for live streams' }
    ]
  },
  {
    title: 'Macro Physical & Planetary Infrastructure',
    icon: 'fa-solid fa-earth-americas text-yellow-400',
    badgeText: 'Global Assets',
    badgeColor: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    items: [
      { name: 'AMAZON COMPANY', price: '$2.69 Trillion', note: 'Acquired for same-day delivery on replacement components' },
      { name: 'U.S. Interstate Highway System', price: '$634 Billion', note: 'Low-latency physical logistics cabling route' },
      { name: 'NEOM Mega-Project', price: '$500 Billion', note: 'Dedicated cooling facility and solar farm region' },
      { name: 'International Space Station (ISS)', price: '$150 Billion', note: 'Zero-gravity orbital heat sink testing platform' },
      { name: 'USS Gerald R. Ford (CVN-78 Aircraft Carrier)', price: '$13.3 Billion', note: 'Mobile off-grid backup generator platform' }
    ]
  },
  {
    title: 'Cosmic & Metaphysical Upgrades',
    icon: 'fa-solid fa-infinity text-cyan-300',
    badgeText: 'Omnipresent Tier',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    items: [
      { name: 'The Multiverse (Omniverse Package)', price: '$150 Decillion', note: 'Multi-threaded reality rendering across parallel dimensions' },
      { name: 'A Dyson Sphere Solar Engine', price: '$20 Septillion', note: 'Harnessing 100% of star energy output for power delivery' },
      { name: 'Localized Stable Black Hole', price: '$50 Sextillion', note: 'Installed at chassis base for automated packaging disposal' },
      { name: 'The Unifying Theory of Everything', price: '$444 Quinquagintillion', note: 'Patch release fix for quantum physics bugs' },
      { name: 'The Absolute Infinity (Ω / Cantor Absolute)', price: '∞ × 2', note: 'Infinite computing headroom with 2x safety tolerance' }
    ]
  }
])

const buildMetrics = ref([
  { label: 'Total CPU Cores', value: '256 Cores / 512 Threads', icon: 'fa-solid fa-microchip text-cyan-400' },
  { label: 'System RAM', value: '6,144 GB DDR5 ECC', icon: 'fa-solid fa-memory text-purple-400' },
  { label: 'Raw Storage Capacity', value: '1.05+ Petabytes', icon: 'fa-solid fa-hard-drive text-emerald-400' },
  { label: 'Estimated Power Draw', value: '3,500W + 1 Dyson Sphere', icon: 'fa-solid fa-bolt text-yellow-400' }
])

const assemblyNotes = ref([
  'Apply Thermal Grizzly paste evenly across both EPYC CPU heatspreaders. Do not apply liquid metal to abstract concepts.',
  'Position the Localized Black Hole directly below the PSU shroud to clear cardboard boxes automatically.',
  'Place one Fragile Sticker on the CORSAIR 9000D tempered glass, and another on the Titanium Fourth Wall.',
  'If a blue screen occurs during boot, press the "Undo" Button for the Big Bang and return to the Pre-Existing Void.'
])
</script>

<template>
  <main class="min-h-screen bg-transparent text-emerald-950 dark:text-emerald-50 p-4 sm:p-8 font-sans transition-colors duration-300">
    <div class="max-w-6xl mx-auto space-y-10">
      
      <!-- Banner & Title -->
      <header class="bg-emerald-100/70 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-900/60 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              <i class="fa-solid fa-sparkles text-yellow-400"></i> Ultimate Build Configuration
            </div>
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-300 font-mono">
              The Ultament PC Build
            </h1>
            <p class="text-sm sm:text-base text-emerald-900/80 dark:text-emerald-200/80 max-w-2xl">
              An enterprise server build that escalated past global infrastructure and into hyper-dimensional space.
            </p>
          </div>

          <div class="bg-slate-950 border border-emerald-500/30 p-5 rounded-xl text-left lg:text-right min-w-[240px] shadow-inner">
            <span class="block text-xs font-mono text-emerald-400/80 uppercase">Est. Total Investment</span>
            <span class="text-2xl font-mono font-extrabold text-yellow-400">
              {{ totalCost }}
            </span>
            <span class="block text-[10px] font-mono text-slate-400 mt-1">Includes shipping, taxes, and Dyson Sphere permits</span>
          </div>
        </div>
      </header>

      <!-- Key Metrics Overview Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="metric in buildMetrics" 
          :key="metric.label"
          class="bg-emerald-50/60 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm"
        >
          <div class="p-3 bg-emerald-100 dark:bg-slate-800 rounded-lg text-xl">
            <i :class="metric.icon"></i>
          </div>
          <div>
            <p class="text-xs font-mono text-emerald-800 dark:text-slate-400 uppercase">{{ metric.label }}</p>
            <p class="text-sm font-mono font-bold text-emerald-950 dark:text-emerald-300">{{ metric.value }}</p>
          </div>
        </div>
      </section>

      <!-- Component Categories -->
      <section class="space-y-6">
        <div 
          v-for="cat in specCategories" 
          :key="cat.title"
          class="bg-emerald-100/40 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl p-6 shadow-md transition-colors"
        >
          <div class="flex items-center justify-between mb-4 border-b border-emerald-200 dark:border-emerald-900/50 pb-3">
            <h2 class="text-lg sm:text-xl font-mono font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-3">
              <i :class="cat.icon"></i>
              {{ cat.title }}
            </h2>
            <span :class="['text-xs font-mono px-3 py-1 rounded-full border', cat.badgeColor]">
              {{ cat.badgeText }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="item in cat.items" 
              :key="item.name"
              class="bg-white/60 dark:bg-slate-950/70 border border-emerald-200/60 dark:border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-cyan-500/40 transition-colors"
            >
              <div class="flex justify-between items-start gap-2">
                <span class="font-mono text-sm font-bold text-emerald-950 dark:text-slate-200">{{ item.name }}</span>
                <span class="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
                  {{ item.price }}
                </span>
              </div>
              <p class="text-xs text-emerald-800/80 dark:text-slate-400 font-sans">
                {{ item.note }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Build & Assembly Guide Section -->
      <section class="bg-emerald-100/40 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl p-6 shadow-md">
        <h2 class="text-xl font-mono font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2 mb-4">
          <i class="fa-solid fa-wrench text-yellow-400"></i> Assembly & Cable Management Protocol
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="(note, idx) in assemblyNotes" 
            :key="idx"
            class="flex items-start space-x-3 bg-white/60 dark:bg-slate-950/70 border border-emerald-200/60 dark:border-slate-800/80 rounded-xl p-4"
          >
            <span class="font-mono text-xs font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded border border-cyan-500/30">
              0{{ idx + 1 }}
            </span>
            <p class="text-xs font-mono text-emerald-900 dark:text-slate-300">
              {{ note }}
            </p>
          </div>
        </div>
      </section>

      <!-- Danger/Warning Footer Box -->
      <footer class="bg-yellow-500/10 border border-yellow-500/40 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
        <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-2xl mt-0.5 flex-shrink-0"></i>
        <div class="space-y-1">
          <h3 class="text-sm font-mono font-bold text-yellow-400">
            Singularity Safety Notice
          </h3>
          <p class="text-xs text-emerald-900 dark:text-slate-300">
            Ensure your localized trash black hole is safely mounted at the bottom of the Corsair 9000D case prior to powering up the dual SP5 motherboard sockets. Do not attempt to overclock reality without active Paradox Prevention Insurance.
          </p>
        </div>
      </footer>

    </div>
  </main>
</template>