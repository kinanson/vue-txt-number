
# vue number

>Works for Vue2. This is only can key number component based on vue.js . Currently, It very simple for us.I just need key length and decimal length.That also has disabled negative number.If you also need limit length input component that will be for you.

[Demo](https://kinanson.github.io/#/)

### install

npm install vue-txt-number --save

If you not signle file vue.You can download dist file include it in html
``` shell
<script src='dist/vue-txt-number.min.js'>
```
Above file can find in the [here](https://github.com/kinanson/vue-txt-number/tree/master/dist)
### usage
You can import in the vue file like what do you usally do.
``` html
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

```

### props
- key-length:default is'not limit
- decimal-length:default can't key deciaml and dot
- allow-negative:default is allow

### events
- tab
- enter

