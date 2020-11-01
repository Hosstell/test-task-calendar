<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
  >
    <v-form v-model="formValid">
      <v-card>
        <v-card-title class="headline">
          Создание нового события
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
          <v-spacer/>
          <v-btn text @click="closeDialog">
            Отмена
          </v-btn>
          <v-btn text @click="createNewEvent" :disabled="!formValid">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

  </v-dialog>
</template>

<script>
  import EventForm from "./EventForm";
  import {createEvent} from './actions'

  export default {
    name: "CreatingEventDialog",
    components: {EventForm},
    data: () => {
      return {
        dialog: false,
        formValid: false,
        event: {
          name: undefined,
          start: undefined,
          end: undefined
        }
      }
    },
    methods: {
      openDialog() {
        this.dialog = true
      },
      closeDialog() {
        this.dialog = false
      },
      createNewEvent() {
        createEvent(
          this.event.name,
          this.event.start,
          this.event.end,
        )
        .then(data => {
          this.$emit('created')
          this.$notify({
            title: 'Новое событие успешно создано'
          })
          this.closeDialog()
          this.event = {
            name: undefined,
            start: undefined,
            end: undefined
          }
        })
        .catch(error => {
          console.error(error)
        })
      }
    },
    mounted() {
      this.event = {
        name: undefined,
          start: undefined,
          end: undefined
      }
    }
  }
</script>

<style scoped>

</style>
