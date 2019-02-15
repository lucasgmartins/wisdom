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
          Before create a question verify if a similiar question is not created
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
        <h2 v-if="questions.length" class="headline font-weight-bold mb-3">Possible questions...</h2>

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




    </v-layout>
  </v-container>
</template>

<script>

  import _   from 'lodash';
  import gql from 'graphql-tag'

  export default {
    data () {
      return {
        text      : '',
        questions : [],
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
        this.$apollo.queries.questions.refetch({ text : this.text, fetchPolicy: 'cache-and-network' })
      }
    },
    apollo: {
      // Simple query that will update the 'hello' vue property
      questions: {
        query: gql`query SearchQuestions($text: String!){
          questions(text: $text) {
            title
            user {
              name
            }
          }
        }`,
        variables () {
          return {
            text: this.text
          }
        },
        update(data) {

          this.questions = data.questions;
          return data.questions;
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
