export const enum actionType {
  NEXT_STEP,
  PREVIOUS_STEP,
  SET_INFORMATION_ABOUT_YOU,
  SET_INFORMATION_ABOUT_PROJECT,
  FORM_DONE,
  SET_STAFF,
  SET_COUNTRY_CODE
}

export const countries = [
  { code: 'US', name: 'United States', areaCode: '+1', phoneDigits: 10 },
  { code: 'MX', name: 'Mexico', areaCode: '+52', phoneDigits: 10 },
  { code: 'CA', name: 'Canada', areaCode: '+1', phoneDigits: 10 },
  { code: 'GB', name: 'United Kingdom', areaCode: '+44', phoneDigits: 10 },
  { code: 'DE', name: 'Germany', areaCode: '+49', phoneDigits: 10 },
  { code: 'FR', name: 'France', areaCode: '+33', phoneDigits: 9 },
  { code: 'ES', name: 'Spain', areaCode: '+34', phoneDigits: 9 },
  { code: 'IT', name: 'Italy', areaCode: '+39', phoneDigits: 10 },
  { code: 'JP', name: 'Japan', areaCode: '+81', phoneDigits: 10 },
  { code: 'BR', name: 'Brazil', areaCode: '+55', phoneDigits: 11 },
  { code: 'AU', name: 'Australia', areaCode: '+61', phoneDigits: 9 },
  { code: 'IN', name: 'India', areaCode: '+91', phoneDigits: 10 },
  { code: 'CN', name: 'China', areaCode: '+86', phoneDigits: 11 },
  { code: 'ZA', name: 'South Africa', areaCode: '+27', phoneDigits: 9 },
  { code: 'RU', name: 'Russia', areaCode: '+7', phoneDigits: 10 },
  { code: 'NL', name: 'Netherlands', areaCode: '+31', phoneDigits: 9 },
  { code: 'BE', name: 'Belgium', areaCode: '+32', phoneDigits: 9 },
  { code: 'SE', name: 'Sweden', areaCode: '+46', phoneDigits: 10 },
  { code: 'CH', name: 'Switzerland', areaCode: '+41', phoneDigits: 9 },
  { code: 'KR', name: 'South Korea', areaCode: '+82', phoneDigits: 8 },
  { code: 'AR', name: 'Argentina', areaCode: '+54', phoneDigits: 10 },
  { code: 'CL', name: 'Chile', areaCode: '+56', phoneDigits: 9 },
  { code: 'CO', name: 'Colombia', areaCode: '+57', phoneDigits: 10 },
  { code: 'PE', name: 'Peru', areaCode: '+51', phoneDigits: 9 },
  { code: 'VE', name: 'Venezuela', areaCode: '+58', phoneDigits: 10 },
  { code: 'UY', name: 'Uruguay', areaCode: '+598', phoneDigits: 8 },
  { code: 'PY', name: 'Paraguay', areaCode: '+595', phoneDigits: 9 },
  { code: 'BO', name: 'Bolivia', areaCode: '+591', phoneDigits: 8 },
  { code: 'EC', name: 'Ecuador', areaCode: '+593', phoneDigits: 9 },
  { code: 'GT', name: 'Guatemala', areaCode: '+502', phoneDigits: 8 },
  { code: 'CR', name: 'Costa Rica', areaCode: '+506', phoneDigits: 8 },
  { code: 'PA', name: 'Panama', areaCode: '+507', phoneDigits: 8 },
  {
    code: 'DO',
    name: 'Dominican Republic',
    areaCode: '+1-809',
    phoneDigits: 10
  },
  { code: 'SV', name: 'El Salvador', areaCode: '+503', phoneDigits: 8 },
  { code: 'HN', name: 'Honduras', areaCode: '+504', phoneDigits: 8 },
  { code: 'NI', name: 'Nicaragua', areaCode: '+505', phoneDigits: 8 },
  { code: 'CU', name: 'Cuba', areaCode: '+53', phoneDigits: 8 }
]

export const steps = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3
}

export const technologies = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
]

export const services = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 }
]

export const budgetInformation = [{ id: 1 }, { id: 2 }, { id: 3 }]

export const investmentAmount = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
