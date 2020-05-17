class Model {
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
                switch (param) {
                    case 'hashTags':
                        for (let i = 0; i < filterConfig.hashTags.length; i++){
                            returningPosts = returningPosts.filter(post => post.hashTags.includes(filterConfig.hashTags[i]));
                        }
                        break;
                    case 'dateFrom':
                        returningPosts = returningPosts.filter(post => post.createdAt >= filterConfig.dateFrom);
                        break;
                    case 'dateTo':
                        returningPosts = returningPosts.filter(post => post.createdAt < filterConfig.dateTo);
                        break;
                    case 'author':
                        returningPosts = returningPosts.filter(post => post.author === filterConfig.author);
                        break;
                }
            }

            returningPosts.sort(Model.comparator);

            return returningPosts.slice(skip, skip + top);
        }
        else {
            let returningPosts = this._posts.slice(skip, skip + top);

            returningPosts.sort(Model.comparator);

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

	    return 0;
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
        if (Model.validate(post)){
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

        if(!Model.validate(post, Object.keys(post))){
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
}
