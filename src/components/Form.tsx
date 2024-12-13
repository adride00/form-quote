import { useEffect, useRef } from 'react'
import { FormAboutYou } from './FormAboutYou'
import { FormQuoteContextProvider, useFormQuote } from '../context/quoteContext'
import Stepper from './Stepper'
import { FormAboutYourProject } from './FormAboutYourProject'
import { FormBudget } from './FormBudget'
import SuccessMesage from './SuccessMesage'
import '../i18n/i18n'
import { useTranslation } from 'react-i18next'
import { getLangFromUrl } from '../utils/utils'

const steps = [
  { id: 1, labelText: '' },
  { id: 2, labelText: '' },
  { id: 3, labelText: '' }
]

export const Form = () => {
  const { state } = useFormQuote()
  const { t, i18n } = useTranslation()
  const formRef = useRef(null)
  const isInitialRender = useRef(true)

  useEffect(() => {
    const lang = getLangFromUrl(window.location.pathname)
    i18n.changeLanguage(lang)
  }, [i18n])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
    } else {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [state.step])

  return (
    <section id='quote' className='form-quotes' ref={formRef}>
      <div className='form-quotes__description-container'>
        <h2 className='form-quotes__title font--poppins'>{t('form.title')}</h2>
        <p className='form-quotes__description font--poppins'>
          {t('form.descriptionReason')}
        </p>
        <p className='form-quotes__description font--poppins'>
          {t('form.descriptionCTA')}
        </p>
      </div>

      <Stepper steps={steps} currentStep={state.step} />
      {state.formDone
        ? (
          <SuccessMesage />
        )
        : (
          <>
            {state.step === 1 && <FormAboutYou />}
            {state.step === 2 && <FormAboutYourProject />}
            {state.step === 3 && <FormBudget />}
          </>
        )}
    </section>
  )
}

export const FormQuote = () => (
  <FormQuoteContextProvider>
    <Form />
  </FormQuoteContextProvider>
)
