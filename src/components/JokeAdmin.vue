<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{on}">
        <v-btn color="primary" class="mb-3" v-on="on">Ny joke</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row v-on:keyup.enter="save">
              <v-col cols="12">
                <v-text-field label="Joke Titel" v-model="editedItem.overskrift" :autofocus="true"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Joke Tekst" v-model="editedItem.joketekst"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer>
            <v-btn color="blue darken-1" text @click="close">Luk</v-btn>
            <v-btn color="blue darken-1" text @click="save">Gem</v-btn>
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field v-model.number="itemPerPage" label="Jokes per side" />
    <div class="mb-2 d-flex justify-space-between">
      <v-btn :disabled="currentPage <= 0" @click="previous">Forrige</v-btn>
      <v-btn :disabled="itemPerPage*currentPage+itemPerPage >= length" @click="next">Næste</v-btn>
    </div>
    <p>{{itemPerPage*currentPage+1}}-{{itemPerPage+currentPage*itemPerPage}} af {{length}}</p>
    <v-data-table hide-default-footer disable-pagination :headers="headers" :items="jokes">
      <template #item.ret="{item}">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
      <template #item.slet="{item}">
        <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        overskrift: "",
        joketekst: ""
      },
      defaultItem: {
        overskrift: "",
        joketekst: ""
      },
      headers: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "Overskrift",
          value: "overskrift"
        },
        {
          text: "Joketekst",
          value: "joketekst"
        },
        {
          text: "Dato",
          value: "date"
        },
        {
          text: "Ret",
          value: "ret"
        },
        {
          text: "Slet",
          value: "slet"
        }
      ],
      jokes: [],
      currentPage: 0,
      itemPerPage: 5,
      length: 0
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    next() {
      this.currentPage++;
      this.fetchData();
    },
    previous() {
      this.currentPage--;
      this.fetchData();
    },
    fetchData() {
      Axios.get("http://localhost:3000/jokes/limit", {
        params: {
          limit: this.itemPerPage,
          page: this.currentPage
        }
      })
        .then(response => response.data)
        .then(data => {
          this.length = data.length;
          this.jokes = data.jokes.map(joke => ({
            id: joke._id,
            overskrift: joke.overskrift,
            joketekst: joke.jokeTekst,
            date: joke.dato
          }));
        });
    },
    editItem(item) {
      this.dialog = true;
      this.editedIndex = this.jokes.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      if (window.confirm("Er du sikker på at du ville slette denne joke?")) {
        Axios.delete(`http://localhost:3000/jokes/${item.id}`).then(
          this.fetchData
        );
      }
    },
    close() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        Axios.patch(
          `http://localhost:3000/jokes/${this.jokes[this.editedIndex].id}`,
          {
            overskrift: this.editedItem.overskrift,
            jokeTekst: this.editedItem.joketekst
          }
        ).then(() => {
          this.fetchData();
          this.editedItem = Object.assign({}, this.defaultItem);
          this.close();
        });
      } else {
        Axios.post("http://localhost:3000/jokes/", {
          overskrift: this.editedItem.overskrift,
          jokeTekst: this.editedItem.joketekst
        }).then(() => {
          this.fetchData();
          this.editedItem = Object.assign({}, this.defaultItem);
          this.close();
        });
      }
    }
  },
  watch: {
    itemPerPage() {
      if (this.itemPerPage) {
        this.fetchData();
      }
    }
  }
};
</script>

<style>
</style>