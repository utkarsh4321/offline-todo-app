const Input = ({
  type,
  placeholder,
  value,
  className = '',
  name = '',
  onChangeHandler,
  checked = null,
  ariaLabel = '',
}) => {
  return (
    <input
      aria-label={ariaLabel || ''}
      type={type || 'text'}
      placeholder={placeholder || ''}
      value={value || ''}
      name={name}
      className={className || 'formControl dark:bg-gray-700'}
      checked={checked}
      onChange={onChangeHandler}
    />
  );
};

export default Input;
