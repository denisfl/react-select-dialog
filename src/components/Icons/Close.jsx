import PropTypes from 'prop-types'

const CloseIcon = ({
  color = 'currentColor',
  strokeWidth = 1.5,
  className = 'icon-svg',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke={color}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

CloseIcon.propTypes = {
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
}

export default CloseIcon
