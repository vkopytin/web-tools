const initialState = {
    sites: {
        items: [{
            url: 'https://runner-runner-kopytin-secure.rebelmouselabs.com',
            secureUrl: '',
        }, {
            url: 'http://vkopytin.rebelmouse.com',
            secureUrl: 'https://vkopytin-secure.rebelmouse.com'    
        }, {
            url: 'http://doitforthedemo.rebelmouse.com',
            secureUrl: ''    
        }, {
            url: 'https://www.gearbrain.com',
            secureUrl: ''    
        }, {
            url: 'http://www.viralized.com',
            secureUrl: 'https://viralized-secure.rebelmouse.com'    
        }, {
            url: 'https://www.azula.com',
            secureUrl: 'https://azula-secure.rebelmouse.com'
        }, {
            url: 'https://www.axios.com',
            secureUrl: 'https://www.axios.com'
        }]
    },
    posts: {
        url: 'http://vkopytin.rebelmouse.com',
        secureUrl: 'https://vkopytin-secure.rebelmouse.com',
        search: '',
        items: [{
            id: 1,
            headline: 'test',
            brief: 'test',
        }],
        history: {},
        pending: false
    }
};

export { initialState };
