/**
 * Identification data required to operate a commercial website in Spain.
 *
 * Article 10 of Ley 34/2002 (LSSI-CE) obliges an information society service
 * provider to publish, permanently and with free, easy and direct access, the
 * data below. Article 13 GDPR obliges the same identification of the data
 * controller in the privacy policy.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED BEFORE THIS GOES LIVE
 *
 * Every field set to `null` is legally mandatory and is NOT something that can
 * be inferred from the codebase. Fill each one with the real registered data.
 * While a field is `null` the legal pages render a visible "pending" marker
 * instead of inventing a value, so nothing false is ever published — but the
 * site is not compliant until they are all filled in.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** A mandatory field that has not been filled in yet. */
export type Pending = null

export type CompanyData = {
  /** Trading name shown across the site. */
  brand: string
  /**
   * Full legal name. For a sole trader (autónomo) this is the person's full
   * name; for a company, the registered company name including its legal form
   * (e.g. "Archic Software, S.L.").
   */
  legalName: string | Pending
  /** NIF (sole trader) or CIF/NIF (company). LSSI art. 10.1.a. */
  taxId: string | Pending
  /** Registered address (street, number, postal code, town, province). */
  address: string | Pending
  /** Country of establishment. */
  country: string
  /** Contact email — direct and effective communication. LSSI art. 10.1.b. */
  email: string
  /**
   * Contact phone. Not strictly mandatory when the email is genuinely
   * effective, but the AEPD and consumer authorities expect a second direct
   * channel. Leave as `null` only if you deliberately publish email only.
   */
  phone: string | Pending
  /**
   * Mercantile Registry entry — mandatory for companies (LSSI art. 10.1.a),
   * not applicable to sole traders. Set to `false` when you trade as an
   * autónomo, so the legal notice omits the section instead of flagging it.
   */
  registry: { entry: string } | false | Pending
  /** Website origin, used to build canonical URLs inside the legal texts. */
  site: string
  /** Date the legal texts were last reviewed (ISO, shown to visitors). */
  lastUpdated: string
}

export const COMPANY: CompanyData = {
  brand: 'Archic',

  // TODO(legal): replace with the registered legal name.
  legalName: null,
  // TODO(legal): replace with the real NIF/CIF.
  taxId: null,
  // TODO(legal): replace with the registered address in Spain.
  address: null,

  country: 'España',
  email: 'vornic@archic.es',

  // TODO(legal): add a contact phone, or document the decision to publish
  // email only.
  phone: null,

  // TODO(legal): set to `false` if trading as autónomo, or fill in the
  // Mercantile Registry entry (registry, volume, folio, sheet, entry number).
  registry: null,

  site: 'https://archic.es',
  lastUpdated: '2026-08-04',
}

/**
 * Third parties that process personal data on our behalf or that receive it as
 * a consequence of how the site is operated. This list must stay in sync with
 * reality: every subprocessor added to the stack (analytics, form backend,
 * newsletter, CRM…) has to be disclosed here under art. 13.1.e GDPR.
 */
export type Processor = {
  name: string
  purpose: { es: string; en: string }
  location: { es: string; en: string }
  /** Safeguard for transfers outside the EEA, when one applies. */
  transfer?: { es: string; en: string }
}

export const PROCESSORS: Processor[] = [
  {
    name: 'GitHub, Inc. (GitHub Pages) — Microsoft Corporation',
    purpose: {
      es: 'Alojamiento del sitio web y entrega de sus contenidos.',
      en: 'Website hosting and delivery of its content.',
    },
    location: {
      es: 'Estados Unidos, con red de distribución global.',
      en: 'United States, with a global delivery network.',
    },
    transfer: {
      es: 'Transferencia internacional amparada en la Decisión de Adecuación del EU-U.S. Data Privacy Framework y en Cláusulas Contractuales Tipo.',
      en: 'International transfer covered by the EU-U.S. Data Privacy Framework adequacy decision and by Standard Contractual Clauses.',
    },
  },
]
