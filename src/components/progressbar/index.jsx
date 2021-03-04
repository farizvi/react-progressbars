import React from 'react';
import { useSelector } from "react-redux";

const Progressbar = () => {
    const progressbarState = useSelector(state => state.progressbar);
    const isLoading = progressbarState.loading; // useSelector(state => state.progressbar.loading);
    const data = progressbarState.data;
    const bars = data.bars;
    const fillColours = progressbarState.progressbarFillColours; // useSelector(state => state.progressbar.progressbarFillColours);

  return <div>
              {!isLoading && bars && bars.map((d, i) => renderProgressbars(d, i, fillColours[i]))}
          </div>;
}

const renderProgressbars = (completed, index, fillColour) => {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        marginBottom: 10,
        boxStyle: 'border-box'
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        maxWidth: '100%',
        backgroundColor: `${fillColour}`,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'center',
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
        margin: '0 auto'
    }

    return (
        <div style={containerStyles} key={index} data-test="progressbar">
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
}

export default Progressbar;