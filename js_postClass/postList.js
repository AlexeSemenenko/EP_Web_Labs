class PostList {
    _posts = [];

    constructor(posts) {
        this._posts = posts.concat();
    }

    getPage(skip = 0, top = 10, filterConfig = undefined) {
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log('Error with inputting types!');
            return;
        }

        if (filterConfig){
            let returningPosts = this._posts;

            for (let param in filterConfig){
                if (param === 'hashTags'){
                    for (let i = 0; i < filterConfig.hashTags.length; i++){
                        returningPosts = returningPosts.filter(post => post.hashTags.includes(filterConfig.hashTags[i]));
                    }
                }
                else if (param === 'dateFrom'){
                    returningPosts = returningPosts.filter(post => post.createdAt >= filterConfig.dateFrom);
                }
                else if (param === 'dateTo'){
                    returningPosts = returningPosts.filter(post => post.createdAt < filterConfig.dateTo);
                }
                else if (param === 'author'){
                    returningPosts = returningPosts.filter(post => post.author === filterConfig.author);
                }
            }

            returningPosts.sort(PostList.comparator);

            return returningPosts.slice(skip, skip + top);
        }
        else {
            let returningPosts = this._posts.slice(skip, skip + top);

            returningPosts.sort(PostList.comparator);

            return returningPosts;
        }
    }

    static comparator(first, second) {
        if (first.createdAt < second.createdAt){
            return 1;
        }
        else if (first.createdAt > second.createdAt){
            return -1;
        }
        else{
            return 0;
        }
    }

    get(id) {
        if (typeof id === 'string'){
            return this._posts.find(post => post.id === id);
        }
        else {
            console.log('Incorrect type of id. Use \'string\'');
        }
    }

    static validate(post, params = ['id', 'description', 'author', 'createdAt', 'photoLink', 'hashTags', 'likes']) {
        return params.every(function (param) {
            switch (param) {
                case 'id':
                    if (!post.id || typeof post.id !== 'string'){
                        return false;
                    }
                    break;
                case 'description':
                    if (!post.description || typeof post.description !== 'string' || post.description.length > 250){
                        return false;
                    }
                    break;
                case 'author':
                    if (!post.author || typeof post.author !== 'string'){
                        return false;
                    }
                    break;
                case 'createdAt':
                    if (!post.createdAt || Object.prototype.toString.call(post.createdAt) !== '[object Date]'){
                        return false;
                    }
                    break;
                case 'photoLink':
                    if (post.photoLink && typeof post.photoLink !== 'string'){
                        return false;
                    }
                    break;
                case 'hashTags':
                    if (post.hashTags){
                        if (!post.hashTags.every(tag => typeof tag === 'string')){
                            return false;
                        }
                    }
                    break;
                case 'likes':
                    if (post.likes){
                        if (!post.likes.every(like => typeof like === 'string')){
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
            }
            return true;
        });
    }

    add(post){
        if (PostList.validate(post)){
            this._posts.push(post);
            return true;
        }
        return false;
    }

    edit(id, post){
        for (let param in post){
            if (param === 'id' || param === 'author' || param === 'createdAt' || param === 'likes'){
                console.log("You can't change id, author, createdAt and likes");
                return false;
            }
        }

        if(!PostList.validate(post, Object.keys(post))){
            return false;
        }

        let editingPost = this.get(id);

        for (let param in post){
            editingPost[param] = post[param];
        }

        return true;
    }

    remove(id){
        if (typeof id === 'string'){
            let index = this._posts.findIndex(post => post.id === id);

            if (index !== -1){
                this._posts.splice(index, 1);

                return true;
            }
        }
        return false;
    }

    addAll(posts) {
        let invalidPosts = [];

        posts.forEach(post => {
            if (!this.add(post)) invalidPosts.push(post)
        });

        return invalidPosts;
    }

    clear() {
        this._posts = [];
    }
}

//Testing
let tweets = new PostList([
    {
        id: '1',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '2',
        description: 'Хеллоу Ворлд!',
        createdAt: new Date('2020-03-22T20:26:00'),
        author: 'Алексей Семененко',
        photoLink: 'https://vscode.ru/wp-content/uploads/2017/11/hello-world.jpg',
        hashTags: [
            'firstprogramm', 'helloworld'
        ],
        likes: [
            'Иванов Иван', 'Алексей Семененко'
        ]
    },
    {
        id: '3',
        description: 'Я всем известный русский байрон',
        createdAt: new Date('2019-12-21T23:23:23'),
        author: 'Сиша Александрович',
        photoLink: 'https://literaturno.com/wp-content/uploads/2017/06/pushkin-1-797x368.jpg',
        hashTags: [
            'солнце', 'небо', 'перньдевушка', 'helloworld'
        ],
        likes: [
            'Алексей Семененко'
        ]
    },
    {
        id: '4',
        description: 'ПЛ МИД ИЗИ ГЕЙМ',
        createdAt: new Date('2020-03-21T22:30:00'),
        author: 'Арчик Слэер',
        photoLink: 'https://weplay-cdn.azureedge.net/weplay-public/2019-12-17/507a1d393cc008e9e75425da9bbcd82e_large_cover.302823-D28457-7CA56C.jpeg',
        hashTags: [
            'dota2ismylife'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко'
        ]
    },
    {
        id: '5',
        description: 'Секрет Шахмат',
        createdAt: new Date('2020-03-17T11:11:00'),
        author: 'Тема Енис',
        photoLink: 'https://stopga.me/images/articles/2015/07/10/witcher_3_wild_hunt_prohozhdenie-1436504700-s.jpg',
        hashTags: [
            'секретики'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко', 'Тема Енис'
        ]
    },
    {
        id: '6',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '7',
        description: 'Секрет Шахмат',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Тема Енис',
        photoLink: 'https://stopga.me/images/articles/2015/07/10/witcher_3_wild_hunt_prohozhdenie-1436504700-s.jpg',
        hashTags: [
            'люблюсеверноекоролевство', 'helloworld'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко', 'Тема Енис'
        ]
    },
    {
        id: '8',
        description: 'ПЛ МИД ИЗИ ГЕЙМ',
        createdAt: new Date('2020-03-21T22:30:00'),
        author: 'Арчик Слэер',
        photoLink: 'https://weplay-cdn.azureedge.net/weplay-public/2019-12-17/507a1d393cc008e9e75425da9bbcd82e_large_cover.302823-D28457-7CA56C.jpeg',
        hashTags: [
            'dota2ismylife', 'helloworld'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко'
        ]
    },
    {
        id: '9',
        description: 'Я всем известный русский байрон',
        createdAt: new Date('2019-12-21T23:23:23'),
        author: 'Сиша Александрович',
        photoLink: 'https://literaturno.com/wp-content/uploads/2017/06/pushkin-1-797x368.jpg',
        hashTags: [
            'солнце', 'небо', 'перньдевушка'
        ],
        likes: [
            'Алексей Семененко'
        ]
    },
    {
        id: '10',
        description: 'Хеллоу Ворлд!',
        createdAt: new Date('2020-03-22T20:26:00'),
        author: 'Алексей Семененко',
        photoLink: 'https://vscode.ru/wp-content/uploads/2017/11/hello-world.jpg',
        hashTags: [
            'firstprogramm', 'helloworld'
        ],
        likes: [
            'Иванов Иван', 'Алексей Семененко'
        ]
    },
    {
        id: '11',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'helloworld'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '12',
        description: 'Хеллоу Ворлд!',
        createdAt: new Date('2020-03-22T20:26:00'),
        author: 'Алексей Семененко',
        photoLink: 'https://vscode.ru/wp-content/uploads/2017/11/hello-world.jpg',
        hashTags: [
            'firstprogramm', 'helloworld'
        ],
        likes: [
            'Иванов Иван', 'Алексей Семененко'
        ]
    },
    {
        id: '13',
        description: 'Я всем известный русский байрон',
        createdAt: new Date('2019-12-21T23:23:23'),
        author: 'Сиша Александрович',
        photoLink: 'https://literaturno.com/wp-content/uploads/2017/06/pushkin-1-797x368.jpg',
        hashTags: [
            'солнце', 'небо', 'перньдевушка'
        ],
        likes: [
            'Алексей Семененко'
        ]
    },
    {
        id: '14',
        description: 'ПЛ МИД ИЗИ ГЕЙМ',
        createdAt: new Date('2020-03-21T22:30:00'),
        author: 'Арчик Слэер',
        photoLink: 'https://weplay-cdn.azureedge.net/weplay-public/2019-12-17/507a1d393cc008e9e75425da9bbcd82e_large_cover.302823-D28457-7CA56C.jpeg',
        hashTags: [
            'dota2ismylife'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко'
        ]
    },
    {
        id: '15',
        description: 'Секрет Шахмат',
        createdAt: new Date('2020-03-17T11:11:00'),
        author: 'Тема Енис',
        photoLink: 'https://stopga.me/images/articles/2015/07/10/witcher_3_wild_hunt_prohozhdenie-1436504700-s.jpg',
        hashTags: [
            'секретики'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко', 'Тема Енис'
        ]
    },
    {
        id: '16',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '17',
        description: 'Секрет Шахмат',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Тема Енис',
        photoLink: 'https://stopga.me/images/articles/2015/07/10/witcher_3_wild_hunt_prohozhdenie-1436504700-s.jpg',
        hashTags: [
            'люблюсеверноекоролевство'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко', 'Тема Енис'
        ]
    },
    {
        id: '18',
        description: 'ПЛ МИД ИЗИ ГЕЙМ',
        createdAt: new Date('2020-03-21T22:30:00'),
        author: 'Арчик Слэер',
        photoLink: 'https://weplay-cdn.azureedge.net/weplay-public/2019-12-17/507a1d393cc008e9e75425da9bbcd82e_large_cover.302823-D28457-7CA56C.jpeg',
        hashTags: [
            'dota2ismylife'
        ],
        likes: [
            'Арчик Слэер', 'Сиша Александрович', 'Алексей Семененко'
        ]
    },
    {
        id: '19',
        description: 'Я всем известный русский байрон',
        createdAt: new Date('2019-12-21T23:23:23'),
        author: 'Сиша Александрович',
        photoLink: 'https://literaturno.com/wp-content/uploads/2017/06/pushkin-1-797x368.jpg',
        hashTags: [
            'солнце', 'небо', 'перньдевушка'
        ],
        likes: [
            'Алексей Семененко'
        ]
    },
    {
        id: '20',
        description: 'Хеллоу Ворлд!',
        createdAt: new Date('2020-03-22T20:26:00'),
        author: 'Алексей Семененко',
        photoLink: 'https://vscode.ru/wp-content/uploads/2017/11/hello-world.jpg',
        hashTags: [
            'firstprogramm', 'helloworld'
        ],
        likes: [
            'Иванов Иван', 'Алексей Семененко'
        ]
    }
]);

console.log("Top 5 posts:");
console.log(tweets.getPage(0, 5));

console.log("Top 5 posts, skip 2 posts, hashTag: helloworld (auto sort by created date):");
console.log(tweets.getPage(2, 5, {hashTags: ['helloworld']}));

console.log("Top 2 posts, skip 10 posts, author Алексей Семененко:");
console.log(tweets.getPage(10, 2, {author: 'Алексей Семененко'}));

console.log("Get posts with incorrect input:");
console.log(tweets.getPage('10',2, {author: 'Алексей Семененко'}));

console.log("Get post with id 1:");
console.log(tweets.get('1'));

console.log("Get post with id 100 (not exist):");
console.log(tweets.get('100'));

console.log("Get post with wrong input:");
console.log(tweets.get(2));

console.log("Validating post 1:");
console.log(PostList.validate({id: '123', createdAt: new Date(),  description: 'validating', author:'MEMEME', hashTags: ['testing']}));

console.log("Validating post 2 (without id and author):");
console.log(PostList.validate({createdAt: new Date(),  description: 'validating', photoLink: "www.url"}));

console.log("Add new post with correct parameters and get it:");
tweets.add({id: "123", createdAt: new Date(), description: "test description", author: "alex", likes: ['Arthas']});
console.log(tweets.get('123'));

console.log("Edit newly added post:");
tweets.edit('123',{description: "edit", photoLink: "wwwwwwwww"});
console.log(tweets.get('123'));

console.log("Try to edit unchangeable parameters:");
tweets.edit('123',{id: '111', description: "edit", photoLink: "wwwwwwwww"});

console.log("Delete newly edited post and get it:");
tweets.remove('123');
console.log(tweets.get('123'));

console.log("Try to add posts array:");
let invalid = tweets.addAll([
    {
        id: '111',
        description: 'addAll1',
        createdAt: new Date(),
        author: 'JS',
        hashTags: [
            'test', '1'
        ],
        likes: [
            'Алексей Семененко'
        ]
    },
    {
        id: '333',
        description: 'failed',
        hashTags: [
            'test', '3'
        ],
        likes: [
            'JS', 'Алексей Семененко'
        ]
    }
]);
console.log("Invalid posts:");
console.log(invalid);
console.log("Get new added post:");
console.log(tweets.get('111'));

console.log("Clear the page and try to get smth:");
tweets.clear();
console.log(tweets.getPage());