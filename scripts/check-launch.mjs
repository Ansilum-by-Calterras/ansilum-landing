import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const nextEnv = createRequire(require.resolve('next/package.json'))('@next/env')
nextEnv.loadEnvConfig(process.cwd())
const issues = []
const https = (value) => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}
if (!https(process.env.NEXT_PUBLIC_SITE_URL))
  issues.push(
    'Set the confirmed HTTPS canonical domain (NEXT_PUBLIC_SITE_URL).',
  )
if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  )
)
  issues.push('Set a monitored company email (NEXT_PUBLIC_CONTACT_EMAIL).')
for (const [key, name] of [
  ['NEXT_PUBLIC_FOUNDER_NAME', 'public founder name'],
  ['NEXT_PUBLIC_FOUNDER_PROFILE', 'public founder profile'],
  ['NEXT_PUBLIC_COMPANY_CITY', 'operating city'],
  ['NEXT_PUBLIC_COMPANY_SINCE', 'operating start year'],
])
  if (!process.env[key]) issues.push(`Confirm the ${name} (${key}).`)
const webhook = process.env.DEMO_INTAKE_URL
if (
  webhook
    ? !https(webhook)
    : !process.env.DEMO_STORAGE_DIR?.startsWith('/') || process.env.VERCEL
)
  issues.push(
    'Configure an HTTPS durable intake or an absolute persistent volume for a non-serverless Node host.',
  )
if (issues.length) {
  console.error(
    'Publication prerequisites remain:\n' +
      issues.map((item) => `- ${item}`).join('\n'),
  )
  process.exitCode = 1
} else
  console.log(
    'Configuration prerequisites present. Still verify contact ownership, durable delivery, product scope, and HTTPS in the deployment. This check cannot verify business facts.',
  )
