<script setup lang="ts">
import { ref, computed } from 'vue'

interface PcItem {
  category: 'core' | 'storage' | 'peripherals' | 'macro' | 'abstract'
  name: string
  price: string
  commentary: string
}

const activeCategory = ref<string>('all')
const loading = ref<boolean>(false)

// Stripe $1.00 Checkout Handler
const handleCheckout = async () => {
  loading.value = true
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Checkout error: ' + (data.error || 'Failed to start Stripe session'))
    }
  } catch (err) {
    alert('Payment request failed.')
  } finally {
    loading.value = false
  }
}

// Complete PCPartPicker list with commentary
const pcList = ref<PcItem[]>([
  // Core Hardware
  { 
    category: 'core', 
    name: 'AMD EPYC 9754 128-Core Processor (x2 Dual Socket)', 
    price: 'Enterprise', 
    commentary: '256 cores so you can run 512 instances of Chrome and still lag in VRChat.' 
  },
  { 
    category: 'core', 
    name: 'Asus ROG STRIX LC 360 RGB White Edition CPU Cooler', 
    price: '$411.00', 
    commentary: 'A consumer AIO for dual enterprise server sockets. It will melt in 0.4 seconds, but hey, white aesthetic!' 
  },
  { 
    category: 'core', 
    name: 'Thermal Grizzly Kryonaut Extreme (33.84g)', 
    price: '$94.99', 
    commentary: 'Butter both CPUs like toast. Do NOT accidentally apply to the Narrative Source Code.' 
  },
  { 
    category: 'core', 
    name: 'Gigabyte MZ73-LM2 Dual Socket SP5 Server Motherboard', 
    price: 'Enterprise', 
    commentary: 'Supports 24 DDR5 DIMMs. Weighs more than a mid-sized sedan.' 
  },
  { 
    category: 'core', 
    name: 'G.Skill Trident Z RGB 6 TB DDR5-4800 ECC Registered RAM', 
    price: 'Enterprise', 
    commentary: 'Enough memory to cache the entire internet, yet Windows will still consume 80% of it at idle.' 
  },
  { 
    category: 'core', 
    name: 'NVIDIA RTX PRO 6000 Blackwell Max-Q 96 GB Video Card', 
    price: '$17,999.99', 
    commentary: 'Requires its own nuclear sub-station and a permission slip from the Department of Energy.' 
  },
  { 
    category: 'core', 
    name: 'CORSAIR iCUE LINK 9000D RGB AIRFLOW Super Full-Tower Case', 
    price: 'Chassis', 
    commentary: 'Legally classified as a two-bedroom apartment in San Francisco.' 
  },
  { 
    category: 'core', 
    name: 'be quiet! Straight Power 11 3500W 80+ Gold PSU', 
    price: '$1,008.00', 
    commentary: 'Will cause your neighborhood power grid to dim every time you open an Excel spreadsheet.' 
  },
  { 
    category: 'core', 
    name: 'Microsoft Windows 11 Enterprise (64-bit)', 
    price: '$199.98', 
    commentary: 'Still forces Candy Crush onto your start menu despite controlling the Multiverse.' 
  },

  // Storage
  { 
    category: 'storage', 
    name: 'NVMe PCIe 5.0 SAN Storage Array (1 Petabyte)', 
    price: 'Enterprise', 
    commentary: 'Finally enough room to hold your raw OBS stream recordings.' 
  },
  { 
    category: 'storage', 
    name: 'Kingston FURY Renegade G5 8 TB M.2 PCIe 5.0 NVMe SSD', 
    price: '$2,955.93', 
    commentary: 'Loads Skyrim before you even press the power button.' 
  },
  { 
    category: 'storage', 
    name: 'Mushkin Source HC 16 TB 2.5" SSD (x3 Array)', 
    price: '$48,372.90', 
    commentary: 'Costs more than a brand-new Ford Mustang. Used strictly for meme storage.' 
  },
  { 
    category: 'storage', 
    name: 'Apricorn Aegis Fortress L3 20 TB External SSD', 
    price: '$14,199.00', 
    commentary: 'Encrypted drive to protect your secret folder from parallel timeline entities.' 
  },

  // Peripherals
  { 
    category: 'peripherals', 
    name: 'Asus ProArt Display PA32KCX 32" 8K 60 Hz Monitor (x4 Setup)', 
    price: '$35,196.00', 
    commentary: '32K resolution combined. So clear you can see individual subatomic particles in desktop wallpaper.' 
  },
  { 
    category: 'peripherals', 
    name: 'Pimax Crystal Super 8K Micro-OLED VR Headset', 
    price: '$3,000.00', 
    commentary: 'Weighs 12 lbs. Guaranteed neck strength gains while visiting custom VRChat worlds.' 
  },
  { 
    category: 'peripherals', 
    name: 'HiFiMAN Susvara Planar Magnetic Headphones', 
    price: '$5,999.00', 
    commentary: 'You can hear the artist breathing in another recording studio down the block.' 
  },
  { 
    category: 'peripherals', 
    name: 'APC SURT20KRMXLT UPS Unit', 
    price: '$26,510.99', 
    commentary: 'Provides 4 seconds of backup battery life for this exact rig.' 
  },

  // Macro & Earth Assets
  { 
    category: 'macro', 
    name: 'BOX USA Medium Moving Boxes (10 Million-Pack)', 
    price: '$2.69', 
    commentary: 'Used to wrap the 9000D case for shipping. Takes up two U.S. states.' 
  },
  { 
    category: 'macro', 
    name: 'AMAZON COMPANY', 
    price: '$2.69 Trillion', 
    commentary: 'Purchased exclusively so you can get Prime Same-Day Delivery on thermal paste.' 
  },
  { 
    category: 'macro', 
    name: 'International Space Station (ISS)', 
    price: '$150 Billion', 
    commentary: 'Mounted on top of the case as an external radiator for thermal testing.' 
  },
  { 
    category: 'macro', 
    name: 'USS Gerald R. Ford (CVN-78 Aircraft Carrier)', 
    price: '$13.3 Billion', 
    commentary: 'Mobile ocean barge required to carry the PC setup across international waters.' 
  },

  // Abstract & Cosmic Concepts
  { 
    category: 'abstract', 
    name: 'Localized Stable Black Hole (Trash Disposal)', 
    price: '$50 Sextillion', 
    commentary: 'Conveniently mounted under the PSU shroud to instantly swallow GPU packaging boxes.' 
  },
  { 
    category: 'abstract', 
    name: 'The Laws of Physics', 
    price: '$777 Tredecillion', 
    commentary: 'Custom tweaked to allow 256 cores to run at 12.0 GHz without exploding universe bounds.' 
  },
  { 
    category: 'abstract', 
    name: 'The "Undo" Button for the Big Bang', 
    price: '$100 Nonillion', 
    commentary: 'Press this immediately if you accidentally get thermal paste inside the CPU socket.' 
  },
  { 
    category: 'abstract', 
    name: 'The Concept of "More" Itself', 
    price: '∞', 
    commentary: 'Added to cart just in case 6 TB of DDR5 RAM isn\'t enough.' 
  },
  { 
    category: 'abstract', 
    name: 'A Single Fragile Shipping Box Sticker', 
    price: '$0.10', 
    commentary: 'The only thing holding the physical structural integrity of reality together.' 
  }
])

const categories = [
  { id: 'all', label: 'All Nonsense', icon: 'fa-solid fa-layer-group' },
  { id: 'core', label: 'Core Rig', icon: 'fa-solid fa-microchip' },
  { id: 'storage', label: 'Petabytes', icon: 'fa-solid fa-database' },
  { id: 'peripherals', label: 'Sensory Gear', icon: 'fa-solid fa-desktop' },
  { id: 'macro', label: 'Real Estate', icon: 'fa-solid fa-earth-americas' },
  { id: 'abstract', label: 'Cosmic & Void', icon: 'fa-solid fa-infinity' }
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return pcList.value
  return pcList.value.filter(item => item.category === activeCategory.value)
})
</script>

<template>
  <main class="min-h-screen bg-transparent text-emerald-950 dark:text-emerald-50 p-4 sm:p-8 font-sans transition-colors duration-300">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Meme Banner -->
      <header class="bg-emerald-100/70 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-900/60 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              <i class="fa-solid fa-fire text-yellow-400"></i> Overkill God Tier List
            </div>
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-300 font-mono">
              The Ultament PC Build
            </h1>
            <p class="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 font-mono">
              PCPartPicker Status: Completely Out of Control (OWO Edition)
            </p>
          </div>

          <div class="bg-slate-950 border border-yellow-500/40 p-4 rounded-xl text-left md:text-right min-w-[240px] shadow-lg">
            <span class="block text-xs font-mono text-emerald-400/80 uppercase">Est. Total Checkout</span>
            <span class="text-2xl font-mono font-extrabold text-yellow-400 animate-pulse">
              ∞! + $4.99 Shipping
            </span>
            <span class="block text-[10px] font-mono text-slate-400 mt-1">Free delivery with Amazon Prime purchase</span>
          </div>
        </div>
      </header>

      <!-- $1.00 Stripe Checkout Widget -->
      <section class="bg-emerald-100/80 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl">
        <h3 class="font-mono text-lg font-bold text-emerald-950 dark:text-emerald-300 flex items-center justify-center gap-2">
          <i class="fa-solid fa-dollar-sign text-yellow-400"></i>
          Support The Build Tier
        </h3>
        <p class="text-xs font-sans text-emerald-900/80 dark:text-slate-300 max-w-md mx-auto">
          Donate $1.00 via Stripe to buy a single microscopic roll of light-year bubble wrap for this setup.
        </p>

        <button
          @click="handleCheckout"
          :disabled="loading"
          class="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <i v-if="loading" class="fa-solid fa-spinner animate-spin"></i>
          <i v-else class="fa-solid fa-credit-card"></i>
          {{ loading ? 'Redirecting to Stripe...' : 'Checkout for $1.00' }}
        </button>
      </section>

      <!-- Category Filter Buttons -->
      <nav class="flex flex-wrap gap-2 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-4 py-2 rounded-lg font-mono text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer',
            activeCategory === cat.id
              ? 'bg-emerald-600 dark:bg-emerald-600 text-white shadow-md'
              : 'bg-emerald-100/60 dark:bg-slate-900/60 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-200/70 dark:hover:bg-slate-800'
          ]"
        >
          <i :class="cat.icon"></i>
          {{ cat.label }}
        </button>
      </nav>

      <!-- Dynamic Item List -->
      <section class="space-y-4">
        <div
          v-for="(item, idx) in filteredItems"
          :key="item.name"
          class="bg-emerald-50/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-slate-800/80 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/50 transition-all shadow-sm"
        >
          <div class="space-y-1.5 max-w-3xl">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-mono text-slate-400">#{{ idx + 1 }}</span>
              <h3 class="font-mono text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-100">
                {{ item.name }}
              </h3>
            </div>
            <p class="text-xs text-emerald-800 dark:text-slate-400 font-sans italic">
              "{{ item.commentary }}"
            </p>
          </div>

          <span class="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 whitespace-nowrap self-start sm:self-center">
            {{ item.price }}
          </span>
        </div>
      </section>

      <!-- Warning Disclaimer -->
      <footer class="bg-yellow-500/10 border border-yellow-500/40 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
        <i class="fa-solid fa-biohazard text-yellow-400 text-2xl mt-0.5 flex-shrink-0"></i>
        <div class="space-y-1 font-mono text-xs text-emerald-900 dark:text-slate-300">
          <strong class="text-yellow-400 block text-sm">Critical Assembly Advice:</strong>
          If your localized black hole starts pulling your dual 128-core EPYC processors into the event horizon, press the Big Bang "Undo" button before your 6 TB DDR5 RAM memory leak crashes reality.
        </div>
      </footer>

    </div>
  </main>
</template>