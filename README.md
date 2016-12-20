skscrapper
===

A lightweight cli scrapper for meal [menu page](http://sks.itu.edu.tr) of Istanbul Technical University.

### Install
Node versions 4.3.2+ is supported due to some of ES6 features used.
```
 $ npm install --global skscrapper
```

### Usage
```bash
 # prints the relevant menu for the time of day
 $ sks

 # prints lunch menu, other valid options: [--lunch, -o, --öğle, --ogle]
 $ sks -l

 # prints dinner menu, other valid options: [--dinner, -a, --akşam, --aksam]
 $ sks -d
```

### Author
İsmail Demirbilek [@dbtek](https://twitter.com/dbtek)
Released under MIT License
