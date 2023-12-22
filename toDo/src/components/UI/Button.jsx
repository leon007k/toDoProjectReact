import PropTypes from 'prop-types';
import './Button.css'

export const Button = ({ addClassName, typeButton, actionButton, children }) => {
  // * permitimos agregar mas clases al boton
  const classes = addClassName != undefined ? 'btn ' + addClassName : 'btn';

  return <button type={typeButton} className={classes} onClick={actionButton}>{children}</button>
}

Button.propTypes = {
  addClassName: PropTypes.string,
  typeButton: PropTypes.string,
  actionButton: PropTypes.func,
  children: PropTypes.node
}

