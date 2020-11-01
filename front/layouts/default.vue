<template>
  <v-app dark>


    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon/>

      <v-spacer/>



      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="400"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="updateSavedEvents"
          >
            <v-icon>
              mdi-content-save
            </v-icon>
          </v-btn>
        </template>


        <v-card>
          <div v-if="savedEvents.length">
            <v-list>
              <v-list-item v-for="item in savedEvents">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>

                  <v-list-item-subtitle>
                    {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="deleteEvent(item.id)">
                    <v-icon color="red lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <v-list>
              <v-list-item>
                Список пуст
              </v-list-item>
            </v-list>
          </div>

        </v-card>
      </v-menu>

    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <notifications />
  </v-app>
</template>

<script>
import { getSavedEventsData, removeEventFromLocalStorage} from '../components/Events/savedEvents'
import moment from 'moment'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      savedEvents: []
    }
  },
  methods: {
    updateSavedEvents() {
      getSavedEventsData()
        .then(saveEvents => {
          console.log('saveEvents', saveEvents)
          this.savedEvents = saveEvents
        })
    },
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY')
    },
    deleteEvent(eventId) {
      removeEventFromLocalStorage(eventId)
        .then(() => {
          this.savedEvents = this.savedEvents.filter(item => item.id !== eventId)
        })
    }
  }
}
</script>
