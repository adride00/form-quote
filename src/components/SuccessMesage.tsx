import { useTranslation } from 'react-i18next'

const SuccessMesage = () => {
  const { t } = useTranslation()

  return (
    <section className='success-message'>
      <img src='https://jdoutstanding.com/wp-content/uploads/2024/12/get-a-quote-check-icon.svg' alt='' />
      <h2>{t('successMessage.title')}</h2>
      <p>{t('successMessage.message1')}</p>
      <p>{t('successMessage.message2')}</p>
    </section>
  )
}

export default SuccessMesage
