const initialState = {
    sites: {
        '1': {
            id: 1,
            url: 'https://runner-runner-kopytin-secure.rebelmouselabs.com',
            secureUrl: '',
        },
        '2': {
            id: 2,    
            url: 'http://vkopytin.rebelmouse.com',
            secureUrl: 'https://vkopytin-secure.rebelmouse.com'    
        },
        '3': {
            id: 3,    
            url: 'http://doitforthedemo.rebelmouse.com',
            secureUrl: ''    
        },
        '4': {
            id: 4,
            url: 'https://www.gearbrain.com',
            secureUrl: ''    
        },
        '5': {
            id: 5,
            url: 'http://www.viralized.com',
            secureUrl: 'https://viralized-secure.rebelmouse.com'    
        },
        '6': {
            id:6,    
            url: 'https://www.azula.com',
            secureUrl: 'https://azula-secure.rebelmouse.com'
        },
        '7': {
            id: 7,    
            url: 'https://www.axios.com',
            secureUrl: 'https://www.axios.com'
        },
        '8': {
            id: 8,    
            url: 'http://www.7x7.com/',
            secureUrl: 'https://sevenrunner-secure.rebelmouse.com'    
        },
        '9': {
            id: 9,
            url: '//vegansrise.com',
            secureUrl: 'https://vegansrise-secure.rebelmouse.com'
        }
    },
    currentSite: {
        id: 9,
        url: '//vegansrise.com',
        secureUrl: 'https://vegansrise-secure.rebelmouse.com'
    },
    state: {
        pending: false
    },
    posts: {
        url: 'http://vkopytin.rebelmouse.com',
        secureUrl: 'https://vkopytin-secure.rebelmouse.com',
        currentSiteId: 2,
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
