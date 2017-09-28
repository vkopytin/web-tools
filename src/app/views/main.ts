import * as _ from 'underscore';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as posts from '../actions/posts';
import { template } from './main.tpl';


function mapStateToProps(state) {
    return {
        url: state.posts.url,
        posts: state.posts.items,
        sites: state.sites.items,
        search: state.posts.search,
        pending: state.posts.pending
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators<any>(posts, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MainView extends React.Component<any, any> {
    props: { posts: any, actions: any }
    state: any

    constructor(props) {
        super(props);
        this.state = _.extend({}, this.state, {
            isFocused: false
        });
    }

    componentWillMount() {
        this.props.actions.loadPosts();
    }

    onFocus (e) {
        this.setState({
            isFocused: true
        });
    }

    onBlur(e) {
        this.setState({
            isFocused: false
        });
    }

    render() {
        const { posts, actions } = this.props;
        return template(this.props, this.props.actions, this); 
    }
}

export { MainView }
