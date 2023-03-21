import PropTypes from 'prop-types';

function UserCardTd({ data, dataTestId, className, style }) {
  return (
    <td
      className={ `font-Roboto fs-5 ${className}` }
      data-testid={ dataTestId }
      style={ { ...style } }
    >
      { data }

    </td>
  );
}

UserCardTd.propTypes = {
  className: PropTypes.string,
  data: PropTypes.string,
  dataTestId: PropTypes.string,
  style: PropTypes.objectOf,
}.isRequired;

export default UserCardTd;
