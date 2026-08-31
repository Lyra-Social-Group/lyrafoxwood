export async function onRequest(context) {
  const { request } = context;
  const acceptHeader = request.headers.get('Accept') || '';

  // Check if the client explicitly requests Markdown via Content Negotiation
  if (acceptHeader.includes('text/markdown')) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Route path to corresponding Markdown content
    let markdownContent = getMarkdownForPath(pathname);

    return new Response(markdownContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // Otherwise, fallback to default HTML/SPA rendering
  return await context.next();
}

function getMarkdownForPath(path) {
  switch (path) {
    case '/':
    case '/about':
      return `# Lyra Foxwood

> Trans-feminine fox, tech enthusiast, Linux explorer, content creator, and musician based in Michigan, USA.

## Quick Profile
- **Name**: Lyra Foxwood
- **Pronouns**: She / Her (MTF)
- **Location**: Michigan, USA
- **Website**: https://lyrafoxwood.app
- **Contact Email**: Contactme@lyrafoxwood.app
- **Primary OS**: Arch Linux & Nobara
- **Career Goal**: IT & Network Infrastructure

## Technical Passions
- **Linux Systems Administration**: Desktop customization, shell scripting, Arch Linux & Nobara workflows.
- **Hardware Engineering**: Custom PC assembly, hardware diagnostics, network configurations.
- **Web Applications**: Frontend development with Vue 3, Nuxt, and Tailwind CSS.
- **Music Production**: Writing and recording multi-genre music (Heavy Metal, Rock, Electronic).
`;

    case '/skills':
      return `# Skills & Technical Focus - Lyra Foxwood

## Systems & Infrastructure
- Linux Administration (Arch Linux, Nobara, Fedora)
- Hardware Diagnostics & PC Assembly
- Network Engineering Basics

## Web & Software
- Vue 3 / Nuxt.js
- Tailwind CSS
- REST APIs & Cloud Services
`;

    case '/music':
      return `# Music Hub - Lyra Foxwood

> Multi-genre music creation, live streaming, and favorite rotations.

## Genre Focus
Heavy Metal, Hard Rock, Electronic, and VR Streaming Soundtracks.

## Favorite Playlists
- VRC & Streaming Rotation
- Heavy Metal & Hard Rock
- Late Night Coding & Tech
`;

    case '/links':
      return `# Social & Media Links - Lyra Foxwood

- **Twitch**: https://twitch.tv/LyraFoxwood
- **YouTube**: https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g
- **Bluesky**: https://bsky.app/profile/lyrafoxwood.social
- **Telegram**: https://t.me/Lyrafoxwood
- **Patreon**: https://patreon.com/LyraTheFox
`;

    default:
      return `# 404 Not Found

The requested path '${path}' does not exist on lyrafoxwood.app.
`;
  }
}