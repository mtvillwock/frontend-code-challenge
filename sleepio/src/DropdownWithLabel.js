import React from 'react'
import PropTypes from 'prop-types'

const DropdownWithLabel = ({ labelText, onChange, options }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
      <label>{labelText}</label>
      <select onChange={onChange}>
        {options.map(option =>
          <option
            key={`${labelText.split(' ').join('-')}-${option}`}
            value={option}>
            {option}
          </option>)
        }
      </select>
    </div>
  )
}

DropdownWithLabel.propTypes = {
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

export default DropdownWithLabel
