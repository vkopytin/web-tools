import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';


const Store = function (state, opts) {
    this.state = state;

    _.extend(this, {
        getState: function () {
            return this.state;
        },
        setState: function (value) {
            this.state = value;
        }
    }, opts);
}
_.extend(Store.prototype, BB.Events, {
    dispatch: function (action) {
        let res = $.Deferred();

        //$.when(this.queue).then(() => {
            var reducers = _.map(this.reducers, function (reducer) {
                var rr = reducer;
                return function (res) {
                    var state = res[0];
                    var action = res[1];
                    var newState = rr.call(this, state, action);

                    return [newState === void 0 ? state: newState, action];
                };
            });
            this.setState(_.compose.apply(_, reducers).call(this, [this.getState(), action])[0]);
            res.resolve(this.getState());
            this.trigger('change', this.getState());
        //});
        this.queue = $.when(this.queue, res.promise());
        
        return res.promise();
    },
    defineAction: function (action) {
        _.each(_.keys(action), key => {
            if (_.has(this.actions, key)) {
                throw new Error('Action: ' + key + ' already defined!!!');
            }
        })
        _.extend(this.actions, action);
    },
    defineReducer: function (reducer, type) {
        this.reducers.push(function (state, action) {
            if (action.type === type) {
                return reducer(state, action);
            }
            return state;
        });
    }
});

function Action(func) {
    var type;
    return type = function (...args) {
        var res = func.apply(this, args);
        return _.extend({
            type: type
        }, res);
    }
}

export { Store, Action };