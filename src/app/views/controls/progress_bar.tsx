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
class ProgressBar extends React.Component<any, any> {

    render() {
        var props = this.props;
        return <div role="progressbar" className="mdc-linear-progress mdc-linear-progress--indeterminate">
          <div className="mdc-linear-progress__buffering-dots"></div>
          <div className="mdc-linear-progress__buffer"></div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
        </div>;
    }
}

export { ProgressBar }
