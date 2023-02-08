import {styled} from '@mui/system'
import React from 'react'
import ReactCrop, {Crop, PixelCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {Button} from 'ui/atoms/Button'
import {Stack} from 'ui/atoms/Stack'
import {canvasPreview} from 'utils/crop/canvasPreview'
import {useDebounceEffect} from 'utils/hooks/useDebounceEffect'

type TProps = {
  url?: string
  file?: File
  onSelect: (file: File) => void
  onCancel: () => void
}

export const CropImage = ({url, file, onSelect, onCancel}: TProps) => {
  const [crop, setCrop] = React.useState<Crop>()
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()
  const [value, setValue] = React.useState<File>()

  const imgRef = React.useRef<HTMLImageElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const handleComplete = (value: PixelCrop) => setCompletedCrop(value)
  const handleClick = () => value && onSelect(value)
  const handleCancel = () => {
    setCrop(state => state && {...state, width: 0, height: 0})
    onCancel()
  }

  useDebounceEffect(
    async () => {
      const img = imgRef.current
      const canvas = canvasRef.current

      if (completedCrop?.width && completedCrop?.height && img && canvas) {
        await canvasPreview(img, canvas, completedCrop)
        const dataURL = canvas.toDataURL()

        if (dataURL) {
          const blob = await (await fetch(dataURL)).blob()

          setValue(new File([blob], file?.name || 'cropped'))
        }
      }
    },
    100,
    [completedCrop]
  )

  return (
    <>
      <StyledReactCrop crop={crop} onChange={setCrop} onComplete={handleComplete}>
        <img ref={imgRef} alt="cropped" height="100%" src={url} />

        <canvas ref={canvasRef} hidden />
      </StyledReactCrop>

      <ButtonsContainer onCancel={handleCancel} onSave={handleClick} />
    </>
  )
}

const ButtonsContainer = ({onSave, onCancel}: {onSave: () => void; onCancel: () => void}) => {
  return (
    <StyledButtonsWrapper>
      <Button onClick={onSave}>{'save'}</Button>
      <Button onClick={onCancel}>{'Cancel'}</Button>
    </StyledButtonsWrapper>
  )
}

const StyledButtonsWrapper = styled(Stack)(() => ({
  position: 'absolute',
  bottom: 0,
}))

const StyledReactCrop = styled(ReactCrop)(() => ({
  '& > *': {
    height: '100%',
  },
}))
