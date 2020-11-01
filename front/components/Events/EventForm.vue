<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Название*"
          v-model="event.name"
          :rules="[rules.notNullValue]"
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <date-picker
          label="Дата начала события"
          v-model="event.start"
          :rules="[rules.notNullValue]"
          required
        />
      </v-col>
      <v-col cols="6">
        <date-picker
          label="Дата завершения события"
          v-model="event.end"
          :rules="[rules.notNullValue]"
          required
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import DatePicker from '../Common/DatePicker'

  export default {
    name: "EventForm",
    components: { DatePicker },
    props: {
      event: Object
    },
    data() {
      return {
        rules: {
          notNullValue: value => !!value || "Поле не должно быть пустым",
        }
      }
    }
  }
</script>

<style scoped>

</style>
