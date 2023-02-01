import {ICommand, TextAreaTextApi, TextState} from '@uiw/react-md-editor';
import React from 'react';
import {selectWord} from 'utils/markdown/utils';

export const image: ICommand = {
    name: 'image',
    keyCommand: 'image',
    shortcuts: 'ctrlcmd+k',
    value: '![image]()',
    buttonProps: {'aria-label': 'Add image (ctrl + k)', title: 'Add image (ctrl + k)'},
    icon: (
        <svg height="13" viewBox="0 0 20 20" width="13">
            <path
                d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                fill="currentColor"
            />
        </svg>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
        // Select everything
        const newSelectionRange = selectWord({text: state.text, selection: state.selection});
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the image
        let imageTemplate = '';

        function handleFileSelect(e: Event) {
            const oFReader = new FileReader();
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];

            imageTemplate = state1.selectedText || 'https://example.com/your-image.png';

            if (!file) return;

            api.replaceSelection(`![${file.name}](${imageTemplate})`);

            oFReader.readAsDataURL(file);

            oFReader.onload = function (oFREvent) {
                const src = oFREvent.target?.result;

                if (!src) return;
                const imageEl = Array.from(document.querySelectorAll('img')).find(el => el.alt === file.name);

                imageEl?.setAttribute('src', String(src));
            };
        }

        const inputElement = document.createElement('input');

        inputElement.setAttribute('type', 'file');
        inputElement.setAttribute('hidden', 'true');
        inputElement.addEventListener('change', handleFileSelect);
        inputElement.click();

        api.setSelectionRange({
            start: 4 + state1.selection.start,
            end: 4 + state1.selection.start + imageTemplate.length,
        });
    },
};
