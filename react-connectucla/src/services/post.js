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
    /* Implement later
    addToCalendar(code) {
        return ServerAPI.post('posts/add-to-calendar', { code })
        .then(response => {
            console.log(response.data);
        })
    }*/


}

export default new PostAPI();