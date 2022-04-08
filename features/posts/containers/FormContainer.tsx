import {addNewPost} from 'features/posts/model/events';
import React from 'react';

export const FormContainer = React.memo(() => {
    const handleSubmit = React.useCallback(e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries()) as {title: string; text: string};

        addNewPost(data);
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">
                <p>{'Заголовок'}</p>
                <input id="title" name="title" placeholder="title" required type="text" />
            </label>
            <label htmlFor="text">
                <p>{'Текст'}</p>
                <input id="text" name="text" placeholder="text" required type="text" />
            </label>

            <div />

            <button type="submit">{'Отправить'}</button>
        </form>
    );
});
