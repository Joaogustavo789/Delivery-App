import PropTypes from 'prop-types';
import '../AdminPage.css';
import btnDelete from '../../../images/btnDelete.svg';
import UserCardTd from './UserCardTd';

function UserCard({ index, name, email, role, id, deleteUser }) {
  return (
    <tr className="trTdTableUser" key={ index }>
      <UserCardTd
        className="indexUser"
        data={ index }
        dataTestId={
          `admin_manage__element-user-table-item-number-${index}`
        }
      />
      <UserCardTd
        data={ name }
        className="nameUser"
        dataTestId={
          `admin_manage__element-user-table-name-${index}`
        }
      >
        { name }

      </UserCardTd>
      <UserCardTd
        data={ email }
        className="emailUser"
        dataTestId={
          `admin_manage__element-user-table-email-${index}`
        }
      >
        { email }

      </UserCardTd>
      <UserCardTd
        data={ role }
        className="roleUser"
        dataTestId={
          `admin_manage__element-user-table-role-${index}`
        }
      >
        { role }

      </UserCardTd>
      <td>
        <button
          className="btnExcluir"
          dataTestId={
            `admin_manage__element-user-table-remove-${index}`
          }
          type="button"
          onClick={ () => deleteUser(id) }
        >
          <img src={ btnDelete } alt="" />
        </button>
      </td>
    </tr>
  );
}

UserCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  id: PropTypes.number,
  deleteUser: PropTypes.func,
}.isRequired;

export default UserCard;
