import React from 'react';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';

const StyledExperienceItem = styled.div`

`;

const StyledCompanyNameLocation = styled.div`

`;

const StyledLocation = styled.div`

`;

const StyledCompanyName = styled.div`

`;

const StyledRolePeriod = styled.div`

`;

const StyledRole = styled.div`

`;

const StyledPeriod = styled.div`

`;

const ExperienceItem = (props) => {

    return (
        <>
            <StyledCompanyNameLocation>
                <StyledCompanyName>

                </StyledCompanyName>
                <StyledLocation>

                </StyledLocation>
            </StyledCompanyNameLocation>
            <StyledRolePeriod>
                <StyledRole>

                </StyledRole>
                <StyledPeriod>

                </StyledPeriod>
            </StyledRolePeriod>
        </>
    )

}

function Experience(props) {
    const {
        experience,
    } = props;

    return (
        <>
            <SectionTitle
                text="Experience"
            />
        </>
    )
}

export default Experience;
