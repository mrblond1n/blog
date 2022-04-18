import {render, screen} from '@testing-library/react';
import {INTL} from 'constants/intl';
import {SubmitButtonContainer} from 'features/auth/containers/SubmitButtonContainer';
import {setState} from 'features/auth/model/events';
import React from 'react';
import {intl} from 'utils/intl';

describe('<SubmitButtonContainer />', () => {
    test('should render SubmitButtonContainer', () => {
        render(<SubmitButtonContainer />);
        const element = screen.getByRole('button');

        expect(element).toBeInTheDocument();
    });

    test('should render SubmitButtonContainer with sign_in text', () => {
        render(<SubmitButtonContainer />);
        const element = screen.getByRole('button');

        expect(element.innerHTML).toBe(intl(INTL.AUTH.SIGN_IN));
    });

    test('should render SubmitButtonContainer with sign_up text', () => {
        setState('SIGN_UP');

        render(<SubmitButtonContainer />);
        const element = screen.getByRole('button');

        expect(element.innerHTML).toBe(intl(INTL.AUTH.SIGN_UP));
    });
});
