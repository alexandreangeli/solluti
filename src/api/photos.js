import Vue from "vue";

import api from "./api";

export default {
  async getPhotos() {
    try {
      return (await api.get("/photos")).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível buscar Photos");
      return [];
    }
  },
  async getPhoto(photoID) {
    try {
      return (await api.get("/photos/" + photoID)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível buscar Photo");
      return {};
    }
  },
  async addPhoto(photo) {
    photo.albumId = 1;
    try {
      return (await api.post("/photos", photo)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível adicionar Photo");
      return {};
    }
  },
  async updatePhoto(photo) {
    try {
      return (await api.put("/photos/" + photo.id, photo)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível atualizar Photo");
      return {};
    }
  },
  async deletePhoto(photoID) {
    try {
      return (await api.delete("/photos/" + photoID)).data;
    } catch (e) {
      Vue.$toast.error("Não foi possível remover Photo");
      return {};
    }
  },
};
