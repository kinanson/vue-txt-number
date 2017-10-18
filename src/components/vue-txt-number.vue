<template>
  <input @keydown="keydown" @keyup="keyup" type="text" :value="value" @focus="focus">
</template>
<script>
export default {
  name: 'vueTxtNumber',
  props: {
    value: {
      type: Number,
      default: 2
    },
    allowNegative: {
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
      this._emitEvent(e)
      const newValue = e.target.value
      const keyCode = e.keyCode
      const isTextSelect = this._getSelection() > 0
      const dotIndex = newValue.indexOf('.')
      const keyDecimal = newValue.substr(dotIndex + 1, newValue.length).length + 1
      if (keyCode === 27) return true
      if (keyCode === 9) return true
      if (keyCode >= 33 && keyCode <= 45) return true

      const _checkDelete = () => {
        let deleteIndex = keyCode === 8 ? this._getKeyIndex() - 1 : this._getKeyIndex()
        const deletePositionNotEqualDotIndex = deleteIndex !== dotIndex
        if ((keyCode === 8 || keyCode === 46) && (deletePositionNotEqualDotIndex || keyDecimal === 1)) return true
      }
      if (_checkDelete()) return true

      const _checkDash = () => {
        const keyAtStartPosition = this._getKeyIndex() === 0
        if (this.allowNegative && e.key === '-' && keyAtStartPosition && newValue.indexOf('-') === -1) return true
      }
      if (_checkDash(e)) return true

      const _checkDecimal = () => {
        if ((e.keyCode === 190 || e.keyCode === 110) && !isTextSelect && this.decimalLength > 0) {
          const isSmallThenDecimalLength = (newValue.length - this._getKeyIndex()) <= this.decimalLength
          if (newValue.length > 0 && dotIndex === -1 && this._getKeyIndex() > 0 && isSmallThenDecimalLength) return true
        }
      }
      if (_checkDecimal()) return true

      const isNumber = (keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)
      if (isNumber) {
        if (this._getKeyIndex() === newValue.indexOf('-')) return e.preventDefault()
        if (this._getSelection() === 0) return true
        if (this.keyLength === 0 && this.decimalLength === 0) return true
        const _checkKeyInt = () => {
          let keyInt = newValue.split('.')[0].length + 1
          if (this.keyLength === 0) {
            keyInt = 0
            if (this._getKeyIndex() > dotIndex) return true
          }
          const keyInPass = this.keyLength >= keyInt
          if (keyInPass && dotIndex === -1) return true
          if (keyInt > dotIndex && keyInPass) return true
        }
        if (_checkKeyInt()) return true
        if (this.decimalLength >= keyDecimal) return true
      }
      e.preventDefault()
    },
    _emitEvent (e) {
      switch (e.keyCode) {
        case 9:
          this.$emit('tab')
          break
        case 13:
          this.$emit('enter')
          break
      }
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
      } else if (textComponent.selectionStart > 0) {
        // let startPos = textComponent.selectionStart
        // let endPos = textComponent.selectionEnd
        selectedText = textComponent.selectionStart
      }
      return selectedText.length
    }
  }
}
</script>
<style>

</style>
