import {Paper, Typography} from '@mui/material'
import {Icons} from 'icons'
import React from 'react'
import {TValue} from 'types'
import {IconButton} from 'ui/atoms/IconButton'
import {Stack} from 'ui/atoms/Stack'
import {alpha, styled} from 'utils/styles'
import {Img} from 'ui/atoms/Image'

type TProps = {
  value?: TValue
  onChange: (value?: TValue<File>) => void
}

export const Dropzone = ({onChange, ...props}: TProps) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const value = typeof props.value === 'object' && !Array.isArray(props.value) ? props.value : ''
  const imageUrl = value ? URL.createObjectURL(value) : void 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const [file = null] = files ? Array.from(files) : []

    onChange(file)
  }

  const handleClick = () => ref.current?.click()
  const handleDrop = (file: File) => onChange(file)
  const handleRemove = () => onChange(null)

  return (
    <Wrapper>
      {!value && <EmptyDropzone onClick={handleClick} onDrop={handleDrop} />}

      {value && (
        <FilledDropzone url={imageUrl}>
          <DropzoneActions onEdit={handleClick} onRemove={handleRemove} />
        </FilledDropzone>
      )}

      <input ref={ref} hidden onChange={handleChange} type="file" />
    </Wrapper>
  )
}

type TEmptyDropzoneProps = {
  placeholder?: string
  onDrop: (file: File) => void
  onClick: () => void
}

const EmptyDropzone = ({placeholder, onDrop, onClick}: TEmptyDropzoneProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const [file] = Array.from(e.dataTransfer.files)

    onDrop(file)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  return (
    <WrapperEmptyDropzone onClick={onClick} onDragOver={handleDragOver} onDrop={handleDrop} spacing={0.5}>
      <Icons.CloudUpload fontSize="large" />

      <Typography variant="subtitle2">{placeholder || 'drop your file here'}</Typography>
    </WrapperEmptyDropzone>
  )
}

const FilledDropzone = ({children, url}: {children: React.ReactNode; url?: string}) => {
  return (
    <WrapperFilledDropzone>
      <Img src={url} />

      {children}
    </WrapperFilledDropzone>
  )
}

const DropzoneActions = ({onRemove, onEdit}: {onRemove: () => void; onEdit: () => void}) => (
  <WrapperDropzoneActions alignItems="center" justifyContent="center">
    <IconButton onClick={onEdit}>
      <Icons.Edit />
    </IconButton>

    <IconButton onClick={onRemove}>
      <Icons.Delete />
    </IconButton>
  </WrapperDropzoneActions>
)

const Wrapper = styled(Paper)(({theme}) => ({
  position: 'relative',
  minHeight: 200,
  background: alpha(theme.palette.secondary.main, 0.1),
  boxShadow: 'unset',
}))

const styles = {
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  borderRadius: '4px',
} as const

const WrapperEmptyDropzone = styled(Stack)(({theme}) => {
  const color = theme.palette.primary.main.replace('#', '').toUpperCase()

  return {
    ...styles,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${color}FF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  }
})

const WrapperFilledDropzone = styled(Stack)(({theme}) => ({
  ...styles,
  border: `solid 1px ${theme.palette.primary.main}`,
  '&:hover > *:last-of-type': {
    opacity: 1,
  },
}))

const WrapperDropzoneActions = styled(Stack)(({theme}) => ({
  ...styles,
  flexDirection: 'row',
  position: 'absolute',
  background: alpha(theme.palette.common.black, 0.4),
  opacity: 0,
  transition: '0.2s',
  margin: 'unset !important',
  width: '100%',
}))
