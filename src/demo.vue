<template>
  <div>
    <vue-txt-number v-model="number"></vue-txt-number>
    {{number}}
  </div>
</template>

<script>
import VueTxtNumber from './components/vue-txt-number.vue'
export default {
  name: 'demo',
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
