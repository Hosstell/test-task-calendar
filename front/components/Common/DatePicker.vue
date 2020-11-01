<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        v-model="rusDate"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "DatePicker",
    props: {
      label: String,
      value: String,
      rules: Array
    },
    data() {
      return {
        menu: false,
      }
    },
    computed: {
      date: {
        get() {
          return this.value
        },
        set(newVal) {

          this.$emit('input', newVal)
        }
      },
      rusDate() {
        if (this.date) {
          let d = moment(this.date)
          return d.format('DD.MM.YYYY')
        }
        return ''
      }
    },
    watch: {
      value(newValue) {
        console.log(newValue)
      }
    }
  }
</script>

<style scoped>

</style>
