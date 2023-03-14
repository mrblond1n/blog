import {styled} from '@mui/system'
import {MarkdownPreviewProps} from '@uiw/react-markdown-preview'
import '@uiw/react-markdown-preview/markdown.css'
import {ICommand, MDEditorProps} from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import {useTheme} from 'next-themes'
import dynamic from 'next/dynamic'
import React from 'react'
import {TValue} from 'types'
import {commands} from 'utils/markdown/commands'

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor').then(mod => mod.default), {ssr: false})
const MDPreviewer = dynamic<MarkdownPreviewProps>(
  () => import('@uiw/react-markdown-preview').then(mod => mod.default),
  {
    ssr: false,
  }
)

type TProps = {
  value?: TValue
  onChange: (value?: TValue<string>) => void
  commands?: ICommand[]
  textareaProps?: {
    placeholder?: string
    required?: boolean
  }
}
export const Markdown = (props: TProps) => {
  const {theme} = useTheme()
  const value = typeof props.value === 'string' ? props.value : ''

  return (
    <Wrapper data-color-mode={theme}>
      <MDEditor commands={commands} {...props} value={value} />
    </Wrapper>
  )
}

export const MarkdownPreview = (props: {value?: TValue<string | null>}) => {
  const {theme} = useTheme()
  const value = props.value || ''

  return (
    <Wrapper data-color-mode={theme}>
      <MDPreviewer source={value} />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  '& > *': {background: 'transparent'},
})
