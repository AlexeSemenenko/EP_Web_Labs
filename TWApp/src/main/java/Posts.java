import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Posts {
    private List<Post> posts;

    public Posts() {
        posts = new ArrayList<>();

        List<String> hashTags = new ArrayList<>();
        hashTags.add("helloworld");
        hashTags.add("123");

        List<String> likes = new ArrayList<>();
        likes.add("Like1");
        likes.add("Like2");

        this.add(new Post("1", "First test 1", new Date(), "Alexei Semenenko", "www.photo",
                hashTags, likes));

        this.add(new Post("2", "Second test 2", new Date(), "Cucumber", "www.photo.link",
                hashTags, likes));
    }

    public static boolean validate(Post post) {
        return post.getId() != null && post.getId().length() >= 1 &&
                post.getDescription() != null && post.getDescription().length() < 250 &&
                post.getCreatedAt() != null &&
                post.getAuthor() != null && post.getAuthor().length() >= 1;
    }

    public Post get(String id) {
        for(Post post: posts) {
            if(post.getId().equals(id)) {
                return post;
            }
        }

        return null;
    }

    public boolean add(Post post) {
        if(validate(post)) {
            posts.add(post);

            return true;
        }

        return false;
    }

    public boolean remove(String id) {
        for(Post post: posts) {
            if(post.getId().equals(id)) {
                posts.remove(post);

                return true;
            }
        }

        return false;
    }

    public boolean edit(String id, Post post) {
        if(post == null || post.getId() != null || post.getAuthor() != null || post.getCreatedAt() != null ||
                post.getLikes() != null) {
            return false;
        }

        Post editingPost = this.get(id);

        if(post.getDescription() != null) {
            editingPost.setDescription(post.getDescription());
        }

        if(post.getPhotoLink() != null) {
            editingPost.setPhotoLink(post.getPhotoLink());
        }

        if(post.getHashTags() != null) {
            editingPost.setHashTags(post.getHashTags());
        }

        return true;
    }

    public List<Post> getAll() {
        return posts;
    }

    public void clear() {
        posts.clear();
    }
}
