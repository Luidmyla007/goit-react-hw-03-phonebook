import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onClick }) => {
  return (
    <li className={css.contact__item} key={id}>
      <span>
        {name}: {number}
      </span>
      <button className={css.contact__button} type="button" onClick={() => onClick(id)}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ContactItem;