<script setup>
import { ref, computed } from 'vue'

const presetAmounts = [5, 10, 25, 50, 100]
const selectedAmount = ref(25)
const customAmount = ref('')
const loading = ref(false)
const error = ref('')

const amount = computed(() => {
  if (selectedAmount.value === null) {
    return Number(customAmount.value) || 0
  }
  return selectedAmount.value
})

function selectAmount(value) {
  selectedAmount.value = value
  customAmount.value = ''
  error.value = ''
}

function selectCustom() {
  selectedAmount.value = null
  error.value = ''
}

async function donate() {
  error.value = ''
  const donationAmount = Number(amount.value)

  if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 10000) {
    error.value = 'Please enter an amount between $1 and $10,000.'
    return
  }

  loading.value = true

  try {
    const res = await fetch('/api/create-donation-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: donationAmount })
    })

    const text = await res.text()
    let data = {}

    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      throw new Error(`Server returned unexpected response (Status ${res.status}).`)
    }

    if (!res.ok) {
      throw new Error(data.error || `Checkout failed with status ${res.status}`)
    }

    if (data.url) {
      window.location.href = data.url
    } else {
      throw new Error('No checkout URL returned from Stripe.')
    }
  } catch (err) {
    error.value = err.message
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen px-6 py-16 bg-transparent text-emerald-950 dark:text-emerald-50 font-sans transition-colors duration-300">
    <div class="mx-auto max-w-5xl space-y-8">
      
      <!-- Header -->
      <section class="text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl font-mono">
          Support My Projects
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-emerald-800 dark:text-slate-300">
          Your support helps fund server hosting, hardware, tools, and ongoing development.
        </p>
      </section>

      <!-- Card -->
      <section class="mx-auto max-w-2xl rounded-2xl border border-emerald-300 dark:border-emerald-500/40 bg-emerald-100/80 dark:bg-slate-900/90 p-6 shadow-xl sm:p-10">
        <h2 class="mb-6 text-xl font-semibold font-mono">Select Amount</h2>

        <!-- Presets -->
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-5">
          <button
            v-for="preset in presetAmounts"
            :key="preset"
            type="button"
            class="rounded-xl border px-4 py-3 font-mono font-bold transition-all"
            :class="
              selectedAmount === preset
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'border-emerald-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-emerald-400'
            "
            @click="selectAmount(preset)"
          >
            ${{ preset }}
          </button>
        </div>

        <!-- Custom Input -->
        <div class="mt-6">
          <button
            type="button"
            class="mb-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
            @click="selectCustom"
          >
            Enter custom amount
          </button>
          <div class="relative">
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-slate-400">$</span>
            <input
              v-model="customAmount"
              type="number"
              min="1"
              max="10000"
              step="0.01"
              placeholder="Custom"
              class="w-full rounded-xl border border-emerald-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-8 py-3 text-lg font-mono outline-none focus:border-emerald-500"
              @focus="selectCustom"
            />
          </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500 font-mono">
          {{ error }}
        </div>

        <!-- Submit -->
        <button
          type="button"
          :disabled="loading"
          class="mt-6 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-base py-3 transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50"
          @click="donate"
        >
          <span v-if="!loading">Checkout ${{ Number(amount || 0).toFixed(2) }}</span>
          <span v-else>Redirecting...</span>
        </button>

        <p class="mt-4 text-center text-xs text-slate-500 font-mono">
          Processed securely via Stripe.
        </p>
      </section>

    </div>
  </main>
</template>