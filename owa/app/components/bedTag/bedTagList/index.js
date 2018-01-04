import React from 'react';
import PropTypes from 'prop-types';

import ListRow from 'components/bedTag/bedTagList/listRow';

require('./bedTagList.css');
export default class BedTagList extends React.Component {
    constructor(props){
        super(props);

        this.addNewHandler = this.addNewHandler.bind(this);
    }

    addNewHandler(event){
        event.preventDefault();
        this.props.bedTagFunctions.setState({
            activePage: 'addEdit',
            pageData: {
                operation: 'add',
                bedTagId: null
            }
        });
    }

    render() {
        return <div className="bed-Tag-listing">
            <div className="block-title">
                Existing Bed Tags
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="description">Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bedTags.map((bedTag, key) => <ListRow key={key} bedTag={bedTag}
                        bedTagFunctions={this.props.bedTagFunctions}/>)}
                </tbody>
            </table>
            <button onClick={this.addNewHandler} value="Add New" className="btn btn-primary"> Add New </button>
        </div>;
    }

}

BedTagList.propTags = {
    bedTags: PropTypes.array.isRequired,
    bedTagFunctions: PropTypes.object.isRequired
};