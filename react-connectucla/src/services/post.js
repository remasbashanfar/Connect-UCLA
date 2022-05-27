// For post HTTP requests to backend api
import ServerAPI from './http-base.js';

class PostAPI {

    getAll() {
        return ServerAPI.get(`posts`);
    }

    getPostById(id) {
        return ServerAPI.get(`posts/${id}`);
    }
    createPost(event) {
        return ServerAPI.post('posts', event);
    }
    addToCalendar(code, props) {
        return ServerAPI.post('posts/add-to-calendar', { code, props });
    }

    deletePost(id) {
        return ServerAPI.delete(`posts/${id}`);
    }


}

export default new PostAPI();