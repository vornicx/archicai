export const CONTACT_PHONE = '+34644768515'
export const CONTACT_PHONE_DISPLAY = '+34 644 76 85 15'
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace(/\D/g, '')}`
export const CONTACT_MESSAGE_URL = `sms:${CONTACT_PHONE}`

export const VADIM_CONTACT = {
  name: 'Vadim Vornic',
  email: 'vornic@archic.es',
  phone: CONTACT_PHONE,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  whatsappUrl: CONTACT_WHATSAPP_URL,
  messageUrl: CONTACT_MESSAGE_URL,
  role: 'Founder',
  focus: 'Product & Technology',
} as const

export const ARCHIC_FOUNDERS = [VADIM_CONTACT] as const
