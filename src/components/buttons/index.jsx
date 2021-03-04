import React, {useState} from 'react';
import {useSelector, useDispatch } from "react-redux";
import {setSelectedProgressbar, updateProgress} from "../../app/redux/actions/progressbar/progressbarActions";

const Button = () => {
    const progressbarState = useSelector(state => state.progressbar);
    const data = progressbarState.data;
    const buttons =  data.buttons;
    const bars = data.bars;
    const [selectedBar, setSelectedBar] = useState();
    const [displayMessage, setDisplayMessage] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (val) => {
        dispatch(updateProgress(val));
    }

    const selectionChanged = (e) => {
        if (e.target.value !== '')
        {
            setSelectedBar(e.target.value)
            dispatch(setSelectedProgressbar(e.target.value));
        }
        else
            setDisplayMessage(true);
    }

    return (
        <div className="controls-container">
            <div>
                <select
                    className="dropdown"
                    onChange={selectionChanged}
                    value={selectedBar}
                    defaultValue=""
                    data-test="progressbar-dropdown"
                >
                    <option value="">---Select---</option>
                    {
                        bars && bars.map((b, i) => (
                            <option key={`option-${i+1}`} value={i}>Progressbar {i+1}</option>
                        ))
                    }
                </select>
            </div>
            {buttons && buttons.map((b, i) => (
                <a onClick={() => handleClick(b)} key={`button-${i}`} data-test={`button-${i}`}>
                    <div className="button">
                        {b}
                    </div>
                </a>
            ))}
            <br />
            {displayMessage && <p className="message">
                Please select a progress bar
            </p>}
        </div>
    );
}

export default Button;