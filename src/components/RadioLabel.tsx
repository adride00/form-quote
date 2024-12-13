
import { useController, useFormContext } from 'react-hook-form'
import { useFormQuote } from '../context/quoteContext'
import { actionType } from '../constants/formQuotes'

type radioLabelProps = {
  label: string
  name: string
  handleChanges?: boolean
}
const RadioLabel: React.FC<radioLabelProps> = ({ label, name, handleChanges = true }) => {
  const { control } = useFormContext()
  const { dispatch } = useFormQuote()
  const {
    field: { value, onChange }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  const handleChange = (label: string) => {
    onChange(label)
    if (!handleChanges) return
    if (label === 'Aumento de personal' || label === 'Staff augmentation' || label === 'Precio fijo' || label === 'Fixed price') {
      dispatch({ type: actionType.SET_STAFF, payload: { selectStaff: label } })
    } else {
      dispatch({ type: actionType.SET_STAFF, payload: { selectStaff: label } })
    }
  }
  const isChecked = value === label

  return (
    <label className={`technology-radio-button ${isChecked ? 'selected' : ''}`}>
      <input
        type='radio'
        value={label}
        checked={isChecked}
        onChange={() => handleChange(label)}
      />
      <span className='radio-custom' />
      {label}
    </label>
  )
}

export default RadioLabel
