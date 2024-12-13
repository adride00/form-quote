import { useEffect } from 'react'
import { useFormQuote } from '../context/quoteContext'
import { actionType, technologies, services } from '../constants/formQuotes'
import { CheckLabel } from './CheckLabel'
import Input from './Input'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { createFormYourProjectSchema } from '../schemas/formQuotes.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

export const FormAboutYourProject = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useFormQuote()

  const formYourProjectSchema = createFormYourProjectSchema(t)

  const methods = useForm({
    resolver: zodResolver(formYourProjectSchema),
    defaultValues: {
      ...state.informationAboutProject
    }
  })

  const { control } = methods

  const techValues = useWatch({
    control,
    name: 'tech',
    defaultValue: []
  })

  const serviceValues = useWatch({
    control,
    name: 'service',
    defaultValue: []
  })

  const otherTechId = 6
  const otherServiceId = 7

  const isOtherTechSelected = techValues.includes(otherTechId)
  const isOtherServiceSelected = serviceValues.includes(otherServiceId)

  useEffect(() => {
    if (state.informationAboutProject) {
      methods.reset({
        ...state.informationAboutProject
      })
    }
  }, [state.informationAboutProject])

  const onSubmit = (data) => {
    dispatch({
      type: actionType.SET_INFORMATION_ABOUT_PROJECT,
      payload: { informationAboutProject: data }
    })
    dispatch({ type: actionType.NEXT_STEP })
  }

  const onReturn = () => {
    const data = methods.getValues();
    dispatch({
      type: actionType.SET_INFORMATION_ABOUT_PROJECT,
      payload: { informationAboutProject: data }
    })
    dispatch({ type: actionType.PREVIOUS_STEP })
  }

  return (
    <section className='your-project'>
      <h2>{t('formAboutYourProject.title')}</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>
            {t('formAboutYourProject.technologyPrompt')} <span>*</span>
          </p>
          <div className='your-project__technology'>
            {technologies.map((technology) => (
              <CheckLabel
                name='tech'
                key={technology.id}
                label={t(`technologies.${technology.id}`)}
                value={technology.id}
              />
            ))}
          </div>
          {methods.formState.errors.tech && (
            <p className='error-message'>{methods.formState.errors.tech.message}</p>
          )}

          {isOtherTechSelected && (
            <>
              <Input
                classNames='your-project__technology text-label'
                type='text'
                name='otherTech'
                label={t('formAboutYourProject.other')}
                required
              />

            </>
          )}

          <p>
            {t('formAboutYourProject.servicePrompt')} <span>*</span>
          </p>
          <div className='your-project__technology'>
            {services.map((service) => (
              <CheckLabel
                name='service'
                key={service.id}
                label={t(`services.${service.id}`)}
                value={service.id}
              />
            ))}
          </div>
          {methods.formState.errors.service && (
            <p className='error-message'>{methods.formState.errors.service.message}</p>
          )}

          {isOtherServiceSelected && (
            <>
              <Input
                classNames='your-project__technology text-label'
                type='text'
                name='otherService'
                label={t('formAboutYourProject.otherService')}
                required
              />
            </>
          )}

          <p>
            {t('formAboutYourProject.overviewPrompt')} <span>*</span>
          </p>
          <Input
            classNames='your-project__overview'
            type='textarea'
            name='overview'
            label=''
            required
          />

          <p className='your-project__labels form-quotes__message'>
            <span>*</span>
            {t('formAboutYourProject.mandatoryField')}
          </p>
          <div className='your-project__buttons'>
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
              <span className='button__text'>{t('formAboutYourProject.next')}</span>
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
