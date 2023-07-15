import React, { useState } from 'react'
import Select, { MultiValue } from 'react-select'

interface Option {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

const MyComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleChange = (options: MultiValue<Option>) => {
    const label = options.map((op) => op.label)
    // // setSelectedOptions([...selectedOptions, value])
    // console.log(selectedOptions)

    console.log([...selectedOptions, label])
  }

  return (
    <div>
      <Select
        isMulti
        options={options}
        // value={selectedOptions}
        onChange={handleChange}
      />
    </div>
  )
}

export default MyComponent
