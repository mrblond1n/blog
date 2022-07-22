import {INTL} from 'constants/intl';
import React from 'react';
import {Body} from 'ui/atoms/Body';
import {Row} from 'ui/atoms/Row';
import {SectionTemplate} from 'ui/templates/SectionTemplate';
import {intl} from 'utils/intl';

export default () => {
    return (
        <SectionTemplate title={<h1>{intl(INTL.ERROR.NOT_FOUND_PAGE.TITLE)}</h1>}>
            <Row alignItems="center" justifyContent="center">
                <Body>{intl(INTL.ERROR.NOT_FOUND_PAGE.TEXT)}</Body>
            </Row>
        </SectionTemplate>
    );
};
