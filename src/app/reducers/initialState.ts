const initialState = {
    sites: {
        items: [{
            url: 'https://runner-runner-kopytin-secure.rebelmouselabs.com'
        }, {
            url: 'https://vkopytin-secure.rebelmouse.com'
        }, {
            url: 'http://doitforthedemo.rebelmouse.com'    
        }]
    },
    posts: {
        url: 'http://doitforthedemo.rebelmouse.com',
        search: '',
        items: [{
            id: 1,
            headline: 'test',
            brief: 'test'
        }],
        pending: false
    }
};

export { initialState };
