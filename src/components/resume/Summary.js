import React from 'react';
import styled from 'styled-components';

const StyleSummary = styled.p`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.2rem solid var(--light-green);
    font-size: 1.75rem;
    letter-spacing: .025em;
    line-height: 1.625;
    font-family: 'Roboto', 'Montserrat', 'sora', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const Summary = (props) => {
    const {
        summary,
    } = props;

    return (
        <StyleSummary>
            {summary}
        </StyleSummary>
    );
};

export default Summary;
