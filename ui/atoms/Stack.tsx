import {StackProps} from 'types/components'
import {Stack as MUIStack} from 'ui/atoms'

export const Stack = ({children, ...props}: StackProps) => (
  <MUIStack direction="row" spacing={2} {...props}>
    {children}
  </MUIStack>
)
