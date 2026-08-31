
<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6 py-12 text-center">
    <div class="max-w-lg space-y-6 bg-slate-950/80 border border-emerald-800/60 rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-cyan-400/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Error 404</span>
      </div>

      <div class="space-y-2">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Lost in the Matrix?
        </h1>
        <p class="text-emerald-200 text-sm sm:text-base leading-relaxed">
          The page you're looking for doesn't exist, was removed, or moved to another virtual world.
        </p>
      </div>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link 
          to="/" 
          class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md transition-colors inline-flex items-center justify-center space-x-2"
        >
          <i class="fa-solid fa-house"></i>
          <span>Return Home</span>
        </router-link>
      </div>
    </div>
  </div>
</template>