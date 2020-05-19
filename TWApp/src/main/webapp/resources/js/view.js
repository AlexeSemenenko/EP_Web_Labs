let tweets = new Model([
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
    }
]);

class View {
    _posts;
    _postTemplate;
    _user;
    _isLogIn;

    constructor(user, isLogIn) {
        this._posts = document.querySelector('.posts');
        this._postTemplate = document.querySelector('.post-template');
        this._user = user;
        this._isLogIn = isLogIn;
    }

    _showSinglePost(post) {
        let template = document.importNode(this._postTemplate.content, true);
        View._view(post, template);
        this._posts.appendChild(template);
    }

    static _view(post, template) {
        template.firstElementChild.id = post.id;
        template.querySelector('.post-text').textContent = post.description;
        template.querySelector('.post-info').textContent = post.author + ' ' + post.createdAt.toLocaleString();
        template.querySelector('.post-image').setAttribute('src', post.photoLink);
        template.querySelector('.post-tags').textContent = '#' + post.hashTags.join(' #');
        template.querySelector('.like-counter').textContent = post.likes.length;
    }

    _showExitButton() {
        if(!this._isLogIn) {
            document.querySelector(".log-out").style.visibility = "hidden";
        }
    }

    _showUsername() {
        document.querySelector(".username").textContent = this._user;
        
    }

    _showDeleteButtons() {
        if(!this._isLogIn) {
            let deleteButtons = document.querySelectorAll(".delete-img");

            deleteButtons.forEach(button => {
                button.style.visibility = "hidden";
            });
        }
    }

    _showEditButtons() {
        if(!this._isLogIn) {
            let editButtons = document.querySelectorAll(".edit-img");

            editButtons.forEach(button => {
                button.style.visibility = "hidden";
            });
        }
    }

    _addButton() {
        if(!this._isLogIn) {
            document.querySelector(".add-new-post").style.visibility = "hidden";
        }
    }

    refreshPage() {
        let tmp = this._posts.firstElementChild;

        while(tmp !== this._posts.lastElementChild) {
            tmp.remove();
            tmp = this._posts.firstElementChild;
        }

        tweets.getPage().forEach(post => this._showSinglePost(post));

        this._showExitButton();
        this._showUsername();
        this._showDeleteButtons();
        this._showEditButtons();
        this._addButton();
    }

    addPost(post) {
        if(tweets.add(post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    editPost(id, post) {
        if (tweets.edit(id, post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    removePost(id) {
        if (tweets.remove(id)) {
            this.refreshPage();

            return true;
        }

        return false;
    }
}

let view;

window.onload = () => {
    let userName = 'Alexei Semenenko';

    view = userName.length == 0 ? new View('Guest', false) : new View(userName, true);
    
    view.refreshPage();
};
