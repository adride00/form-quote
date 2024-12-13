
import { useController, useFormContext } from 'react-hook-form';

type PropCheckLabel = {
  label: string;
  name: string;
  value: string;
  validation?: any;
  setSelectedOther?: any;
};

export const CheckLabel = ({ label, name, value, validation = {}, setSelectedOther = null }: PropCheckLabel) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value: fieldValue },
  } = useController({
    name,
    control,
    rules: validation,
    defaultValue: [],
  });

  const checked = fieldValue.includes(value);

  const handleChange = () => {
    if (setSelectedOther) {
      setSelectedOther((prev: boolean) => {
        if (value === 6) {
          return !prev;
        }
      });
    }

    const newValue = checked
      ? fieldValue.filter((val: string) => val !== value)
      : [...fieldValue, value];

    onChange(newValue);
  };

  return (
    <label className={`technology-checkbox ${checked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};
