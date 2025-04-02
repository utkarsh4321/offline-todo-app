const Input = ({ type, placeholder, value, className = '', name = '' }) => {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder || ''}
      value={value || ''}
      name={name}
      className={className || 'formControl dark:bg-gray-700'}
    />
  );
};

export default Input;
