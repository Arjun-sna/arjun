---
layout: post
title:  "React Virtual DOM"
date:   2020-05-02 08:42:32 +0530
categories: Node JS
summary: One of the key features of React is its virtual DOM. Whenever the explanation or benefit of virtual DOM is talked about, is it always said that DOM manipulations are an expensive operation and that is where virtual DOM helps in reducing the number of DOM manipulation. 
---


One of the key features of React is its virtual DOM. Whenever the explanation or benefit of virtual DOM is talked about, is it always said that DOM manipulations are an expensive operation and that is where virtual DOM helps in reducing the number of DOM manipulation. 

But that is not exactly true. DOM is fast. Even directly manipulating the DOM with vanilla JS or jQuery if faster since there is no overhead of comparison and reconciliation done by virtual DOM. Adding and removing DOM nodes doesn’t take much more than setting a property on a JavaScript object. But what is actually slow is the rendering the DOM update. Rendering includes recalculating boxes, laying out, and painting the browser. Virtual DOM helps in reducing these renders by batching the DOM updates.

Virtual DOM is an object representation of nodes, elements, attributes, and contents. So whenever there is an update in data, the below process is for updating the actual DOM.

1. Whenever anything may have changed, the entire UI will be re-rendered in a Virtual DOM representation.
2. The difference between the previous Virtual DOM representation and the new one will be calculated.
3. The real DOM will be updated with what has actually changed. This is very much like applying a patch.

Virtual DOM uses a diffing algorithm to find the difference between previous DOM and new virtual DOM and does the reconciliation on the changed part of DOM and update the DOM with changes.

// Todo add browser rendering details