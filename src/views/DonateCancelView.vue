<template>
  <main class="min-h-screen flex items-center justify-center px-6 py-16 bg-transparent text-emerald-950 dark:text-emerald-50 font-sans">
    <div class="w-full max-w-md rounded-2xl border border-emerald-300 dark:border-emerald-500/40 bg-emerald-100/80 dark:bg-slate-900/90 p-8 text-center shadow-xl space-y-4">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-500/20 text-slate-400 text-2xl font-bold">
        ↩
      </div>
      <h1 class="text-3xl font-bold font-mono">Cancelled</h1>
      <p class="text-xs text-emerald-800 dark:text-slate-300 font-mono">
        No payment was processed.
      </p>
      <router-link
        to="/donate"
        class="inline-block mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold px-6 py-2.5 text-xs transition-all"
      >
        Back to Donate
      </router-link>
    </div>
  </main>
</template>