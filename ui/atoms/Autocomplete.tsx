import React from 'react'
import {TOptions, TValue} from 'types'
import {Autocomplete as Component} from 'ui/atoms'
import {TextField} from 'ui/atoms/TextField'

type TProps = {
  options?: TOptions
  onChange: (value: TValue) => void
  value?: TValue
}
export const Autocomplete = ({onChange, options = [], ...props}: TProps) => {
  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: TValue) => onChange(value)
  const value = options.find(id => id === props.value) || null

  return (
    <Component
      {...props}
      onChange={handleChange}
      options={options}
      renderInput={params => <TextField {...params} {...props} />}
      size="small"
      value={value}
    />
  )
}
