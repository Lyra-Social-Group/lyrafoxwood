// functions/api/ai.js
export async function onRequest(context) {
  const content = `
LYRA FOXWOOD - DIGITAL PORTFOLIO & MUSIC HUB
============================================

About:
Trans-feminine fox, tech enthusiast, Linux explorer, content creator, and musician based in Michigan, USA.

Quick Profile:
- Pronouns: She / Her (MTF)
- Primary OS: Arch Linux & Nobara
- Career Goal: IT & Network Infrastructure

Key Pages:
- Home & About: https://lyrafoxwood.app/about
- Music Hub: https://lyrafoxwood.app/music
- Links & Contact: https://lyrafoxwood.app/links

Contact:
- Email: Contactme@lyrafoxwood.app
- Website: https://lyrafoxwood.app
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}