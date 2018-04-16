var superagent = require('superagent');
var cookie = require('cookie');
var _ = require('underscore');

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';

const testCookie = '__bon=MHwwfDE3NzEwNDc2OTF8NzQzODQwMDMwMjJ8MXwxfDF8MQ=='

class Login {
    request = null
    response = null
    agent = null

    constructor(req, res) {
        this.request = req;
        this.response = res;

        this.agent = superagent.agent();
    }

    index (params) {
        return {
            test: 'test'
        };
    }

    async login({ username, password, redirect_uri }) {
        return new Promise((resolve, reject) => {
            var loginUrl = 'https://accounts.spotify.com/en/login';
            var apiLoginUrl = 'https://accounts.spotify.com/api/login';
            var browseUrl = 'https://open.spotify.com/browse';
            this.agent.get(loginUrl)
                .set({ 'User-Agent': userAgent })
                .end((err, res) => {
                    var cookiesStr = res.header['set-cookie'];
                    var cookies = {
                        csrf_token: ''
                    };
                    _.each(cookiesStr, cookieStr => {
                        var val = cookie.parse(cookieStr);
                        _.extend(cookies, val);
                    });
                    res.url = apiLoginUrl;
                    this.agent.post(apiLoginUrl)
                        .set('Referer', loginUrl)
                        .set('Cache-Control', 'max-age=0')
                        .set('Connection', 'keep-alive')
                        .set({ 'User-Agent': userAgent })    
                        .type('form')
                        .send({
                            remember: true,
                            username: username,
                            password: password,
                            csrf_token: cookies.csrf_token
                        })
                        //.field('remember', true)
                        //.field('username', username)
                        //.field('password', password)
                        //.field('csrf_token', cookies.csrf_token)
                        .set('Cookie', testCookie + '; csrf_token=' + cookies.csrf_token)
                        .end((err, res) => {
                            if (err) {
                                return resolve({
                                    error: err
                                });
                            }
                            var cookiesStr = res.header['set-cookie'];
                            var cookies = {
                                csrf_token: '',
                                sp_ac: '',
                                sp_dc: ''
                            };
                            _.each(cookiesStr, cookieStr => {
                                var val = cookie.parse(cookieStr);
                                _.extend(cookies, val);
                            });
                            this.agent.get(browseUrl)
                                .set('Connection', 'keep-alive')
                                .set('Upgrade-Insecure-Requests', '1')
                                .set({ 'User-Agent': userAgent })
                                .set('Cookie', testCookie + '; sp_dc=' + cookies.sp_dc + '; sp_ac=' + cookies.sp_ac + '; csrf_token=' + cookies.csrf_token)
                                .end((err, res) => {
                                    var cookiesStr = res.header['set-cookie'];
                                    var cookies = {
                                        wp_sso_token: '',
                                        wp_access_token: '',
                                        wp_expires_in: '',
                                        wp_expiration: ''
                                    };
                                    _.each(cookiesStr, cookieStr => {
                                        var val = cookie.parse(cookieStr);
                                        _.extend(cookies, val);
                                    });
                                    _.each(_.pick(cookies, 'wp_sso_token', 'wp_expires_in', 'wp_expiration'), (value, key) => {
                                        this.response.cookie(key, value, { maxAge: 900000 });
                                    });
                                    _.each(_.pick(cookies, 'wp_access_token'), (value, key) => {
                                        this.response.cookie(key, value, { expires: new Date(+cookies.wp_expiration) });
                                    });
                                    resolve({
                                        redirect_uri: redirect_uri,
                                        login: 'OK',
                                        res: res,
                                        cookies: cookies,
                                        username: username,
                                        password: password
                                    });
                                });    
                        });
                });
        });    
    }
}

export { Login };
