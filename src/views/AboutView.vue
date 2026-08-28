<template>
  <div class="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-16">
    <section class="text-center space-y-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        About Lyra Foxwood
      </h1>
      <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Trans-feminine fox, tech enthusiast, Linux explorer, content creator, and musician navigating virtual worlds and building web experiences.
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div class="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">The Journey & Focus</h2>
        <p>
          I'm an open book, vocal about who I am, and always comfortable answering questions. While I spend time in VRChat and virtual reality, my focus has shifted heavily into system administration, web development, PC building, and music creation.
        </p>
        <p>
          On the technical side, I run **Arch Linux** and **Nobara**, diving into custom desktop environments and command-line workflows. My goal is a full career in IT, blending hardware troubleshooting with network engineering and systems management.
        </p>
      </div>

      <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 space-y-4">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <i class="fa-solid fa-user text-[#0070a8]"></i>
          <span>Quick Profile</span>
        </h3>
        <ul class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li class="flex justify-between border-b border-slate-200 dark:border-slate-700/40 pb-2">
            <span class="font-medium text-slate-500 dark:text-slate-400">Pronouns</span>
            <span class="font-semibold text-slate-900 dark:text-white">She / Her (MTF)</span>
          </li>
          <li class="flex justify-between border-b border-slate-200 dark:border-slate-700/40 pb-2">
            <span class="font-medium text-slate-500 dark:text-slate-400">Primary OS</span>
            <span class="font-semibold text-slate-900 dark:text-white">Arch Linux & Nobara</span>
          </li>
          <li class="flex justify-between border-b border-slate-200 dark:border-slate-700/40 pb-2">
            <span class="font-medium text-slate-500 dark:text-slate-400">Career Goal</span>
            <span class="font-semibold text-slate-900 dark:text-white">IT & Network Infrastructure</span>
          </li>
          <li class="flex justify-between pb-1">
            <span class="font-medium text-slate-500 dark:text-slate-400">Taskbar Alignment</span>
            <span class="font-semibold text-slate-900 dark:text-white">Right-Aligned (Always)</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-terminal text-[#0070a8]"></i>
        <span>Systems & Passions</span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 space-y-2">
          <i class="fa-brands fa-linux text-2xl text-cyan-600 mb-2"></i>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg">Linux Administration</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Running Arch Linux and Nobara daily. Exploring terminal environments, bash scripting, and desktop customization.
          </p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 space-y-2">
          <i class="fa-solid fa-guitar text-2xl text-red-500 mb-2"></i>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg">Heavy Metal & Rock</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Huge fan of heavy metal and rock, fresh off a Five Finger Death Punch concert. Writing and recording music in DAWs.
          </p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 space-y-2">
          <i class="fa-solid fa-desktop text-2xl text-emerald-500 mb-2"></i>
          <h3 class="font-bold text-slate-900 dark:text-white text-lg">Hardware & Custom PCs</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Assembling PC rigs, diagnosing hardware components, and optimizing system configurations.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-film text-[#0070a8]"></i>
        <span>Favorite Movies & Shows</span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md aspect-[2/3] w-full bg-slate-100 dark:bg-slate-800">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/7/7e/Die_Hard_%281988_film%29_poster.xb.jpg" 
              alt="Die Hard Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Die Hard</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Best Christmas Movie</p>
            <a 
              href="https://www.google.com/search?q=Die+Hard+movie" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-[#0070a8] hover:text-cyan-600 dark:text-[#4da8da] dark:hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md aspect-[2/3] w-full bg-slate-100 dark:bg-slate-800">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_Teaser_Poster.png" 
              alt="John Wick Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">John Wick</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Action Cinema</p>
            <a 
              href="https://www.google.com/search?q=John+Wick+movie" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-[#0070a8] hover:text-cyan-600 dark:text-[#4da8da] dark:hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md aspect-[2/3] w-full bg-slate-100 dark:bg-slate-800">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/a/a6/Helluva_Boss_title_card.png" 
              alt="Helluva Boss Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Helluva Boss</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Animated Series</p>
            <a 
              href="https://www.google.com/search?q=Helluva+Boss+show" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-[#0070a8] hover:text-cyan-600 dark:text-[#4da8da] dark:hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md aspect-[2/3] w-full bg-slate-100 dark:bg-slate-800">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/0/00/Reacher_season_1.jpeg" 
              alt="Reacher Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Reacher</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Action Thriller</p>
            <a 
              href="https://www.google.com/search?q=Reacher+series" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-[#0070a8] hover:text-cyan-600 dark:text-[#4da8da] dark:hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>