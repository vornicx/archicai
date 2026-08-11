export const CONTACT_PHONE = '+34644768515'
export const CONTACT_PHONE_DISPLAY = '+34 644 76 85 15'

export const VADIM_CONTACT = {
  name: 'Vadim Vornic',
  email: 'vornic@archic.es',
  phone: CONTACT_PHONE,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  role: 'Co-Founder',
  focus: 'Product & Technology',
} as const

export const ANTERO_CONTACT = {
  name: 'Antero',
  email: 'antero@archic.es',
  phone: '+34687503850',
  phoneDisplay: '+34 687 50 38 50',
  role: 'Co-Founder',
  focus: 'Growth & Client Partnerships',
} as const

export const ARCHIC_FOUNDERS = [VADIM_CONTACT, ANTERO_CONTACT] as const
