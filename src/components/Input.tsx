// InputField.jsx
import React, { useEffect, useState } from 'react';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import { countries, actionType } from '../constants/formQuotes';
import { useFormQuote } from '../context/quoteContext'
interface InputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'textarea' | 'number' | 'select';
  label: string;
  required?: boolean;
  validation?: RegisterOptions;
  placeholder?: string;
  options?: { value: string; label: string }[];
  isSelect?: boolean;
  accept?: string;
  classNames?: string;
  feedback?: string;
  showPassword?: boolean;
  isCurrency?: boolean;
  isPhone?: boolean;
}

const InputField: React.FC<InputProps> = ({
  name,
  type,
  label,
  required = false,
  placeholder,
  validation = {},
  options = [],
  isSelect = false,
  classNames = '',
  feedback = '',
  showPassword = false,
  isCurrency = false,
  isPhone = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [errorClass, setErrorClass] = useState('');
  const [lengtDigits, setLengtDigits] = useState(10);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { dispatch } = useFormQuote();
  const value = watch(name);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleFocus = () => setFocused(true);
  const handleBlur = (event) => {
    if (event.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
      setFocused(false);
    }
  };

  useEffect(() => {
    if (value) {
      setFocused(true);
    }
  }, [value]);

  useEffect(() => {
    if (errors[name]) {
      setErrorClass('error-input');
    } else {
      setErrorClass('');
    }
  }, [errors[name], value]);

  const handleCountryChange = (e) => {

    setValue(name, '');
    const countryCode = e.target.value;
    const country = countries.find((c) => c.code === countryCode);
    setLengtDigits(country.phoneDigits);
    setSelectedCountry(country);

    setValue(`${name}_countryCode`, country.areaCode);
    dispatch({
      type: actionType.SET_COUNTRY_CODE,
      payload: { country_code: country.areaCode },
    });
  };

  const areaCodeValue = watch(`${name}_countryCode`);

  useEffect(() => {
    if (isPhone && areaCodeValue) {
      const country = countries.find(c => c.areaCode === areaCodeValue);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [areaCodeValue, isPhone]);

  return (
    <div className={`input-container ${focused || hasValue ? 'focused' : ''} ${classNames}`}>
      <label
        className={`input-label font--poppins ${focused || hasValue ? 'focused' : ''} ${errorClass}`}
      >
        {label} {required && <span className='asterisk'>*</span>}
      </label>

      <div className={`input-wrapper ${isCurrency ? 'currency-input' : ''} ${isPhone ? 'phone-input' : ''}`}>

        {isPhone && focused && (
          <div className='phone-country-selector'>
            <select value={selectedCountry.code} onChange={handleCountryChange}>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <span className='country-arrow'></span>
          </div>
        )}

        {isPhone && focused && (
          <span className='phone-area-code'>
            <span className='phone-divider'></span>
            {selectedCountry.areaCode}
          </span>
        )}


        {type === 'textarea' ? (
          <textarea
            className={`input-field ${errorClass}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            placeholder={placeholder}
            {...register(name, validation)}
          />
        ) : (
          <input
            type={type}
            className={`input-field ${errorClass}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            placeholder={placeholder}
            minLength={isPhone ? lengtDigits : undefined}
            maxLength={isPhone ? lengtDigits : undefined}
            {...register(name, validation)}
          />
        )}


        {isCurrency && focused && <span className='currency-symbol'>$</span>}
        {isCurrency && focused && (
          <span className='currency-unit'>
            <span className='currency-divider'></span>
            USD
          </span>
        )}
      </div>

      {errors[name] && <p className='form__error'>{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;