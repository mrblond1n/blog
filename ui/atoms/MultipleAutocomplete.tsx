import React from 'react'
import {TOptions, TValue} from 'types'
import {Autocomplete as Component} from 'ui/atoms'
import {TextField} from 'ui/atoms/TextField'

type TProps = {
  options?: TOptions
  onChange: (value: TValue<string[]>) => void
  value?: TValue
}
export const MultipleAutocomplete = ({onChange, options = [], ...props}: TProps) => {
  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string[]) => onChange(value)
  const value =
    (Array.isArray(props.value) &&
      props.value?.reduce((prev: string[], id) => {
        const option = options?.find(option => option === id)

        if (!option) return prev

        return prev.concat(option)
      }, [])) ||
    []

  return (
    <Component
      {...props}
      disableCloseOnSelect
      multiple
      onChange={handleChange}
      options={options}
      renderInput={params => <TextField {...params} {...props} />}
      size="small"
      value={value}
    />
  )
}
