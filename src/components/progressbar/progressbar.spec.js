import React from 'react';
import * as reactRedux from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Progressbar  from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Progressbar tests', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockReturnValue({
            data: {
                bars: [58, 15],
                buttons: [30, 37, -34, -10],
                limit: 110
            },
            loading: false,
            selectedProgressbar: '1',
            progressbarFillColours: ['#00aec5', '#00aec5'],
            errorMessage: ''
        });
    });

    afterEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });

    it('renders progress bars according to API', () => {
        let wrapper = shallow(<Progressbar />);
        expect(wrapper.find('[data-test="progressbar"]')).toHaveLength(2);
    });
})