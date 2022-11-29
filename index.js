const g29 = require('logitech-g29')
const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener
const v = new GlobalKeyboardListener()
const config = require('./config.json')
// const AutoLaunch = require('auto-launch')
// const { app: electronApp } = require('electron')
let autocenterIndex = 0
let rangeIndex = 0
let currentAutocenter = config.autocenter.settings[0].strength
let currentRange = config.range.settings[0].value

v.addListener((e, down) => {
    let skipAutocenter = false
    let skipRange = false
    let skipApply = false
    let autocenterKey = 0
    let rangeKey = 0
    let isConnected = false
    config.autocenter.keybindUp.forEach(key => {
        if (!down[key]) {
            skipAutocenter = true
        }
    })
    if (skipAutocenter) {
        skipAutocenter = false
        config.autocenter.keybindDown.forEach(key => {
            if (!down[key]) {
                skipAutocenter = true
            }
        })
        if (!skipAutocenter) {
            autocenterKey = -1
        }
    } else {
        autocenterKey = 1
    }
    config.range.keybindUp.forEach(key => {
        if (!down[key]) {
            skipRange = true
        }
    })
    if (skipRange) {
        skipRange = false
        config.range.keybindDown.forEach(key => {
            if (!down[key]) {
                skipRange = true
            }
        })
        if (!skipRange) {
            rangeKey = -1
        }
    } else {
        rangeKey = 1
    }
    config.apply.keybind.forEach(key => {
        if (!down[key]) {
            skipApply = true
        }
    })
    if (skipAutocenter + skipRange + skipApply < 2) {
        console.log('Keybinds for Autocenter, Range and Apply all have to be different!')
        skipApply = true
        skipAutocenter = true
        skipRange = true
    }
    if (!skipAutocenter) {
        if (isConnected) {
            g29.disconnect()
            isConnected = false
        }
        autocenterIndex += autocenterKey
        autocenterIndex += config.autocenter.settings.length
        autocenterIndex = autocenterIndex % config.autocenter.settings.length
        g29.connect({ autocenter: [...config.autocenter.settings[autocenterIndex].strength], range: currentRange }, () => {
            isConnected = true
            currentAutocenter = [...config.autocenter.settings[autocenterIndex].strength]
            g29.leds(config.autocenter.settings[autocenterIndex].leds)
            setTimeout(() => {
                g29.leds([])
            }, config.autocenter.ledDelay)
        })
    }
    if (!skipRange) {
        if (isConnected) {
            g29.disconnect()
            isConnected = false
        }
        rangeIndex += rangeKey
        rangeIndex += config.range.settings.length
        rangeIndex = rangeIndex % config.range.settings.length
        g29.connect({ autocenter: [...currentAutocenter], range: config.range.settings[rangeIndex].value }, () => {
            isConnected = true
            currentRange = config.range.settings[rangeIndex].value
            g29.leds(config.range.settings[rangeIndex].leds)
            setTimeout(() => {
                g29.leds([])
            }, config.range.ledDelay)
        })
    }
    if (!skipApply) {
        if (isConnected) {
            g29.disconnect()
            isConnected = false
        }
        g29.connect({ autocenter: [...currentAutocenter], range: currentRange }, () => {
            isConnected = true
            g29.leds(config.apply.leds)
            setTimeout(() => {
                g29.leds([])
            }, config.apply.ledDelay)
        })
    }
})

// let autoLaunch = new AutoLaunch({
//     name: 'C29',
//     path: electronApp.getPath('exe'),
// })

// autoLaunch.isEnabled().then((isEnabled) => {
//     if (!isEnabled) autoLaunch.enable()
// })