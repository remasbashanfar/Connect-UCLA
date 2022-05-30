// For post HTTP requests to backend api
import ServerAPI from './http-base.js';

class UserAPI {
    getAll() {
        return ServerAPI.get(`users`);
    }

    getUser(username) {
        return ServerAPI.get(`users/${username}`);
    }

    registerUser(user) {
        return ServerAPI.post(`users/register`, user)
    }

    updateUserById(userId, update) {
        return ServerAPI.patch(`users/${userId}`, update)
    }

}

export default new UserAPI();