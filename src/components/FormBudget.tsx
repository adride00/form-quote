import { useEffect, useState } from 'react'
import { useFormQuote } from '../context/quoteContext'
import { actionType, budgetInformation, investmentAmount, technologies, services } from '../constants/formQuotes'
import RadioLabel from './RadioLabel'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import Input from './Input'
import emailjs from '@emailjs/browser'
emailjs.init({
  publicKey: 'MQ0ADJXqRMtLoMArW',
  // Do not allow headless browsers
  blockHeadless: true,
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000
  }
})
const otherTechId = 6
const otherServiceId = 7
export const FormBudget = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useFormQuote()
  const [inputLabel, setInputLabel] = useState('')
  const [customOption, setCustomOption] = useState(false)
  const createFormBudgetSchema = (t) => z.object({
    type: z.string().nonempty({ message: t('validationFormQuotes.teamTypeRequired') }),
    investment: customOption ? z.string().optional() : z.string().nonempty({ message: t('validationFormQuotes.investmentRequired') }),
    resources: customOption ? z.string().min(1, { message: t('formBudget.resourcesRequired') }) : z.string().optional()
  })

  const formBudgetSchema = createFormBudgetSchema(t)

  const methods = useForm({
    resolver: zodResolver(formBudgetSchema)
  })

  useEffect(() => {
    if (state.budgetInformation) {
      methods.reset({
        ...state.budgetInformation
      })
    }
  }, [state.budgetInformation])

  const onSubmit = (data) => {
    const selectedTechIds = state.informationAboutProject.tech || []
    const selectedServiceIds = state.informationAboutProject.service || []

    const selectedTechLabels = selectedTechIds.map((id) => {
      const idNumber = Number(id)
      if (idNumber === otherTechId) {
        return state.informationAboutProject.otherTech
      } else {
        const tech = technologies.find((tech) => tech.id === idNumber)
        return tech ? t(`technologies.${tech.id}`) : ''
      }
    })

    const selectedServiceLabels = selectedServiceIds.map((id) => {
      const idNumber = Number(id)
      if (idNumber === otherServiceId) {
        return state.informationAboutProject.otherService
      } else {
        const service = services.find((service) => service.id === idNumber)
        return service ? t(`services.${service.id}`) : ''
      }
    })

    const templateParams = {
      fullName: state.informationAboutYou.fullName,
      from_name: 'JDK Group',
      email: state.informationAboutYou.email,
      phone_number: `${state.country_code} ${state.informationAboutYou.phoneNumber}`,
      companyName: state.informationAboutYou.companyName,
      job: state.informationAboutYou.job,
      message: 'We have received your request for a quote. We will contact you soon.',
      overview: state.informationAboutProject.overview,
      technologies: selectedTechLabels.join(', '),
      services: selectedServiceLabels.join(', '),
      type_of_team: data.type,
      investment: data.type === 'Team augmentation' || data.type === 'Ampliación de equipo' ? data.investment : 'Not - set',
      monthly_budget: data.type === 'Staff augmentation' || data.type === 'Ampliación de personal' ? '$' + data.resources : 'Not - set',
      budget_for_project: data.type === 'Fixed price' || data.type === 'Precio fijo' ? '$' + data.resources : 'Not - set'
    }


    emailjs.send('service_1552onj', 'template_fd4v5pb', templateParams).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
        dispatch({ type: actionType.FORM_DONE })
      },
      (error) => {
        console.log('FAILED...', error)
      }
    )
  }

  useEffect(() => {
    if (state.selectStaff === 'Staff augmentation' || state.selectStaff === 'Ampliación de personal') {
      setInputLabel(t('formBudget.staff'))
      setCustomOption(true)
    } else if (state.selectStaff === 'Fixed price' || state.selectStaff === 'Precio fijo') {
      setInputLabel(t('formBudget.budget'))
      setCustomOption(true)
    } else {
      setCustomOption(false)
    }
  }, [state.selectStaff])

  const onReturn = () => {
    const data = methods.getValues();
    dispatch({
      type: actionType.SET_BUDGET_INFORMATION,
      payload: { budgetInformation: data }
    })
    dispatch({ type: actionType.PREVIOUS_STEP })
  }


  return (
    <section className='form-budget'>
      <h2>{t('formBudget.title')}</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>
            {t('formBudget.teamTypePrompt')} <span>*</span>
          </p>
          <div className='form-budget__items team-group'>
            {budgetInformation.map((item) => (
              <RadioLabel
                key={item.id}
                name='type'
                label={t(`budgetInformation.${item.id}`)}
                value={item.id}
              />
            ))}
          </div>
          {methods.formState.errors.type && (
            <p className='error-message'>{methods.formState.errors.type.message}</p>
          )}

          {
            state.selectStaff !== 'Team augmentation' && state.selectStaff !== 'Ampliación de equipo' && state.selectStaff !== ''
              ? (
                <Input
                  classNames='form-budget__items text-label'
                  type='number'
                  name='resources'
                  label={inputLabel}
                  required
                  isCurrency
                />
              )
              : (
                <>
                  <p>
                    {t('formBudget.investmentPrompt')} <span>*</span>
                  </p>
                  <div className='form-budget__items price-group'>
                    {investmentAmount.map((item) => (
                      <RadioLabel
                        handleChanges={false}
                        key={item.id}
                        name='investment'
                        label={t(`investmentAmount.${item.id}`)}
                        value={item.id}
                      />
                    ))}
                  </div>
                  {methods.formState.errors.investment && (
                    <p className='error-message'>{methods.formState.errors.investment.message}</p>
                  )}
                </>
              )
          }

          <p className='form-budget__message form-quotes__message'>
            <span>*</span>
            {t('formBudget.mandatoryField')}
          </p>
          <div className='form-budget__buttons'>
            <button
              type='button'
              onClick={onReturn}
              className='button button--quaternary button--has-icon button--icon-left'
            >
              <span className='button__text'>{t('formAboutYourProject.previous')}</span>
            </button>
            <button
              type='submit'
              className='button button--quaternary button--has-icon button--icon-right'
            >
              <span className='button__text'>{t('formBudget.send')}</span>
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
