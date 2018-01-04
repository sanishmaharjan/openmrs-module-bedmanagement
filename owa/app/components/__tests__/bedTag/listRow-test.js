import React from 'react';
import {shallow, mount} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import ListRow from 'components/bedTag/bedTagList/listRow';
import bedTagFunctionsMock from 'components/__mocks__/bedTagFunction-mock';

const testProps = {
    bedTagFunctions: bedTagFunctionsMock
};

describe('BedTagListRow', () => {
    it('Should render bed tag list properly', () =>{
        const bedTagListRow = mount(<table><tbody><ListRow bedTag={testProps.bedTagFunctions.getBedTagByUuid('ff7ed494-7b9c-4478-812a-5187e297f94c')}
            bedTagFunctions={testProps.bedTagFunctions}/></tbody></table>);

        expect(bedTagListRow.find('td').at(0).text().trim()).toBe('Isolation');
        expect(shallowToJson(bedTagListRow)).toMatchSnapshot();
    });

    it('Should trigger event handler', () => {
        const spyOnDeleteHandler = jest.spyOn(ListRow.prototype, 'deleteHandler');
        const spyOnEditHandler = jest.spyOn(ListRow.prototype, 'editHandler');
        const spyOnSetState = jest.spyOn(testProps.bedTagFunctions, 'setState');
        const bedTagList = mount(<table><tbody><ListRow bedTag={testProps.bedTagFunctions.getBedTagByUuid('ff7ed494-7b9c-4478-812a-5187e297f94c')}
            bedTagFunctions={testProps.bedTagFunctions}/></tbody></table>);

        bedTagList.find('.fa-edit').simulate('click');
        expect(spyOnEditHandler).toHaveBeenCalled();
        expect(spyOnSetState).toHaveBeenCalledWith({
            activePage: 'addEdit',
            pageData: {
                operation: 'edit',
                bedTagUuid: 'ff7ed494-7b9c-4478-812a-5187e297f94c'
            }
        });

        bedTagList.find('.fa-trash').simulate('click');
        expect(spyOnDeleteHandler).toHaveBeenCalled();
    });
});