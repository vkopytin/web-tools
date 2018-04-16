import * as _ from 'underscore';
import * as path from 'path'; // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as express from 'express';
import * as controllers from './controllers';
import * as process from 'process';


export class Routes {

    protected basePath: string;

    //protected api: database.API;

    constructor(NODE_ENV: string) {

        switch (NODE_ENV) {
            case 'production':
                this.basePath = '/build/dist';
                break;
            case 'development':
                this.basePath = '/build/static';
                break;
        }

    }

    defaultRoute(req: express.Request, res: express.Response) {
        res.sendFile('index.html', { root: path.join(process.cwd(), this.basePath) });
    }

    routes = [
        { path: '/:controller/:action/:branch', defaults: { controller: 'Home', action: 'index', branch: 'alpha_channel' } },
        { path: '/:controller/:action', defaults: { controller: 'Home', action: 'index', branch: 'alpha_channel' } }
    ]

    findController<T>(controllers, name): new (...args) => T {
        return _.find(controllers, (v, k: string) => k.toLowerCase() === name.toLowerCase());
    }

    createController(req: express.Request, res: express.Response, name: string) {
        var ControllerCtor = this.findController(controllers, name);

        if (!ControllerCtor) {
            return false;
        }
        return new ControllerCtor(req, res);
    }

    paths(app: express.Application) {

        this.routes.forEach(routeMap => {
            const { path, defaults } = routeMap;
            app.get(path, (req: express.Request, res: express.Response, next: express.NextFunction) => {
                let { controller, action } = _.extend({}, defaults, _.pick(req.params, 'controller', 'action'));
                const params = _.defaults(req.params, defaults);
                controller = this.createController(req, res, controller);
                if (controller) {
                    var result = controller[action].call(controller, _.extend({}, params, req.query));
                    (async function (asyncResult) {
                        var result = await asyncResult;
                        if ('redirect_uri' in result) {
                            res.redirect(result.redirect_uri);
                        } else {
                            res.send(result);
                        }
                    })(result);
                } else {
                    next();
                }
            });
        });

        //app.get('/', (req: express.Request, res: express.Response) => {
        //  this.defaultRoute(req, res);
        //});

        //app.get('*', (req: express.Request, res: express.Response) => {
        //  this.defaultRoute(req, res);
        //});

    }

}