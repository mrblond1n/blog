import {render, screen} from '@testing-library/react';
import {INTL} from 'constants/intl';
import {SubmitButtonContainer} from 'features/signup/containers/SubmitButtonContainer';
import React from 'react';
import {intl} from 'utils/intl';

describe('<SubmitButtonContainer />', () => {
    test('should to be exist', () => {
        render(<SubmitButtonContainer />);
        const divElement = screen.getByRole('button');

        expect(divElement).toBeInTheDocument();
    });

    test('should to be submit text', () => {
        render(<SubmitButtonContainer />);
        const divElement = screen.getByRole('button');

        expect(divElement.innerHTML).toBe(intl(INTL.SIGN_UP.SUBMIT));
    });
});
