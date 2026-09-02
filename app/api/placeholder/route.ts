import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const label = request.nextUrl.searchParams.get('label') || 'Chart screenshot placeholder'
  const safeLabel = label.replace(/[<>&]/g, '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#08111f"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs>
    <rect width="1200" height="675" fill="url(#g)"/>
    <g stroke="#38bdf8" stroke-width="4" fill="none" opacity="0.75">
      <path d="M80 500 C180 420 250 470 330 360 S520 260 610 330 S780 430 910 250 S1080 210 1140 160"/>
      <path d="M80 555 H1140" opacity="0.3"/><path d="M80 120 H1140" opacity="0.15"/>
    </g>
    <rect x="90" y="80" width="1020" height="515" rx="28" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
    <text x="600" y="315" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="white">${safeLabel}</text>
    <text x="600" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#bae6fd">Replace with compressed chart screenshot/GIF</text>
  </svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
