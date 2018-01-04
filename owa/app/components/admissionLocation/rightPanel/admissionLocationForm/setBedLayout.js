import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import UrlHelper from 'utilities/urlHelper';

require('./admissionLocationForm.css');
export default class SetBedLayout extends React.Component{
    constructor(props) {
        super(props);
        this.initData = this.initData.bind(this);
        this.initData();

        this.state = {
            locationUuid: this.admissionLocation.uuid,
            row: 1,
            column: 1,
            disableSubmit: false
        };

        this.urlHelper = new UrlHelper();
        this.onChangeColumnField = this.onChangeColumnField.bind(this);
        this.onChangeRowField = this.onChangeRowField.bind(this);
        this.cancelEventHandler = this.cancelEventHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        this.initData();
    }

    initData() {
        this.admissionLocation = this.props.admissionLocationFunctions.getAdmissionLocationByUuid(this.props.activeUuid);
    }

    onChangeRowField() {
        if (this.rowField.value >= 1) {
            this.setState({
                row: Number(this.rowField.value)
            });
        }
    }

    onChangeColumnField() {
        if (this.columnField.value >= 1 && this.columnField.value <= 8) {
            this.setState({
                column: Number(this.columnField.value)
            });
        }
    }

    cancelEventHandler(event) {
        event.preventDefault();
        this.props.admissionLocationFunctions.setState({
            activePage: 'listing',
            pageData: {},
            activeUuid: this.props.activeUuid
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({
            disableSubmit: true
        });
        const self = this;
        const parameters = {
            bedLayout: {
                row: this.state.row,
                column: this.state.column
            }
        };

        axios({
            method: 'post',
            url: this.urlHelper.apiBaseUrl() + '/admissionLocation/' + this.state.locationUuid,
            params: {
                v: 'layout'
            },
            headers: {'Content-Type': 'application/json'},
            data: parameters,
        }).then(function (response) {
            self.setState({
                disableSubmit: false
            });
            self.props.admissionLocationFunctions.notify('success', 'Admission location bed layout save successfully');
            self.props.admissionLocationFunctions.setState({
                activePage: 'listing',
                activeUuid: self.props.activeUuid
            });
        }).catch(function (error) {
            self.setState({
                disableSubmit: false
            });
            self.props.admissionLocationFunctions.notify('error', error.message);
        });
    }

    render(){
        return <div className="main-container">
            <div className="admission-location-form">
                <div className="block">
                    <div className="block-title">
                        Set Layout
                        <a href="javascript:void(0);" className="back-link" title="back" onClick={this.cancelEventHandler}>
                            &lt;&lt; Back
                        </a>
                    </div>
                    <div className="block-content">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-block">
                                <label className="form-title">Location</label>
                                <span>{this.admissionLocation.name}</span>
                            </div>
                            <div className="form-block">
                                <label className="form-title">Row</label>
                                <input type="number" value={this.state.row} ref={(input) => {this.rowField = input;}}
                                    required={true} onChange={this.onChangeRowField} id="row-field"/>
                            </div>
                            <div className="form-block">
                                <label className="form-title">Column</label>
                                <input type="number" value={this.state.column} ref={(input) => {this.columnField = input;}}
                                    required={true} onChange={this.onChangeColumnField} id="column-field"/>
                            </div>
                            <div className="form-block">
                                <input type="submit" name="submit" value={this.state.disableSubmit ? 'Saving...' : 'Save'}
                                    disabled={this.state.disableSubmit} className="btn btn-primary float-left margin-right"/>
                                <input type="button" onClick={this.cancelEventHandler}
                                    name="submit" value="Cancel" className="btn btn-danger float-left"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}

SetBedLayout.propTypes = {
    activeUuid: PropTypes.string,
    admissionLocationFunctions: PropTypes.object.isRequired
};