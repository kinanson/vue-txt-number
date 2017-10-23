import VueTxtNumber from './components/vue-txt-number'


const install = (Vue, opts = {}) => {
    Vue.component(VueTxtNumber.name, VueTxtNumber)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { VueTxtNumber, install }