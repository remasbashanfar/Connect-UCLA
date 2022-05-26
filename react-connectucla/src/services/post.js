// For post HTTP requests to backend api
import ServerAPI from './http-base.js';

class PostAPI {

    getAll() {
        return ServerAPI.get(`posts`);
    }

    getPostById(id) {
        return ServerAPI.get(`posts/${id}`);
    }

    addToCalendar(code, props) {
        return ServerAPI.post('posts/add-to-calendar', { code, props });
    }


}

export default new PostAPI();