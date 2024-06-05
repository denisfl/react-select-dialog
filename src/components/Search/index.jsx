import PropTypes from 'prop-types'

const Search = ({ label, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="search" onChange={onChange} />
    </div>
  )
}

Search.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Search
