<template>
  <input @keydown="keydown" @keyup="keyup" type="text" :value="value" @focus="focus" @blur="blur">
</template>
<script>
export default {
  name: 'vueTxtNumber',
  props: {
    value: '',
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
  data() {
    return {
      history: [this.value]
    }
  },
  methods: {
    keyup(e) {
      this._truncateRuleValidation(e.target)
      this.$emit('input', e.target.value)
      this._emitEvent(e)
    },
    blur(e) {
      this._truncateRuleValidation(e.target)
      this.$emit('input', e.target.value)
    },
    focus() {
      this.$el.select()
    },
    keydown(e) {
      const newValue = e.target.value
      const keyCode = e.keyCode
      const isTextSelect = this._getSelection() > 0
      const isTextSelectAll = this._getSelection() === newValue.length
      const keyInPosition = this._getKeyIndex()
      const dotIndex = newValue.indexOf('.')
      const keyDecimal = newValue.substr(dotIndex + 1, newValue.length).length + 1
      if (keyCode === 27) return true
      if (keyCode === 9) return true
      if (keyCode >= 33 && keyCode <= 45) return true

      const _checkDelete = () => {
        let deleteIndex = keyCode === 8 ? keyInPosition - 1 : keyInPosition
        const deletePositionNotEqualDotIndex = deleteIndex !== dotIndex
        if ((keyCode === 8 || keyCode === 46) && (deletePositionNotEqualDotIndex || keyDecimal === 1 || isTextSelectAll)) return true
      }
      if (_checkDelete()) return true

      const _checkDash = () => {
        const keyAtStartPosition = keyInPosition === 0
        if (this.allowNegative && e.key === '-') {
          if (keyAtStartPosition && newValue.indexOf('-') === -1) return true
          if (isTextSelectAll) return true
        }
      }
      if (_checkDash(e)) return true
      const _checkDecimal = () => {
        if ((e.keyCode === 190 || e.keyCode === 110) && !isTextSelect && this.decimalLength > 0) {
          const isSmallThenDecimalLength = (newValue.length - keyInPosition) <= this.decimalLength
          if (newValue.length > 0 && dotIndex === -1 && keyInPosition > 0 && isSmallThenDecimalLength) {
            // return true
            if (newValue.indexOf('-') === -1) return true
            else if (keyInPosition > newValue.indexOf('-') + 1) return true
          }
        }
      }
      if (_checkDecimal()) return true

      const _checkKeyInt = () => {
        //check integer before point
        if (this.keyLength === 0) return true

        let keyInt = 0
        let intStr = newValue.split('.')[0]
        keyInt = intStr.length
        if (this.allowNegative) {
          keyInt = intStr.replace('-', '').length
        }
        if (this.keyLength > keyInt) return true
      }

      const isNumber = (keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)
      if (isNumber) {
        if (keyInPosition === newValue.indexOf('-') && !isTextSelect) return e.preventDefault()
        if (this.keyLength === 0 && this.decimalLength === 0) return true
        if (isTextSelect) return true

        const _checkLength = () => {
          if (dotIndex === -1) {
            return _checkKeyInt()
          } else {
            if (keyInPosition > dotIndex) {
              if (newValue.substr(dotIndex).length <= this.decimalLength) return true
            } else {
              return _checkKeyInt()
            }
          }
        }
        if (_checkLength()) return true
      }
      e.preventDefault()
    },
    _emitEvent(e) {
      switch (e.keyCode) {
        case 9:
          this.$emit('tab')
          break
        case 13:
          this.$emit('enter')
          break
      }
    },
    _getKeyIndex() {
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
    _getSelection() {
      let textComponent = this.$el
      let selectedText = ''
      // IE version
      if (document.selection !== undefined) {
        textComponent.focus()
        let sel = document.selection.createRange()
        selectedText = sel.text
      } else if (textComponent.selectionStart !== undefined) {
        let startPos = textComponent.selectionStart
        let endPos = textComponent.selectionEnd
        selectedText = textComponent.value.substring(startPos, endPos)
      }
      return selectedText.length
    },
    _truncateRuleValidation(target) {
      target.classList.remove('isValidInput')

      var floatRegex = /^-?(\d+\.)?\d*$/
      if (!floatRegex.test(target.value)) {
        this._truncateText(target)
        return
      }
      const dotIndex = target.value.indexOf('.')
      if (dotIndex !== -1) {
        let decimalStr = target.value.split('.')[1]
        if (this.decimalLength === 0 || decimalStr.length > this.decimalLength) {
          this._truncateText(target)
          return
        }
      }

      let intStr = target.value.split('.')[0]
      let keyInt = 0
      keyInt = intStr.length
      if (this.allowNegative) {
        keyInt = intStr.replace('-', '').length
      }
      if (keyInt > this.keyLength) {
        this._truncateText(target)
        return
      }

      this.history.push(target.value)
    },
    _truncateText(target) {
      target.value = _.last(this.history)
      target.classList.add('isValidInput')
    }
  }
}
</script>
<style scoped>
.isValidInput {
  animation: red2white 300ms;
}

@keyframes red2white {
  from {
    background-color: red;
  }
  to {
    background-color: white;
  }
}
</style>
