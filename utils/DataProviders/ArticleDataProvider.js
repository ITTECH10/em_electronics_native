class ArticleDataProvider {
    constructor() {
        this.articles = [
            {
                id: 0,
                name: 'Article X',
                imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                number: 100,
                password: 'deao023lda02x',
            },
            {
                id: 1,
                name: 'Article Y',
                imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                number: 200,
                password: '329jdkdk10s',
            },
            {
                id: 2,
                name: 'Article Z',
                imageUrl: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                number: 300,
                password: 'dadooe0123m',
            },
            {
                id: 3,
                name: 'Article Q',
                imageUrl: 'https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                number: 400,
                password: 'oroe293kksm23',
            },
            {
                id: 4,
                name: 'Article N',
                imageUrl: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                number: 500,
                password: 'p0320aodpas',
            },
        ]
    }

    getArticles() {
        return this.articles
    }
}

export default ArticleDataProvider