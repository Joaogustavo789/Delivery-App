import PropTypes from 'prop-types';

export default function Label({
  children,
  htmlFor,
  className,
  text,
  Svg,
  svgOnClick,
}) {
  return (
    <label
      htmlFor={ htmlFor }
      style={ { width: '372px' } }
      className={
        `d-flex flex-column justify-content-center align-items-center p-0 mt-3
        ${className}`
      }
    >
      <span className="align-self-start">
        { text }
      </span>
      {children}

      <span className="align-self-end position-absolute pe-3 mt-3">
        {Svg && <Svg type="button" onClick={ svgOnClick } width={ 24 } height={ 24 } />}
      </span>
    </label>
  );
}

Label.defaultProps = {
  className: '',
  Svg: '',
  svgOnClick: () => {},
};

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  Svg: PropTypes.node,
  svgOnClick: PropTypes.func,
};
