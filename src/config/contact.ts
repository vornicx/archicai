export const CONTACT_PHONE = '+34644768515'
export const CONTACT_PHONE_DISPLAY = '+34 644 76 85 15'

export const VADIM_CONTACT = {
  name: 'Vadim',
  email: 'vornic@archic.es',
  phone: CONTACT_PHONE,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  role: 'Founder',
  focus: 'Product & Technology',
} as const

export const ARCHIC_FOUNDERS = [VADIM_CONTACT] as const
