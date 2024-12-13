import { z } from 'zod'
import i18n from '../i18n/i18n'

const t = i18n.t.bind(i18n)
export const createFormAboutYouSchema = (t) =>
  z.object({
    fullName: z.string().min(1, { message: t('validation.nameRequired') }),
    email: z.string().email({ message: t('validation.invalidEmail') }),
    phoneNumber: z
      .string()
      .min(1, { message: t('validation.phoneNumberRequired') }),
    job: z.string().optional(),
    companyName: z.string().optional()
  })

export type FormAboutYouSchema = z.infer<typeof formAboutYouSchema>

export const createFormYourProjectSchema = (t) => {
  return z
    .object({
      overview: z
        .string()
        .min(1, { message: t('validationFormProject.overviewRequired') }),
      tech: z
        .array(z.number())
        .min(1, { message: t('validationFormProject.techRequired') }),
      service: z
        .array(z.number())
        .min(1, { message: t('validationFormProject.serviceRequired') }),
      otherTech: z.string().optional(),
      otherService: z.string().optional()
    })
    .refine(
      (data) => {
        const otherTechId = 6
        const isOtherTechSelected = data.tech.includes(otherTechId)

        if (isOtherTechSelected) {
          return data.otherTech && data.otherTech.trim() !== ''
        }
        return true
      },
      {
        path: ['otherTech'],
        message: t('validationFormProject.other')
      }
    )
    .refine(
      (data) => {
        const otherServiceId = 7
        const isOtherServiceSelected = data.service.includes(otherServiceId)

        if (isOtherServiceSelected) {
          return data.otherService && data.otherService.trim() !== ''
        }
        return true
      },
      {
        path: ['otherService'],
        message: t('validationFormProject.otherServiceRequired')
      }
    )
}

export type FormYourProjectSchema = z.infer<typeof formYourProjectSchema>

const formBudgetSchema = z.object({
  type: z
    .string()
    .nonempty('Please select the type of team you are looking for'),
  investment: z
    .string()
    .nonempty('Please select your desired investment amount')
})

export type FormBudgetSchema = z.infer<typeof formBudgetSchema>
