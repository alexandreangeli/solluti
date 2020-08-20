<template>
  <div
    style="height: 100%; width: 100%"
    class="d-flex flex-wrap justify-center"
  >
    <v-card
      v-for="(image, index) in filteredImages"
      :key="'thumbnail-' + index"
      @click="() => $emit('new-selected-image-index', index)"
      :hover="true"
      class="mx-1 mb-2"
      :style="
        `
            box-sizing: border-box;
            max-width: 250px; 
            width: 100%;
            border-radius: 0px;
            ${
              index == selectedImageIndex
                ? `
                border: 3px solid;
              `
                : ''
            }
          `
      "
    >
      <v-img aspect-ratio="1" class="grey lighten-2" :src="image">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    galleryLength: {
      type: Number,
      required: true,
    },
    selectedImageIndex: {
      type: Number,
      required: true,
    },
    pagingIndex: {
      type: Number,
      required: true,
    },
  },

  computed: {
    filteredImages() {
      return this.images.slice(
        this.pagingIndex,
        this.pagingIndex + this.galleryLength
      );
    },
  },
};
</script>
