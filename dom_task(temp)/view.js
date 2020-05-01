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
    _postsHTML = document.querySelector(".posts");

    _isLogIn;
    _postList;

    constructor(isLogIn, tweets) {
        this._isLogIn = isLogIn;
        this._postList = tweets;
    }

    _showExitButton() {
        if(!this._isLogIn) {
            document.querySelector(".log-out").style.visibility = "hidden";
        }
    }

    _showUsername() {
        if(!this._isLogIn) {
            document.querySelector(".username").style.visibility = "hidden";
        }
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

    getPost(currentPost) {
        let post = document.createElement("div");

        post.className = "test-post";


        let postHeader = document.createElement("div");
        let userImg = document.createElement("img");
        let deleteImg = document.createElement("img");
        let editImg = document.createElement("img");

        postHeader.className = "post-header";
        postHeader.innerHTML = "<h3>" + currentPost.author + ", " + currentPost.createdAt.toLocaleString() + "</h3>";

        userImg.className = "user-ava";
        userImg.setAttribute("src", "resources\\pictures\\user.png");

        postHeader.append(userImg);

        postHeader.innerHTML += "<i>" + currentPost.hashTags.map(hashTag => {
            return "#" + hashTag;
        }); + "</i>";

        deleteImg.className = "delete-img";
        deleteImg.setAttribute("src", "resources\\pictures\\delete.png");

        postHeader.append(deleteImg);

        editImg.className = "edit-img";
        editImg.setAttribute("src", "resources\\pictures\\pen.png");

        postHeader.append(editImg);

        post.append(postHeader);


        let postDescription = document.createElement("div");

        postDescription.className = "post-description";
        postDescription.innerHTML = "<p>" + currentPost.description + "</p>";

        if(currentPost.hasOwnProperty("photoLink")) {
            let img = document.createElement("img");

            img.className = "post-image";
            img.setAttribute("src", currentPost.photoLink);

            postDescription.append(img);
        }

        post.append(postDescription);


        let postFooter = document.createElement("div");
        let displayLikes = document.createElement("span");
        let likeCounter = document.createElement("span");

        postFooter.className = "post-footer";

        displayLikes.className = "likes-display";
        displayLikes.innerHTML = "<img class='like-img' src='resources\\pictures\\like.png'>";

        likeCounter.className = "like-counter";
        likeCounter.textContent = currentPost.likes.length;

        displayLikes.append(likeCounter);

        postFooter.append(displayLikes);

        post.append(postFooter);


        return post;
    }

    refreshPage() {
        this._postsHTML.innerHTML = "";

        this._postList.getPage().forEach(post => {
            this._postsHTML.append(this.getPost(post));
        });

        this._showExitButton();
        this._showUsername();
        this._addButton();
        this._showDeleteButtons();
        this._showEditButtons();
    }

    addPost(post) {
        if (this._postList.add(post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    editPost(id, post) {
        if (this._postList.edit(id, post)) {
            this.refreshPage();

            return true;
        }

        return false;
    }

    removePost(id) {
        if (this._postList.remove(id)) {
            this.refreshPage();

            return true;
        }

        return false;
    }
}

let view;

window.onload = () => {
    view = new View(true, tweets);

    view.refreshPage();
};