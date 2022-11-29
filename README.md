# C29
C29 - Configure your Logitech G29!

Different games require different autocenter and range settings, and C29 allows you to edit these settings on the fly, using controls on your wheel! It even has LED feedback to let you know when your settings have been applied!

![C29 in action][](https://media.githubusercontent.com/media/Zo-Bro-23/c29/main/C29.gif)

- [C29](#c29)
  - [Installation](#installation)
  - [Getting started](#getting-started)
  - [Customization](#customization)

## Installation
I'm working on a distributable release, but for now, you'll have to fork the repo and run ```node index.js```.

## Getting started
Right out of the box, the default configuration works! Press ```CTRL+SHIFT+ALT+3``` and ```CTRL+SHIFT+ALT+4``` to adjust the autocenter strength of the wheel. You can use ```CMD``` on Mac, but I think only the left ```CTRL``` and ```CMD``` work. I'm using a keyboard shortcut wrapper, so learn more about shortcut configuration [here](https://www.npmjs.com/package/node-global-key-listener). Similarly, you can use the shortcuts ```CTRL+SHIFT+ALT+5``` and ```CTRL+SHIFT+ALT+6``` to adjust the range of the wheel. You can also use ```CTRL+SHIFT+ALT+7``` to reapply saved settings, which can be useful for situations when (badly designed) games change the wheel's settings from what you've configured. It's very inconvenient to have these unwieldy shortcuts, however, so you can configure buttons on your wheel to correspond to these shortcuts, as I have done. For example, ```PS+Dial``` changes the range of my wheel!

## Customization
```./config.json``` has all the customization you need!
- ```leds``` are used for the changing the confirmation led pattern for each setting - ```0``` indicates off and ```1``` indicates on, and the indexes move from the center leds to the ones on the edges - Similarly, use ```ledDelay``` to change the duration for which the leds should stay on (milliseconds) 
- ```value``` inside the ```range``` object signifies the range for each setting (you can add how many ever you want, and the buttons will cycle between them) in degrees, ranging from ```0``` degrees to ```900``` degrees, which is the G29's maximum possible setting
- ```keybindUp``` and ```keybindDown``` can be used to change the keyboard shortcut needed to cycle between the settings (up goes to the next setting; down goes to the previous setting)
- ```strength``` inside ```autocenter``` is a bit confusing - It needs two values, but I don't exactly understand how they both work together - Generally, ```0``` for both has no autocenter and ```1``` for both has full autocenter - Try playing around with the two until you find your perfect setting! - See [here](https://github.com/nightmode/logitech-g29/blob/HEAD/docs/api.md#options) for more information on how these values are used
