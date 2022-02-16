import React from 'react'
import PropTypes from 'prop-types'

// TODO: Add accessibility properties
const DropdownWithLabel = ({ labelText, onChange, options }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
      <label htmlFor={labelText}>{labelText}</label>
      <select id={labelText} onChange={onChange}>
        {options.map(option =>
          <option
            data-testid="select-option"
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
