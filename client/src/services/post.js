import http from "../http-common";

class PostDataService {
  getAll(page = 0) {
    return http.get(`posts?page=${page}`);
  }

  get(id) {
    return http.get(`/post?id=${id}`);
  }

  createPost(data) {
    return http.post("/post-new", data);
  }

  updatePost(data) {
    return http.put("/post-edit", data);
  }

  deletePost(id, userId) {
    return http.delete(`/post-delete?id=${id}`, {data:{user_id: userId}});
  }
}

export default new PostDataService();