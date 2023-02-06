import {sample} from 'effector'
import {$uid} from 'features/app/model/stores'
import {
  onDislike,
  onLike,
  setDislike,
  setLike,
  unsetDislike,
  unsetLike,
  updateCommentLikes,
} from 'features/common/comments/liked/model/events'
import {$dislikedUsersIndex, $likedUsersIndex} from 'features/common/comments/liked/model/stores'

sample({
  clock: onLike,
  source: $uid,
  fn: (value, key) => ({key, value}),
  target: setLike,
})

sample({
  clock: onDislike,
  source: $uid,
  fn: (value, key) => ({key, value}),
  target: setDislike,
})

sample({
  clock: setDislike,
  source: $likedUsersIndex,
  filter: (index, {key, value}) => index[key].includes(value),
  fn: (_, payload) => payload,
  target: unsetLike,
})

sample({
  clock: setLike,
  source: $dislikedUsersIndex,
  filter: (index, {key, value}) => index[key].includes(value),
  fn: (_, payload) => payload,
  target: unsetDislike,
})

sample({
  clock: [setLike, setDislike],
  source: {liked: $likedUsersIndex, disliked: $dislikedUsersIndex},
  fn: ({liked, disliked}, {key}) => ({key, liked: liked[key], disliked: disliked[key]}),
  target: updateCommentLikes,
})
