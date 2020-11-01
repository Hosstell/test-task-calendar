<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
  >
    <v-form v-model="formValid">
      <v-card>
        <v-card-title class="headline">
          Редактирование события

          <v-btn icon @click="inLocal">
            <v-icon :color="getSaveButtonColor">
              mdi-content-save
            </v-icon>
          </v-btn>

          <v-spacer />
          <v-btn icon @click="closeDialog">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <EventForm :event="event" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="deleteEvent">
            Удалить
          </v-btn>
          <v-spacer/>
          <v-btn text @click="closeDialog">
            Отмена
          </v-btn>
          <v-btn text @click="saveEvent" :disabled="!formValid">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

  </v-dialog>
</template>

<script>
  import EventForm from "./EventForm";
  import {editEvent, deleteEvent} from "./actions"
  import {addEventToLocalStorage, eventIdInLocalStorage, removeEventFromLocalStorage} from './savedEvents'

  export default {
    name: "EditEventDialog",
    data() {
      return {
        dialog: false,
        formValid: false,
        eventId: undefined,
        event: {},
        isInLocal: false
      }
    },
    methods: {
      openDialog() {
        this.dialog = true
      },
      closeDialog() {
        this.dialog = false
      },
      editEvent(event) {
        this.openDialog()
        this.eventId = event.id

        this.event = {
          name: event.name,
          start: event.start,
          end: event.end,
        }

        eventIdInLocalStorage(this.eventId)
          .then(result => {
            this.isInLocal = result
          })
      },
      saveEvent() {
        editEvent(
          this.eventId,
          this.event.name,
          this.event.start,
          this.event.end,
        )
        .then(result => {
          this.$emit('edited')
          this.$notify({
            title: 'Событие успешно изменено'
          })
          this.closeDialog()
        })
        .catch(error => {
          console.error(error)
        })
      },
      deleteEvent() {
        deleteEvent(this.eventId)
          .then(result => {
            this.$emit('deleted')
            this.$notify({
              title: 'Событие успешно удалено'
            })
            this.closeDialog()
          })
          .catch(error => {
            console.error(error)
        })
      },
      inLocal() {
        eventIdInLocalStorage(this.eventId)
        .then(result => {
          if (result) {
            removeEventFromLocalStorage(this.eventId)
              .then(() => {
                this.isInLocal = false
              })
          } else {
            addEventToLocalStorage(this.eventId)
              .then(() => {
                this.isInLocal = true
              })
          }
        })
      }
    },
    computed: {
      getSaveButtonColor() {
        return this.isInLocal ? 'green' : ''
      }
    }
  }
</script>

<style scoped>

</style>
