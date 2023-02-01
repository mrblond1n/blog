import '@uiw/react-markdown-preview/markdown.css';
import {ICommand, MDEditorProps} from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import {useTheme} from 'next-themes';
import dynamic from 'next/dynamic';
import React from 'react';
import {commands} from 'utils/markdown/commands';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor').then(mod => mod.default), {ssr: false});

type TProps = {
    value?: string;
    onChange: (value?: string) => void;
    commands?: ICommand[];
};
export const Markdown = (props: TProps) => {
    const {theme} = useTheme();

    return (
        <div className="container" data-color-mode={theme}>
            <MDEditor commands={commands} {...props} />
        </div>
    );
};
