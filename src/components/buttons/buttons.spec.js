import React  from 'react';
import * as reactRedux from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buttons  from './index';
import { SET_SELECTED_PROGRESSBAR } from "../../app/redux/constants/progressbar/progressbarConstants";
import { useDispatch } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

describe('Button tests', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const setState = jest.fn();
    const mockSetSelectedProgressbar = jest.spyOn(reactRedux, 'useDispatch');
    const mockUpdateProgress = jest.spyOn(reactRedux, 'useDispatch');
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockImplementation((init) => [init, setState]);

        useSelectorMock.mockReturnValue({
            data: {
                bars: [58, 15],
                buttons: [30, 37, -34, -10],
                limit: 110
            },
            loading: false,
            selectedProgressbar: '',
            progressbarFillColours: ['#00aec5', '#00aec5'],
            errorMessage: ''
        });

        mockSetSelectedProgressbar.mockReturnValue({
            type: SET_SELECTED_PROGRESSBAR,
            payload: "1"
        });

        jest.mock('react-redux', () => ({
            useDispatch: () => mockDispatch,
            useSelector: () => jest.fn()
        }));

        const mockedDispatch = jest.fn();
        mockedDispatch.mockReturnValue({
            type: SET_SELECTED_PROGRESSBAR,
            payload: "1"
        });
        useDispatch.mockReturnValue(mockedDispatch);
    });

    afterEach(() => {
        useSelectorMock.mockClear()
        mockSetSelectedProgressbar.mockClear()
        mockUpdateProgress.mockClear();
    });

    it('renders buttons according to API', () => {
        let wrapper = shallow(<Buttons />);
        expect(wrapper.find('[data-test^="button"]')).toHaveLength(4);
    });

    it('sets the selected progress bar when user selects from dropdown', () => {
        let wrapper = shallow(<Buttons />);

        const actionArgs = {
            target: {
                value: "1"
            }
        };

        // selecting first progress bar
        wrapper.find('[data-test="progressbar-dropdown"]')
            .at(0).simulate('change', actionArgs);

        expect(mockSetSelectedProgressbar).toHaveBeenCalled();
    })

    it('updates progress when button is clicked multiple times', () => {
        let wrapper = shallow(<Buttons />);

        const actionArgs = {
            target: {
                value: "1"
            }
        };

        // selecting first progress bar
        wrapper.find('[data-test="progressbar-dropdown"]')
            .at(0).simulate('change', actionArgs);

        expect(mockSetSelectedProgressbar).toHaveBeenCalled();

        // finding button with value 37
        const button = wrapper.find('[data-test="button-1"]');

        // clicking the button with value 37 twice so the completion of first progress bar exceeds limit
        button.simulate('click');
        button.simulate('click');

        // expect the selected progress bar colour to change
        expect(mockUpdateProgress).toHaveBeenCalled();
    })
})