#Hembow Web Client

This document will be used to give basic guidelines for developing on the Hembow project. If you feel that something should be added, please add!

##Tech Choices

* Knockout.js
  * Knockout.js will be our library of choice for handling data-binding and templating. We will be developing using Knockout 3.3 and making use of their new Components system.

    Some key things to learn about Knockout include:

    * Using Observables
    * Using Computeds
    * if, foreach, with, css, attr bindings
    * component and template bindings _(protip: there's a difference)_
    * ko.utils.arrayMap

    Good reference sites for Knockout include:

    * http://www.knockoutjs.com/
    * http://www.knockmeout.net/
    * http://blog.stevensanderson.com/

* Twitter Bootstrap 3
  * We will use Bootstrap for grids, canned styling and components. We are using Bootstrap instead of Foundation because it does not require you to resync the DOM every time an element is added, which would be painful with Knockout (or any other SPA technology).

    Good references include:

    * http://www.getbootstrap.com

* Crossroads.js
  * We will use Crossroads.js for our routing system. THIS IS NOT SET IN STONE. If you prefer a different routing system, let's talk about it. Crossroads is currently wired in and working with Hasher.js. You set up routes in src/app/router.js.

    Good references include:

    * http://millermedeiros.github.io/crossroads.js/

* Jasmine & Karma
  * Jasmine will be our Unit Testing Framework, Karma will be our Test Runner. We need to be writing tests around any _logic_ (computeds, pureComputeds, and other functions). We do not need to be writing tests around getters or setters (observables).

    It might be a little tricky to write tests around computeds, I'll try to get a good example in here eventually and help everyone understand the interactions. Eventually, the Jenkins server should pull in any pushes to git and automatically run all tests, but we should get in the habit of writing and running tests as we develop.

    To learn more about Jasmine, hit their site:

    * http://jasmine.github.io/

* Others
  * Underscore.js (or lo-dash if you guys want)
  * jQuery (dependency for other tools)
  * Require.js for building the app modular

##General Organization

- Hembow-Web-Client
  - node_modules
  - src
    - app - _contains files that configure the app_
    - bower_modules
    - components - _contains ko components that would be used in a modular fashion (Jake wants us to break this down further into like components)_
    - css
    - fonts - included Font Awesome
    - helpers - Cool scripts to be reused across site
    - images 
    - lib - Third party libraries: Dropzone
    - models - _contains the ViewModels for our data (User, Hunt, Comment, etc)_
    - pages - _new concept. this would actually be a KO Component but we're going to put them in here. These would be the overarching pages for the app (Account Settings, Home, About, or whatever) We can discuss this to make sure it's needed_
    - requests - _contains our api calls_
    - index.html - _where the magic happens_
  - test
    - bower_modules
    - components - _where our tests for components would go_
    - models - _where our model tests would go_
    - requests - _where our request tests would go_
    - additional files needed to run stuff (.bowerrc, bower.json, index.html, require.config.js, SpecRunner.browser.js, SpecRunner.karma.js)
  - additional files for gulp, karma, node, git etc...

##General Structure

ViewModels should have the same basic structure throughout the files. Here is an example.

```
define(['knockout'],function(ko){
    function MyViewModel(params) {
        var vm = this;

        vm.id = params.id;
        vm.name = ko.observable(params.name);
        vm.address = ko.observable(params.address);

        vm.nameAndAddress = ko.computed(function(){
            return vm.name() + ' ' + vm.address();
        });

        vm.update = function(data){
            vm.id(data.id);
            vm.name(data.name);
            vm.address(data.address);
        }

        function alertName(){
            alert(vm.name());
        }

        vm.name.subscribe(alertName);
    }

    return MyViewModel;
});
```

A couple things to note:

* We always pass params. Params are good. We want to be injecting scope so that we can write good tests.
* We are defining 'this'. JavaScript is hard. Sometimes it's hard to know your scope. If you define your scope, everything is easier.
* We are doing things in a particular order:
  * Declare variables
  * Declare observables
  * Declare computeds / pureComputeds
  * Declare functions
  * Declare subscribes
  * If you needed to do something upon creation of the Model, do that last (call of function for example)
* We always return the function to create the object, rather than a new Object _(return MyViewModel)_

If you have questions about why we do it this way, please ask!

##Writing Tests with Jasmine

TODO
