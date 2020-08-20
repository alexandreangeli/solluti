<template>
  <v-carousel
    :continuous="false"
    :show-arrows="true"
    hide-delimiters
    style="max-height: 600px; height: 100%"
    @change="(number) => $emit('new-selected-image-index', number)"
    :value="selectedImageIndex"
  >
    <v-carousel-item
      v-for="(image, index) in filteredImages"
      :key="'image-' + index"
    >
      <div class="d-flex justify-center" style="height: 100%">
        <v-img
          aspect-ratio="1"
          :src="image"
          max-height="100%"
          max-width="500px"
        />
      </div>
    </v-carousel-item>

    <div class="v-window__prev">
      <button
        type="button"
        class="v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"
        aria-label="Previous visual"
        @click="
          () => {
            $emit('new-paging-index', pagingIndex - galleryLength);
            $emit('new-selected-image-index', galleryLength - 1);
          }
        "
        v-if="selectedImageIndex == 0 && pagingIndex >= galleryLength"
      >
        <span class="v-btn__content"
          ><i
            aria-hidden="true"
            class="v-icon notranslate mdi mdi-chevron-left theme--dark"
            style="font-size: 36px;"
          ></i
        ></span>
      </button>
    </div>

    <div class="v-window__next">
      <button
        type="button"
        class="v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"
        aria-label="Next visual"
        @click="
          () => {
            $emit('new-paging-index', pagingIndex + galleryLength);
            $emit('new-selected-image-index', 0);
          }
        "
        v-if="
          selectedImageIndex == galleryLength - 1 &&
            pagingIndex < images.length - galleryLength + 1
        "
      >
        <span class="v-btn__content"
          ><i
            aria-hidden="true"
            class="v-icon notranslate mdi mdi-chevron-right theme--dark"
            style="font-size: 36px;"
          ></i
        ></span>
      </button>
    </div>
  </v-carousel>
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
