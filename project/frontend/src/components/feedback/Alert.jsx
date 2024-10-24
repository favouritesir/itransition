import PropTypes from "prop-types";

export default function Alert({ icon, msg, buttons, className }) {
  return (
    <div className={`alert ${className}`}>
      {icon}
      {msg}
      {buttons}
    </div>
  );
}

Alert.propTypes = {
  icon: PropTypes.element, // The icon to display on the alert window optional
  msg: PropTypes.element, // The message to display on the alert window
  buttons: PropTypes.arrayOf(PropTypes.element), // The buttons to display on the alert window
  className: PropTypes.string, // Classes for the alert
};
