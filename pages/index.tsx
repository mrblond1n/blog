import {useTheme} from 'next-themes';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {ThemeIcon} from 'ui/atoms/ThemeIcon';
import {SectionTemplate} from 'ui/templates/SectionTemplate';

export default () => {
    const {theme, setTheme} = useTheme();
    const handleClick = React.useCallback(() => setTheme(theme === 'light' ? 'dark' : 'light'), [setTheme, theme]);

    return (
        <SectionTemplate>
            <h1>{'Template'}</h1>
            <Button onClick={handleClick}>
                <ThemeIcon />
            </Button>
        </SectionTemplate>
    );
};
