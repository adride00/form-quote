import { useEffect } from 'react';
import Input from './Input';
import { useFormQuote } from '../context/quoteContext';
import { actionType } from '../constants/formQuotes';
import { useForm, FormProvider } from 'react-hook-form';
import { createFormAboutYouSchema, type FormAboutYouSchema } from '../schemas/formQuotes.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

export const FormAboutYou = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useFormQuote();

  const formAboutYouSchema = createFormAboutYouSchema(t)
  const methods = useForm({
    resolver: zodResolver(formAboutYouSchema),
    mode: 'onChange',
    defaultValues: {
      ...state.informationAboutYou,
      phoneNumber_countryCode: state.country_code || '+1'
    },
  });

  useEffect(() => {
    if (state.informationAboutYou) {
      methods.reset({
        ...state.informationAboutYou,
      });
    }
  }, [state.informationAboutYou]);

  const onSubmit = (data: FormAboutYouSchema) => {

    dispatch({ type: actionType.NEXT_STEP });
    dispatch({
      type: actionType.SET_INFORMATION_ABOUT_YOU,
      payload: { informationAboutYou: data },
    });
  };

  return (
    <>
      <h2 className='form-quotes__name font--poppins'>{t('formAboutYou.title')}</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='form-quotes__form'>
            <Input type='text' name='fullName' label={t('formAboutYou.fullName')} required />
            <Input type='text' name='email' label={t('formAboutYou.emailAddress')} required />
            <Input type='text' name='phoneNumber' label={t('formAboutYou.phoneNumber')} required isPhone={true} />
            <Input type='text' name='job' label={t('formAboutYou.jobTitle')} />
            <Input type='text' name='companyName' label={t('formAboutYou.companyName')} />
          </div>
          <p className='form-quotes__message'>
            <span>*</span>
            {t('formAboutYou.mandatoryField')}
          </p>
          <div className='form-quotes__buttons'>
            <button className='button button--quaternary button--has-icon button--icon-right'>
              <span className='button__text'>{t('formAboutYou.next')}</span>
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
