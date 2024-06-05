import PropTypes from 'prop-types'

const Search = ({ label, onChange }) => {
  return (
    <div role="search">
      <label htmlFor="search-input">{label}</label>
      <input
        type="search"
        id="search-input"
        onChange={onChange}
        aria-label={label}
      />
    </div>
  )
}

Search.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Search
