// Local, optimised sky photography. Source and licence: docs/asset-provenance.md.
export const SKY_PORTRAIT = {
  src: '/media/sky/sky-portrait-1200.webp',
  srcSet: '/media/sky/sky-portrait-720.webp 720w, /media/sky/sky-portrait-1200.webp 1200w',
  sizes: '(max-width: 960px) 100vw, 40vw',
}
export const SKY_WIDE = {
  src: '/media/sky/sky-wide-1600.webp',
  srcSet: '/media/sky/sky-wide-900.webp 900w, /media/sky/sky-wide-1600.webp 1600w',
  sizes: '(max-width: 960px) 100vw, 55vw',
}
export function SkyCredit({ lang }: { lang: 'es' | 'en' }) {
  return (
    <p className="al-credit">
      {lang === 'es' ? 'Foto: ' : 'Photo: '}
      <a href="https://commons.wikimedia.org/wiki/File:Cirrus-cumulus_clouds_in_the_sky.jpg" target="_blank" rel="noopener noreferrer">Rise DHMN, Wikimedia Commons</a>
      {' · '}
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer license">CC BY 4.0</a>
      {lang === 'es' ? ' · recortada' : ' · cropped'}
    </p>
  )
}
