import {forward, sample} from 'effector'
import {closeMenu, onClose, onOpen, onRemove, openMenu} from 'features/common/comments/menu/model/events'
import {$prevMenuId} from 'features/common/comments/menu/model/store'

sample({
  clock: openMenu,
  source: $prevMenuId,
  target: closeMenu,
})

forward({
  from: onOpen,
  to: openMenu,
})

forward({
  from: [onClose, onRemove],
  to: closeMenu,
})
