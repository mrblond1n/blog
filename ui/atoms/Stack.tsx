import {Stack as MUIStack, StackProps} from 'ui/atoms';

export const Stack = ({children, ...props}: StackProps) => (
    <MUIStack direction="row" spacing={2} {...props}>
        {children}
    </MUIStack>
);
