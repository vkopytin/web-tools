import * as _ from 'underscore';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators<any>({}, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class LayoutGrid extends React.Component<any, any> {

    render() {
        var props = this.props;
        return <div className="mdc-layout-grid max-width">
            <div className="mdc-layout-grid__inner">
                {props.children}
            </div>
        </div>;
    }
}

export { LayoutGrid }
