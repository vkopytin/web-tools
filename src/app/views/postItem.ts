import * as _ from 'underscore';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as posts from '../actions/posts';
import { template } from './postItem.tpl';


function mapStateToProps(state) {
    return {
        history: state.posts.history
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators<any>(posts, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class PostItem extends React.Component<any, any> {
    props: { key?: any, post?: any, actions?: any, history?: any }
    state: any

    constructor(props) {
        super(props);
        this.state = _.extend({}, this.state, {
            showBody: false,
            showDescription: false,
            post: this.props.post,
            historyIndex: -1,
            history: this.props.history || {},
            historyRecord: {}
        });
    }

    showBody() {
        this.setState({
            showBody: !this.state.showBody
        })
    }

    showDescription() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    nextHistory() {
        var historyIndex = this.state.historyIndex + 1;
        if (!(this.props.post.id in this.props.history)) {
            this.props.actions.loadPostHistory(this.props.post.id, 0, 100);
        } else {
            historyIndex = Math.min(historyIndex, this.props.history[this.props.post.id].length - 1);
            this.setState({
                historyIndex: historyIndex,
                historyRecord: _.extend({}, this.props.history[this.props.post.id][historyIndex].post, {
                    roar_authors: [this.props.history[this.props.post.id][historyIndex].acted_user]
                })
            });
        }
    }

    nextItemIndex() {
        var history = this.props.history[this.props.post.id] || [];
        return Math.min(this.state.historyIndex + 1, history.length);
    }

    prevHistory() {
        var historyIndex = this.state.historyIndex - 1;
        if (historyIndex < 0) {
            historyIndex = Math.max(historyIndex, -1);
            this.setState({
                historyIndex: historyIndex,
                historyRecord: _.extend({}, this.props.post)
            });
        } else {
            if (!(this.props.post.id in this.props.history)) {
                this.props.actions.loadHistory(this.props.post.id, 0, 100);
            } else {
                historyIndex = Math.max(historyIndex, -1);
                this.setState({
                    historyIndex: historyIndex,
                    historyRecord: _.extend({}, this.props.history[this.props.post.id][historyIndex].post, {
                        roar_authors: [this.props.history[this.props.post.id][historyIndex].acted_user]
                    })
                });
            }
        }
    }

    prevItemIndex() {
        var history = this.props.history[this.props.post.id] || [];
        return Math.max(this.state.historyIndex - 1, -1);
    }

    render() {
        return template(this.props, this.props.actions, this);
    }
}

export { PostItem }
