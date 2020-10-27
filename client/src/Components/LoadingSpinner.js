
import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

export const Styles = styled.div`
    .root{
        display:flex;
        align-items: center;
        justify-content: center;
    }

`;

const LoadingSpinner = () => {
    return (
        <Styles>
            <div className='root'>
                <ReactLoading type="spin" color="#0ab6ff" />
            </div>
        </Styles>
    )
};

export default LoadingSpinner;