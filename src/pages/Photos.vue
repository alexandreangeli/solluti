<template>
  <div v-if="photos">
    <div
      v-if="!photos.length"
      class="d-flex justify-center"
      style="height: 100%; align-items: center;"
    >
      <v-btn color="action" dark class="mb-2" @click="addItem">
        <v-icon>
          mdi-plus
        </v-icon>
        Adicione sua primeira foto
      </v-btn>
    </div>
    <div v-show="photos.length">
      <MyConfirmationDialog ref="confirm" />

      <div class="d-flex flex-wrap justify-center">
        <MyImgCarrousel
          :galleryLength="galleryLength"
          :images="photosUrls"
          :selectedImageIndex="selectedPhotoIndex"
          :pagingIndex="pagingIndex"
          @new-selected-image-index="
            (newSelectedPhotoIndex) =>
              (selectedPhotoIndex = newSelectedPhotoIndex)
          "
          @new-paging-index="(newPagingIndex) => (pagingIndex = newPagingIndex)"
        />
      </div>

      <div class="d-flex justify-center" style="margin-bottom: 10px">
        <div
          class="d-flex justify-space-between"
          style="width: 90%; position: relative"
        >
          <div style="position: absolute; bottom: 0px;" color="primary">
            {{ pagingIndex + selectedPhotoIndex + 1 }}/{{ photos.length }}
          </div>

          <div
            style="-webkit-text-stroke: 0.5px black; font-size: 25px; text-align: center; position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%)"
            color="primary"
          >
            {{ selectedPhoto ? selectedPhoto.title : null }}
          </div>

          <v-speed-dial
            v-model="fab"
            direction="top"
            :open-on-hover="false"
            transition="slide-y-reverse-transition"
            style="position: absolute; bottom: 5px; right: 5px"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="primary darken-2" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="green" @click="editItem">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="addItem">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="deleteItem">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </div>
      </div>

      <div class="d-flex flex-wrap justify-center">
        <MyImgGallery
          :galleryLength="galleryLength"
          :images="photosThumbnails"
          :selectedImageIndex="selectedPhotoIndex"
          :pagingIndex="pagingIndex"
          @new-selected-image-index="
            (newSelectedPhotoIndex) =>
              (selectedPhotoIndex = newSelectedPhotoIndex)
          "
          @new-paging-index="(newPagingIndex) => (pagingIndex = newPagingIndex)"
        />
      </div>

      <MyDialogForm
        :formTitle="formTitle"
        :dialog="dialog"
        :headers="headers"
        :initialValues="editedItem"
        @close="close"
        @save="save"
      />
    </div>
  </div>
</template>

<script>
import MyImgCarrousel from "../components/MyImgCarrousel";
import MyImgGallery from "../components/MyImgGallery";
import MyDialogForm from "../components/MyDialogForm";
import MyConfirmationDialog from "../components/MyConfirmationDialog";
import photosAPI from "../api/photos";

export default {
  name: "Photos",

  components: {
    MyImgCarrousel,
    MyImgGallery,
    MyDialogForm,
    MyConfirmationDialog,
  },

  data() {
    return {
      photos: null,
      selectedPhotoIndex: 0,
      pagingIndex: 0,
      galleryLength: 10,
      fab: false,
      formTitle: "",
      headers: [
        { text: "Título", value: "title" },
        { text: "URL Imagem", value: "url" },
        { text: "URL Thumbnail", value: "thumbnailUrl" },
      ],
      dialog: false,
      editedItem: {},
    };
  },

  computed: {
    photosUrls() {
      return this.photos.map((p) => p.url);
    },
    photosThumbnails() {
      return this.photos.map((p) => p.thumbnailUrl);
    },
    selectedPhoto() {
      return this.photos[this.selectedPhotoIndex + this.pagingIndex];
    },
  },

  async mounted() {
    this.photos = await photosAPI.getPhotos();
  },

  methods: {
    async savePhoto(photo, index) {
      if (photo.id) {
        const updatedPhoto = await photosAPI.updatePhoto(photo);
        this.photos.splice(index, 1, updatedPhoto);
      } else {
        const newPhoto = await photosAPI.addPhoto(photo);
        this.photos.push(newPhoto);
      }
    },

    async deleteItem() {
      if (
        await this.$refs.confirm.open(
          "Remover",
          "Tem certeza que deseja remover esse item?",
          { color: "red" }
        )
      ) {
        await photosAPI.deletePhoto(this.selectedPhoto.id);
        this.photos.splice(this.pagingIndex + this.selectedPhotoIndex, 1);
      }
    },

    async editItem() {
      this.dialog = true;
      this.formTitle = "Editar foto";
      this.editedItem = JSON.parse(JSON.stringify(this.selectedPhoto));
    },

    async addItem() {
      this.dialog = true;
      this.formTitle = "Adicionar foto";
      this.editedItem = {};
    },

    async save(editedItem) {
      this.close();
      if (editedItem.id) {
        const updatedPhoto = await photosAPI.updatePhoto(editedItem);
        this.photos.splice(
          this.pagingIndex + this.selectedPhotoIndex,
          1,
          updatedPhoto
        );
      } else {
        const newPhoto = await photosAPI.addPhoto(editedItem);
        this.photos.push(newPhoto);
      }
    },

    async close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
      });
    },
  },
};
</script>

<style scoped></style>
