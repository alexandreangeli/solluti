import Vue from "vue";

import api from "./api";

export default {
  async getPosts() {
    try {
      return (await api.get("/posts")).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível buscar Posts");
      return [];
    }
  },
  async getPost(postID) {
    try {
      return (await api.get("/posts/" + postID)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível buscar Post");
      return {};
    }
  },
  async addPost(post) {
    try {
      return (await api.post("/posts", post)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível adicionar Post");
      return {};
    }
  },
  async updatePost(post) {
    try {
      return (await api.put("/posts/" + post.id, post)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível atualizar Post");
      return {};
    }
  },
  async deletePost(postID) {
    try {
      return (await api.delete("/posts/" + postID)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível remover Post");
      return {};
    }
  },
};
