<template>
  <v-row justify="center" align="center">
    <v-col cols="12">

      <v-card>
        <v-card-title class="headline">
          <v-btn icon @click="prevPage">
            <v-icon large color="grey">
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-spacer/>
          <span v-if="$refs.calendar">

            {{ $refs.calendar.title }}

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="grey">
                    mdi-calendar
                  </v-icon>
                </v-btn>
              </template>
              <v-date-picker
                v-model="picker"
                type="month"
              ></v-date-picker>
            </v-menu>

          </span>

          <v-spacer/>
          <v-btn icon @click="nextPage">
            <v-icon large color="grey">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="events"
            @click:event="showEvent"
          ></v-calendar>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="createNewEvent">
            Добавить новое событие
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <CreatingEventDialog ref="creatingEventDialog" @created="updateList"/>
    <EditEventDialog ref="editEventDialog" @edited="updateList" @deleted="updateList"/>
  </v-row>
</template>

<script>
import CreatingEventDialog from "../components/Events/CreatingEventDialog";
import {getAllEvents} from '../components/Events/actions'
import EditEventDialog from "../components/Events/EditEventDialog";

export default {
  components: {
    EditEventDialog,
    CreatingEventDialog
  },
  data: () => {
    return {
      menu: false,
      value: '',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      events: [],
      date: new Date().toISOString().substr(0, 7),
      picker: new Date().toISOString().substr(0, 7)
    }
  },
  methods: {
    nextPage() {
      this.$refs.calendar.next()
    },
    prevPage() {
      this.$refs.calendar.prev()
    },
    showEvent({ nativeEvent, event }) {
      console.log(localStorage)
      this.$refs.editEventDialog.editEvent(event)
    },
    createNewEvent() {
      this.$refs.creatingEventDialog.openDialog()
    },
    updateList() {
      getAllEvents()
        .then(events => {
          this.events = events.map(event => {
            return {
              id: event.id,
              name: event.name,
              start: event.start_date,
              end: event.end_date
            }
          })
        })
    }
  },
  mounted() {
    this.updateList()
  }
}
</script>
