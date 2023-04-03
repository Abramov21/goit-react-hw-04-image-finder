import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <button type="submit" className={s.Button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
