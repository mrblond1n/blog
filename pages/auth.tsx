import React from 'react';

export default () => {
    const handleSubmit = React.useCallback(e => {
        e.preventDefault();
        Object.fromEntries(new FormData(e.target).entries()) as {email: string; password: string};
    }, []);

    return (
        <div>
            <h1>{'Auth page'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mail">
                    <p>{'email'}</p>
                    <input id="email" name="email" placeholder="email" required type="email" />
                </label>
                <label htmlFor="password">
                    <p>{'password'}</p>
                    <input id="password" name="password" placeholder="password" required type="password" />
                </label>

                <div />

                <button type="submit">{'Отправить'}</button>
            </form>
        </div>
    );
};
