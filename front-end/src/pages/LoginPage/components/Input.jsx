import PropTypes from 'prop-types';

export default function Input({
  type,
  dataTestId,
  placeholder,
  label,
  id,
  onChange,
  value,
  style,
}) {
  return (

    <input
      id={ id }
      type={ type }
      data-testid={ dataTestId }
      placeholder={ placeholder }
      value={ value }
      onChange={ onChange }
      label={ label }
      style={ {
        height: '72px',
        borderRadius: '4px',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
        ...style,
      } }
      className="w-100 ps-3 w-100"
    />

  );
}

Input.defaultProps = {
  placeholder: '',
  dataTestId: '',
  style: {},
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dataTestId: PropTypes.string,
  style: PropTypes.objectOf(),
};
