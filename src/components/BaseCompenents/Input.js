const Input = ({
  type,
  placeholder,
  value,
  className = '',
  name = '',
  onChangeHandler,
  checked = null,
  required = false,
  disabled = false,
}) => {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder || ''}
      value={value || ''}
      name={name}
      className={className || 'formControl dark:bg-gray-700'}
      checked={checked}
      onChange={onChangeHandler}
      required={required}
      disabled={disabled}
      autoComplete="off"
    />
  );
};

export default Input;
