<h1 align="center">Marionette Browserify Seed</h1>

## About
Basically I needed an application that allowed for multiple form modules that may communicate with each other and validation against each other.

## Setup
```shell
npm install
grunt
```

## Build tools
* Browserify generates two bundles - app and vendor
* Leverage hbsfy transform for handlebars
* Light express app for fixure data

## In depth look

### Common Modules

* Behaviors to control standard UI components e.g Forms
* Modals 
* Class - A clean way to create a new component that handles calls to super's prototypes and mixins backbone events
* Route - Extend Marionette route to allow for enter events and cleaner navigation
* Router - Extend Marionette Router to add some nive to have events 
* Service - Custom Service Object extends Marionette Object and adds stop,start, and backbone.radio
* Storage - WIP
* Added the other components for ease to refrence with common + ability to extend extremely easily later

### Util

* CMS - Grab i18n content and create a handlebar helper to allow ```{{cms "content_key"}}``` in hbs files
### Header/Footer

### Navigation

### Validation

## Principles

## Testing
