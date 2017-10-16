import VueTxtNumber from './components/vue-txt-number.vue'

const plugin = {
  install: Vue => {
    Vue.component('vue-txt-number', VueTxtNumber)
  }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueTxtNumber);
}

VueTxtNumber.install = plugin.install

export default VueTxtNumber
export { VueTxtNumber, plugin }