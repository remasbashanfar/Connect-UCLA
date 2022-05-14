// For post HTTP requests to backend api
import ServerAPI from './http-base.js';

class PostAPI {

    getAll() {
        return ServerAPI.get(`posts`);
    }

    getPostById(id) {
        console.log(`posts/${id}`);
        return ServerAPI.get(`posts/${id}`);
    }


}

export default new PostAPI();