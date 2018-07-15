# Simple.js
Simple to run, Simple to use, Simple to thought, Simplify MVVM js framework 

## Global

* init self methods (mount / inject...)
* init components / mixins / directives
* inject into per native component

## Component Initialize

* inject global injections / components && mixins
* inject self injections / component && mixins
* init lifeCycle (lifeCycle => 'unmount' not through from before create to after destroy)
* **LifeCycle: beforeCreate** (Suggest to do some global options without relationship to component)
* init reactivities self and global state / methods / comoponents
* **LifeCycle: created** (Suggest to do some data or event initialize)
* start to mount (autoBind if with el option or by component.mount(el) method)
* **LifeCycle: beforeMount** (with all component options but $el)
* render function: "create new vnode"
* render vnode to dom
* **LifeCycle: mounted** (can do all)
* on state / prop change
* **LifeCycle: beforeUpdate** (can do all)
* create new vnode && compare with old vnode && patch diff
* **LifeCycle: updated** (can do all)
* on destroy calling
* **LifeCycle: beforeDestory** (can use component options in the last time)
* teardown injects / set lifeCycle 'unmount'
* **LifeCycle: destroyed** (suggest to clear global setter))