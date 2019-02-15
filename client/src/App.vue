<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Wisdom</span>
        <span class="font-weight-light">GESTTA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>


      <!-- <v-toolbar extended>

      </v-toolbar> -->
</v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
