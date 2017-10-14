<template>
  <input @keydown="keydown" @keyup.enter="$emit('enter')" @keyup="keyup" type="text" :value="value" @focus="focus">
</template>
<script>
export default {
  name: 'test',
  props: {
    value: {
      type: Number,
      default: 2
    },
    allowSubtract: {
      type: Boolean,
      default: true
    },
    keyLength: {
      type: Number,
      default: 0
    },
    decimalLength: {
      type: Number,
      default: 0
    }
  },
  methods: {
    keyup (e) {
      this.$emit('input', +e.target.value)
    },
    focus () {
      this.$el.select()
    },
    keydown (e) {
      const newValue = e.target.value
      const keyCode = e.keyCode
      const isTextSelect = this._getSelection() > 0
      const dotIndex = newValue.indexOf('.')
      const keyDecimal = newValue.substr(dotIndex + 1, newValue.length).length + 1
      if (keyCode === 27) return true
      if (keyCode === 9) return true
      if (keyCode >= 33 && keyCode <= 45) return true

      const _checkDelete = () => {
        const deletePositionNotEqualDotIndex = this._getKeyIndex() - 1 !== dotIndex

        if (keyCode === 8 && (deletePositionNotEqualDotIndex || keyDecimal === 1)) return true
      }
      if (_checkDelete()) return true

      const _checkDash = () => {
        const keyAtStartPosition = this._getKeyIndex() === 0
        if (this.allowSubtract && e.key === '-' && keyAtStartPosition) return true
      }
      if (_checkDash(e)) return true

      const _checkDecimal = () => {
        if ((e.keyCode === 190 || e.keyCode === 110) && !isTextSelect && this.decimalLength > 0) {
          if (e.target.value.length > 0 && dotIndex === -1 && this._getKeyIndex() > 0) return true
        }
      }
      if (_checkDecimal()) return true

      const isNumber = (keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)
      if (isNumber) {
        if (this.keyLength === 0 && this.decimalLength === 0) return true
        const _checkKeyInt = () => {
          let keyInt = newValue.split('.')[0].length + 1
          if (this.keyLength === 0) keyInt = 0
          if (this.keyLength >= keyInt && dotIndex === -1) return true
          if (this.keyLength === 0 && this._getKeyIndex() < dotIndex + 1) return true
        }
        if (_checkKeyInt()) return true
        if (this.decimalLength >= keyDecimal) return true
      }
      e.preventDefault()
    },
    _getKeyIndex () {
      let el = this.$el
      if (el.selectionStart) {
        return el.selectionStart
      } else if (document.selection) {
        el.focus()
        let r = document.selection.createRange()
        if (!r) {
          return 0
        }
        let re = el.createTextRange()
        let rc = re.duplicate()
        re.moveToBookmark(r.getBookmark())
        rc.setEndPoint('EndToStart', re)
        return rc.text.length
      }
      return 0
    },
    _getSelection () {
      let textComponent = this.$el
      let selectedText = ''
      // IE version
      if (document.selection) {
        textComponent.focus()
        let sel = document.selection.createRange()
        selectedText = sel.text
      } else if (textComponent.selectionStart) {
        let startPos = textComponent.selectionStart
        let endPos = textComponent.selectionEnd
        selectedText = textComponent.value.substring(startPos, endPos)
      }
      return selectedText.length
    }
  }
}
</script>
<style>
</style>
