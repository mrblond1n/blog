import {INTL} from 'constants/intl'
import {useEvent, useStoreMap} from 'effector-react'
import {closeModal} from 'features/common/modal/models/events'
import {$modalIndex, $openIndex} from 'features/common/modal/models/stores'
import {Icons} from 'icons'
import React from 'react'
import {Typography} from 'ui/atoms'
import {Button} from 'ui/atoms/Button'
import {IconButton} from 'ui/atoms/IconButton'
import {Modal} from 'ui/atoms/Modal'
import {Stack} from 'ui/atoms/Stack'
import {intl} from 'utils/intl'

export const ModalContainer = ({children, id}: {children: React.ReactNode; id: string}) => {
  const isOpen = useStoreMap({
    store: $openIndex,
    keys: [id],
    fn: (state, [id]) => Boolean(state[id]),
  })

  const onClose = useEvent(closeModal)
  const handleClose = () => onClose(id)

  return (
    <Modal onClose={handleClose} open={isOpen}>
      <Stack direction="column">
        <HeaderContainer id={id} />
        {children}
      </Stack>
    </Modal>
  )
}

const HeaderContainer = ({id}: {id: string}) => {
  const modal = useStoreMap({
    store: $modalIndex,
    keys: [id],
    defaultValue: null,
    fn: (state, [id]) => state[id],
  })

  const onClose = useEvent(closeModal)
  const handleClose = () => onClose(id)

  return (
    <Stack alignItems="center" justifyContent="space-between">
      <Typography>{modal?.title}</Typography>

      <IconButton aria-label={intl(INTL.ACTION.CANCEL)} onClick={handleClose}>
        <Icons.CloseOutlined />
      </IconButton>
    </Stack>
  )
}

export const CancelBtnContainer = ({id}: {id: string}) => {
  const onClose = useEvent(closeModal)
  const handleClick = () => onClose(id)

  return <Button onClick={handleClick}>{intl(INTL.ACTION.CANCEL)}</Button>
}
