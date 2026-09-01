import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(process.cwd())
const failures = []
const passes = []
const read = (path) => readFileSync(resolve(ROOT, path), 'utf8')
const check = (condition, label, detail = '') => {
  if (condition) passes.push(label)
  else failures.push(detail ? `${label}: ${detail}` : label)
}

for (const file of [
  'docs/engineering-quality-contract.md',
  'server/contact-api.test.mjs',
  'scripts/boundary-audit.mjs',
]) {
  check(existsSync(resolve(ROOT, file)), `Staff quality contract exists: ${file}`)
}

const packageJson = JSON.parse(read('package.json'))
const tsconfig = JSON.parse(read('tsconfig.json'))
const main = read('src/main.tsx')
const homeStyleEntry = read('src/pages/ArchicHomeAAA.css')
const contactUi = read('src/components/StudioContact.tsx')
const contactApi = read('server/contact-api.mjs')
const visualWorkflow = read('.github/workflows/visual-audit.yml')

check(tsconfig.compilerOptions?.strict === true, 'TypeScript strict mode remains enabled')
check(tsconfig.compilerOptions?.noUnusedLocals === true, 'Unused locals remain compile-time errors')
check(tsconfig.compilerOptions?.noUnusedParameters === true, 'Unused parameters remain compile-time errors')
check(tsconfig.compilerOptions?.noUncheckedSideEffectImports === true, 'Unchecked side-effect imports remain blocked')

const globalStyleImports = [...main.matchAll(/import ['"]\.\/styles\/([^'"]+\.css)['"]/g)].map((match) => match[1])
check(globalStyleImports.length <= 23, 'Global CSS cascade does not exceed the current legacy budget', `${globalStyleImports.length} global layers`)
check(new Set(globalStyleImports).size === globalStyleImports.length, 'Global CSS imports contain no duplicates')

const homeStyleLayers = [...homeStyleEntry.matchAll(/@import\s+url\(['"]?([^)'"\s]+)['"]?\)/g)].map((match) => match[1])
check(homeStyleLayers.length <= 3, 'AAA home route does not accumulate another patch stylesheet', `${homeStyleLayers.length} route layers`)
check(new Set(homeStyleLayers).size === homeStyleLayers.length, 'AAA home route style imports contain no duplicates')

check(contactUi.includes('CONTACT_TIMEOUT_MS'), 'Contact UI declares an explicit dependency deadline')
check(contactUi.includes('new AbortController()') && contactUi.includes('signal: controller.signal'), 'Contact UI propagates cancellation to fetch')
check(contactUi.includes('requestRef.current?.abort()'), 'Contact UI cancels stale/in-flight submissions')
check(contactUi.includes('maxLength={120}') && contactUi.includes('maxLength={3000}'), 'Contact UI bounds user-controlled field sizes')

check(contactApi.includes('MAX_RATE_BUCKETS'), 'Contact API bounds rate-limit cardinality')
check(contactApi.includes("req.headers?.['x-real-ip']"), 'Contact API keys abuse controls from Railway remote-IP header')
check(!contactApi.includes("req.headers['x-forwarded-for']"), 'Contact API does not trust arbitrary forwarded-for chains')
check(contactApi.includes('AbortSignal.timeout(DELIVERY_TIMEOUT_MS)'), 'Contact API gives Resend an explicit deadline')
check(contactApi.includes('server.requestTimeout = REQUEST_TIMEOUT_MS'), 'Contact API bounds inbound request duration')
check(contactApi.includes("error: 'unsupported_media_type'"), 'Contact API rejects unexpected media types')
check(contactApi.includes("res.setHeader('X-Request-Id', requestId)"), 'Contact API emits a correlation identifier')
check(contactApi.includes("process.once('SIGTERM'"), 'Contact API drains connections on platform shutdown')

check(visualWorkflow.includes('scripts/boundary-audit.mjs'), 'Rendered CI executes the boundary audit')
check(visualWorkflow.includes('boundary-report.json'), 'Boundary diagnostics are preserved as CI artifacts')

check(packageJson.scripts?.['test:server'] === 'node --test server/*.test.mjs', 'Server invariant tests have a stable script')
check(packageJson.scripts?.['quality:staff'] === 'node scripts/staff-quality-gate.mjs && npm run test:server', 'Staff fitness functions are executable')
check(String(packageJson.scripts?.['quality:gate'] || '').includes('npm run quality:staff'), 'Production quality gate includes Staff gate')

console.log(`\nArchic Staff Engineering Gate — ${passes.length} checks passed`)
for (const label of passes) console.log(`  ✓ ${label}`)
if (failures.length) {
  console.error(`\n${failures.length} staff quality invariant${failures.length === 1 ? '' : 's'} failed:`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}
console.log('\nStaff engineering invariants passed.\n')
