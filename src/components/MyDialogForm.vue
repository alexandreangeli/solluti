<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card v-if="dialog">
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col
                v-for="(header, index) in headers"
                :key="'edit-header-' + index"
                cols="12"
                sm="6"
                md="6"
              >
                <v-textarea
                  v-model="editedItem[header.value]"
                  :label="header.text"
                  :rules="[(v) => !!v || header.text + ' é obrigatório']"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">Cancel</v-btn>
        <v-btn
          color="primary"
          text
          @click="$refs.form.validate() ? $emit('save', editedItem) : null"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    initialValues: {
      type: Object,
    },
  },
  data() {
    return {
      editedItem: {},
    };
  },
  watch: {
    initialValues(newVal) {
      this.editedItem = newVal;
    },
  },
};
</script>

<style></style>
