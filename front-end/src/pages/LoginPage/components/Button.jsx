import PropTypes from 'prop-types';

export default function Button({
  dataTestId,
  onClick,
  disabled,
  children,
  style,
  className,
}) {
  return (
    <button
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ disabled }
      type="button"
      style={ {
        width: '372px',
        borderRadius: '12px',
        height: '60px',
        ...style,
        borderWidth: '1px',
        borderStyle: 'solid',
        fontFamily: 'Roboto',
        fontSize: '20px',
      } }
      className={ `d-flex justify-content-center align-items-center mt-3 ${className}` }
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  dataTestId: '',
  style: {},
  className: '',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string,
  style: PropTypes.objectOf(),
  className: PropTypes.string,
};
