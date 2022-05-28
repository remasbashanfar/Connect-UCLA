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
        console.log("serverAPI front end");
        console.log(event);
        return ServerAPI.post('posts', event);
    }
    addToCalendar(code, props) {
        return ServerAPI.post('posts/add-to-calendar', { code, props });
    }

    deletePost(id) {
        return ServerAPI.delete(`posts/${id}`);
    }

    getPostByTags(tags){
        let queryString = "";

        for(let i = 0; i < tags.length; i++)
        {
            if(i === tags.length -1)
                queryString += 'tags=' + tags[i]
            else
                queryString+= 'tags=' + tags[i] + '&'
        }
        console.log(queryString)
        return ServerAPI.get(`posts/filter/tags?` + queryString)
    }
}

export default new PostAPI();