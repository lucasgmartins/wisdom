<template>
  <v-container >
    <v-layout
      text-xs-center
      wrap
    >

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Wisdom
        </h1>
        <p class="subheading font-weight-regular">
          Before create a question verify if a similiar question is not already created
          <!-- <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a> -->
        </p>

        <v-text-field
          v-model="text"
          label="Search"
        ></v-text-field>

      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 v-if="questions && questions.length" class="headline font-weight-bold mb-3">Possible questions...</h2>

        <v-layout>

          <!-- <div v-if="$apollo.queries.ping.loading">Loading...</div> -->

          <v-list three-line class="pt-0" v-if="questions">
            <template v-for="(question, index) in questions">
              <v-list-tile
                :key="question.title"
                avatar
                ripple
                @click="toggle(index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ question.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ question.title }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ question.title }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ question.action }}</v-list-tile-action-text>
                  <v-icon
                    v-if="selected.indexOf(index) < 0"
                    color="grey lighten-1"
                  >
                    star_border
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow darken-2"
                  >
                    star
                  </v-icon>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider
                v-if="index + 1 < questions.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-layout>
      </v-flex>

      <v-dialog v-model="dialog" persistent max-width="600px">
        {{ question }}
        <v-card>
          <v-card-title>
            <span class="headline">Question</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field label="Title" v-model="question.title" required></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="Text"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    hint="Hint text"
                    v-model="question.text"
                  ></v-textarea>
                </v-flex>

              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="create()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-text style="height: 100px; position: relative">
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="pink"
          @click="dialog = true; question = {}"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-text>

    </v-layout>
  </v-container>
</template>

<script>

  import gql from 'graphql-tag'

  export default {
    data () {
      return {
        dialog    : false,
        text      : '',
        questions : [],
        question  : {},
        selected: [2],
        items: [
          {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          }
        ]
      }
    },
    methods: {
      search: function () {
        this.$apollo.queries.questions.refetch({ text : this.text });
      },
      create: async function () {

        const mutation = {
          mutation: gql`mutation($title: String!, $text: String!) {
            question(title: $title, text: $text) {
              _id
            }
          }
          `,
          variables: {
            ...this.question
          }
        }

        try {

          await this.$apollo.mutate(mutation);

          this.dialog = false;

        } catch (error) {
          console.error(error);
        }

      }
    },
    apollo: {
      // Simple query that will update the 'hello' vue property
      questions: {
        query: gql`query SearchQuestions($text: String!){
          questions(text: $text) {
            title,
            text
          }
        }`,
        variables () {
          return {
            text: this.text
          }
        }

      }

    }
  }
</script>

<style scoped>
  .v-list {
    width: 100%;
  }
</style>
