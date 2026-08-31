<template>
  <div class="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-16">
    <section class="text-center space-y-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-emerald-950 dark:text-emerald-50 tracking-tight">
        About Lyra Foxwood
      </h1>
      <p class="text-emerald-800 dark:text-emerald-200 text-lg max-w-2xl mx-auto leading-relaxed">
        Trans-feminine fox, tech enthusiast, Linux explorer, content creator, and musician navigating virtual worlds and building web experiences.
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div class="space-y-4 text-emerald-900 dark:text-emerald-100 leading-relaxed">
        <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50">The Journey & Focus</h2>
        <p>
          I'm an open book, vocal about who I am, and always comfortable answering questions. While I spend time in VRChat and virtual reality, my focus has shifted heavily into system administration, web development, PC building, and music creation.
        </p>
        <p>
          On the technical side, I run **Arch Linux** and **Nobara**, diving into custom desktop environments and command-line workflows. My goal is a full career in IT, blending hardware troubleshooting with network engineering and systems management.
        </p>
      </div>

      <div class="bg-emerald-100/60 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-800/60 rounded-xl p-6 space-y-4 backdrop-blur-sm shadow-md">
        <h3 class="text-xl font-bold text-emerald-950 dark:text-emerald-50 flex items-center space-x-2">
          <i class="fa-solid fa-user text-cyan-500"></i>
          <span>Quick Profile</span>
        </h3>
        <ul class="space-y-3 text-sm text-emerald-900 dark:text-emerald-200">
          <li class="flex justify-between border-b border-emerald-200 dark:border-emerald-800/40 pb-2">
            <span class="font-medium text-emerald-700 dark:text-emerald-400">Pronouns</span>
            <span class="font-semibold text-emerald-950 dark:text-emerald-50">She / Her (MTF)</span>
          </li>
          <li class="flex justify-between border-b border-emerald-200 dark:border-emerald-800/40 pb-2">
            <span class="font-medium text-emerald-700 dark:text-emerald-400">Primary OS</span>
            <span class="font-semibold text-emerald-950 dark:text-emerald-50">Arch Linux & Nobara</span>
          </li>
          <li class="flex justify-between border-b border-emerald-200 dark:border-emerald-800/40 pb-2">
            <span class="font-medium text-emerald-700 dark:text-emerald-400">Career Goal</span>
            <span class="font-semibold text-emerald-950 dark:text-emerald-50">IT & Network Infrastructure</span>
          </li>
          <li class="flex justify-between pb-1">
            <span class="font-medium text-emerald-700 dark:text-emerald-400">Taskbar Alignment</span>
            <span class="font-semibold text-emerald-950 dark:text-emerald-50">Right-Aligned (Always)</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50 border-b border-emerald-200 dark:border-emerald-900/60 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-address-card text-cyan-500"></i>
        <span>Digital Business Card</span>
      </h2>

      <div class="max-w-xl mx-auto bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 space-y-6">
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400 flex-shrink-0 shadow-md">
            <img :src="heroImage" alt="Lyra Foxwood" class="w-full h-full object-cover" />
          </div>
          <div class="space-y-1">
            <h3 class="text-2xl font-extrabold text-white">Lyra Foxwood</h3>
            <p class="text-cyan-400 text-sm font-medium">Content Creator & IT Systems Aspirant</p>
            <p class="text-xs text-emerald-200">Michigan, USA • She/Her</p>
          </div>
        </div>

        <div class="border-t border-emerald-800/80 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="flex items-center space-x-2 text-emerald-100">
            <i class="fa-solid fa-envelope text-cyan-400"></i>
            <span>Contactme@lyrafoxwood.app</span>
          </div>
          <div class="flex items-center space-x-2 text-emerald-100">
            <i class="fa-solid fa-globe text-cyan-400"></i>
            <a href="https://lyrafoxwood.app" class="hover:underline">lyrafoxwood.app</a>
          </div>
        </div>

        <div class="flex justify-center sm:justify-start gap-4 text-lg text-emerald-200 pt-2 border-t border-emerald-800/80">
          <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-400 transition-colors"><i class="fa-brands fa-twitch"></i></a>
          <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-400 transition-colors"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-400 transition-colors"><i class="fa-solid fa-cloud"></i></a>
          <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-400 transition-colors"><i class="fa-brands fa-telegram"></i></a>
          <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-400 transition-colors"><i class="fa-brands fa-patreon"></i></a>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50 border-b border-emerald-200 dark:border-emerald-900/60 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-terminal text-cyan-500"></i>
        <span>Systems & Passions</span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-emerald-100/60 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-800/60 rounded-xl p-6 space-y-2 shadow-sm">
          <i class="fa-brands fa-linux text-2xl text-cyan-500 mb-2"></i>
          <h3 class="font-bold text-emerald-950 dark:text-emerald-50 text-lg">Linux Administration</h3>
          <p class="text-emerald-800 dark:text-emerald-200 text-sm leading-relaxed">
            Running Arch Linux and Nobara daily. Exploring terminal environments, bash scripting, and desktop customization.
          </p>
        </div>

        <div class="bg-emerald-100/60 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-800/60 rounded-xl p-6 space-y-2 shadow-sm">
          <i class="fa-solid fa-guitar text-2xl text-red-500 mb-2"></i>
          <h3 class="font-bold text-emerald-950 dark:text-emerald-50 text-lg">Heavy Metal & Rock</h3>
          <p class="text-emerald-800 dark:text-emerald-200 text-sm leading-relaxed">
            Huge fan of heavy metal and rock, fresh off a concert here in 2026. Writing and recording my own music since 2025. My music is a lot of different genres.
          </p>
        </div>

        <div class="bg-emerald-100/60 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-800/60 rounded-xl p-6 space-y-2 shadow-sm">
          <i class="fa-solid fa-desktop text-2xl text-emerald-500 mb-2"></i>
          <h3 class="font-bold text-emerald-950 dark:text-emerald-50 text-lg">Hardware & Custom PCs</h3>
          <p class="text-emerald-800 dark:text-emerald-200 text-sm leading-relaxed">
            Assembling PC rigs, diagnosing hardware components, and optimizing system configurations.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50 border-b border-emerald-200 dark:border-emerald-900/60 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-gamepad text-cyan-500"></i>
        <span>Favorite Video Games</span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-slate-950 border border-emerald-800/60 rounded-xl p-5 text-center flex flex-col items-center justify-between shadow-md">
          <div class="w-full flex flex-col items-center">
            <div class="h-16 w-full flex items-center justify-center mb-3">
              <img 
                src="https://preview.redd.it/cyberpunk-2077-logo-evolution-2012-2020-v0-34aw6a4u6py41.gif?width=371&auto=webp&s=afa4c714efecfeedcc87fa341c665c60880ae445" 
                alt="Cyberpunk 2077 Logo" 
                class="max-h-12 object-contain" 
              />
            </div>
            <h4 class="font-bold text-white text-sm">Cyberpunk 2077</h4>
            <p class="text-xs text-emerald-300 mt-1">Sci-Fi RPG / Open World</p>
          </div>
          <a href="https://www.google.com/search?q=Cyberpunk+2077" target="_blank" class="mt-4 text-xs text-cyan-400 hover:underline inline-flex items-center space-x-1 font-semibold">
            <span>Search</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        <div class="bg-slate-950 border border-emerald-800/60 rounded-xl p-5 text-center flex flex-col items-center justify-between shadow-md">
          <div class="w-full flex flex-col items-center">
            <div class="h-16 w-full flex items-center justify-center mb-3">
              <img 
                src="https://i.logos-download.com/84588/31733-d429f40fff5d15782536269ac4b36067.svg/BeamNG.drive_Logo_2015_alternative.svg?dl" 
                alt="BeamNG.drive Logo" 
                class="max-h-12 object-contain" 
              />
            </div>
            <h4 class="font-bold text-white text-sm">BeamNG.drive</h4>
            <p class="text-xs text-emerald-300 mt-1">Vehicle Physics Sim</p>
          </div>
          <a href="https://www.google.com/search?q=BeamNG.drive" target="_blank" class="mt-4 text-xs text-cyan-400 hover:underline inline-flex items-center space-x-1 font-semibold">
            <span>Search</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        <div class="bg-slate-950 border border-emerald-800/60 rounded-xl p-5 text-center flex flex-col items-center justify-between shadow-md">
          <div class="w-full flex flex-col items-center">
            <div class="h-16 w-full flex items-center justify-center mb-3">
              <img 
                src="https://wallpapercave.com/wp/wp4462477.jpg" 
                alt="GTA V Logo" 
                class="max-h-12 object-contain" 
              />
            </div>
            <h4 class="font-bold text-white text-sm">Grand Theft Auto V</h4>
            <p class="text-xs text-emerald-300 mt-1">Action / Open World</p>
          </div>
          <a href="https://www.google.com/search?q=Grand+Theft+Auto+V" target="_blank" class="mt-4 text-xs text-cyan-400 hover:underline inline-flex items-center space-x-1 font-semibold">
            <span>Search</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        <div class="bg-slate-950 border border-emerald-800/60 rounded-xl p-5 text-center flex flex-col items-center justify-between shadow-md">
          <div class="w-full flex flex-col items-center">
            <div class="h-16 w-full flex items-center justify-center mb-3">
              <img 
                src="https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/store/games/bo6/Store_BO6PDP_Hero.webp" 
                alt="Call of Duty Logo" 
                class="max-h-10 object-contain" 
              />
            </div>
            <h4 class="font-bold text-white text-sm">Call of Duty</h4>
            <p class="text-xs text-emerald-300 mt-1">First-Person Shooter</p>
          </div>
          <a href="https://www.google.com/search?q=Call+of+Duty" target="_blank" class="mt-4 text-xs text-cyan-400 hover:underline inline-flex items-center space-x-1 font-semibold">
            <span>Search</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50 border-b border-emerald-200 dark:border-emerald-900/60 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-film text-cyan-500"></i>
        <span>Favorite Movies & Shows</span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-800 shadow-md aspect-[2/3] w-full bg-slate-900/40">
            <img 
              src="https://m.media-amazon.com/images/M/MV5BMzMwYjJkYTYtMGJjYi00NWZlLTlhMGUtNWVhZTA3ZDAwNzA4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" 
              alt="Die Hard Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-emerald-950 dark:text-emerald-50 text-sm">Die Hard</h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-300 mb-2">Best Christmas Movie</p>
            <a 
              href="https://www.google.com/search?q=Die+Hard+movie" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-800 shadow-md aspect-[2/3] w-full bg-slate-900/40">
            <img 
              src="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg" 
              alt="John Wick Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-emerald-950 dark:text-emerald-50 text-sm">John Wick</h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-300 mb-2">Action Cinema</p>
            <a 
              href="https://www.google.com/search?q=John+Wick+movie" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-800 shadow-md aspect-[2/3] w-full bg-slate-900/40">
            <img 
              src="https://m.media-amazon.com/images/M/MV5BN2E1MGM3ZjEtYTQwMS00ZWUzLTk1NTctY2U4NzQzY2YwYWRmXkEyXkFqcGc@._V1_.jpg" 
              alt="Helluva Boss Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-emerald-950 dark:text-emerald-50 text-sm">Helluva Boss</h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-300 mb-2">Animated Series</p>
            <a 
              href="https://www.google.com/search?q=Helluva+Boss+show" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium transition-colors"
            >
              <span>Search Google</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <div class="space-y-3 text-center flex flex-col items-center">
          <div class="rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-800 shadow-md aspect-[2/3] w-full bg-slate-900/40">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0McCC2IcNQ8BmHpVAhWNNKXS6NSwocDD3PPICblL5LSC3doWB_CT9sL93-EXTajY-Uufjw&s=10" 
              alt="Reacher Poster" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 class="font-bold text-emerald-950 dark:text-emerald-50 text-sm">Reacher</h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-300 mb-2">Action Thriller</p>
            <a 
              href="https://www.google.com/search?q=Reacher+series" 
              target="_blank" 
              class="inline-flex items-center space-x-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium transition-colors"
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