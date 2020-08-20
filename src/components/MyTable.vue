<template>
  <v-data-table
    :headers="headersWithActions"
    :items="items"
    disable-pagination
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="action" dark class="mb-2" @click="editItem">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <MyDialogForm
          :formTitle="formTitle"
          :dialog="dialog"
          :headers="headers"
          :initialValues="editedItem"
          @close="close"
          @save="save"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex justify-space-around">
        <v-icon small class="mr-2" @click="editItem(item)" color="positive">
          mdi-pencil
        </v-icon>

        <v-icon small @click="deleteItem(item)" color="negative">
          mdi-delete
        </v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import MyDialogForm from "./MyDialogForm";

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

  components: {
    MyDialogForm,
  },

  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {},
  }),

  computed: {
    formTitle() {
      return (
        (this.editedIndex === -1 ? "Adicionar" : "Editar") +
        " " +
        this.objectName
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
      if (confirm("Tem certeza que deseja remover esse item?")) {
        this.$emit("delete", item, index);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },

    save(editedItem) {
      this.close();
      this.$emit("save", editedItem, this.editedIndex);
    },
  },
};
</script>

<style>
.v-data-table__mobile-row {
  height: auto !important;
}
</style>
