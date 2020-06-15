import PropTypes from "prop-types";

export const userDataPropType = PropTypes.shape({
  status: PropTypes.string,
  lastName: PropTypes.string,
  weeksToCertify: PropTypes.arrayOf(PropTypes.number),
});

export const setUserDataPropType = PropTypes.func;