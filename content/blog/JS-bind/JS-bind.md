# JS bind

Understand this and bind. The value of this in any function depends on the call point of that function. There many ways of binding this to a function like implicit, explicit, etc. One such way of binding is to use the `bind` method. `bind` method is available to all functions from the `Function` prototype. So let us work on our own implementation of `bind` to understand how it works and how the value of `this` is defined in any function. To start with lets look in default bind of window object to this in any functions. 

```jsx
function greet(greeting) {
  console.log(`${greeting} ${this.name}`)
}

greet("Hello") // Hello undefined

var name = "Arjun"

greet("Hello") // Hello Arjun
```

In the above code, the console will print `Hello undefined`, but not throw an error saying `this` is undefined. This is because **default binding** has taken place where the global object where the function is declared is bound to `this`.  Thought the bind of this has happened since there is no property named `name` available in the global object, it prints `undefined` in the first call to `greet` whereas in the second call to `greet`, the value `name` is set and it is available in the functions. PS: In strict mode default binding is not allowed.

```jsx
person = {
  name: "Arjun",
  greet: function(greeting) {
    console.log(`${greeting} ${this.name}`)
  }
}

person.greet("Hello")
```

In the above, the function object `person` is assigned two properties `name` and `greet`.  When `greet` is called with the owning object, the call site uses that object context and binds the `person` object to `greet` function call. This type of binding is called **implicit binding.** Implicit binding works on function objects as well. Check the below code.

```jsx
function greet() {
}
greet.person = "Arjun"

greet.printMessage = function(greeting) {
  console.log(`${greeting} ${this.person}`)
}

greet.printMessage("Hello") // Hello Arjun
```

 With this knowledge of `this` binding, we can implement the `bind` function similar to the one available on all Function objects. Calling bind function of a function returns a new function bound the passed in argument. See the code below.

```jsx
function bindClone(scope) {
  const fn = this;

  return function(...args) {
    fn.call(scope, ...args)
  }
}

var a = {
  val: 3
}

Function.prototype.bindClone = bindClone

function printVal() {
  console.log(this.val)
}

printVal() // undefined

printVal = printVal.bindClone(a)

printVal() // 3
```

Let us see what `bindClone` function does. First, it stores `this` value bound to the function. The value of `this` depends on the binding methods discussed above. Since `bindClone` will be called on a function object, this will refer to the function object on with `bindClone` function is called. Next, a new function is returned which takes a variable number of arguments and calls the actual function with given this bound using `call` function. Then we are adding this function to the Function prototype so that it will be available to all the function objects. The bind function can be made to receive many arguments alone this scope as below.

```jsx
function bindClone(...args) {
  const fn = this;
	const scope = args[0]
	const otherParams = args.slice(1)

  return function(...args) {
    fn.call(scope, [...otherParams, ...args])
  }
}
```