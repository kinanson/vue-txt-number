<template>
  <div>
    <vue-txt-number v-model="number"></vue-txt-number>
  </div>
</template>

<script>
import VueTxtNumber from './components/vue-txt-number.vue'
export default {
  components: {
    VueTxtNumber
  },
  data () {
    return {
      number: 3
    }
  }
}
</script>

<style>
</style>
