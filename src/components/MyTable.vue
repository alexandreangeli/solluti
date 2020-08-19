<template>
  <v-data-table
    :headers="headersWithActions"
    :items="items"
    disable-pagination
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
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
                      md="4"
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    objectName: {
      type: String,
      default: "Item",
    },
  },

  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return (
        (this.editedIndex === -1 ? "Novo" : "Editar") + " " + this.objectName
      );
    },

    headersWithActions() {
      return [
        ...this.headers,
        { text: "Ações", value: "actions", width: 80, sortable: false },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (confirm("Are you sure you want to delete this item?")) {
        this.$emit("delete", item, index);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.close();
      this.$emit("save", this.editedItem, this.editedIndex);
    },
  },
};
</script>
