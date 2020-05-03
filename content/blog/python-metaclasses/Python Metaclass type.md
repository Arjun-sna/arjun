---
layout: post
title:  "Python Metaclasses"
date:   2020-01-20 08:42:32 +0530
categories: Python
summary: Metaclasses in python are way of supporting metaprogramming. Python has built-in metaclasses and also supports creating custom metaclasses. Understanding metaclasses in python helps to understand under the hood of classes and objects in python.

---

# Python Metaclass(type)

Metaclasses in python are way of supporting metaprogramming. Python has built-in metaclasses and also supports creating custom metaclasses. Understanding metaclasses in python helps to understand under the hood of classes and objects in python. 

In python, to get the instance of or type of or class of an object, there are two ways → accessing `__class__`attribute of the object and calling `type(obj)`function. Both returns the same value in new-style classes. Old-style classes before 3 have different result for those though

So in python, we can refer to the object's type and it's class interchangeably. Everything in python is an object.  If so, then a class should also be an object. Then what is the type if the class object or what is the parent class of class object? We will use `type()` to find the type of or class of the class object

```jsx
class Foo:
	pass

x = Foo()

type(x) // <class '__main__.Foo'>
type(Foo) // <class 'type'>
```

As shown in the code above `type(x)` will print `<class '__main__.Foo'>`because `x` is of type `Foo` or x is an object of class `Foo`. But the `type(Foo)` prints  `<class 'type'>` which say the `Foo` is of type `type`.  `Foo` is an object of `type` class. Not only the user-defined classes, but all the built-in classes will also have the same result which is `<class 'type'>`. And again as mentioned, all classes are instances/objects of `type` class, then `type` class should also be an object of a class which is `type` itself. In the short, the class of or parent class of `type`class is `type` itself.  And this `type` is called a metaclass. How classes are created with metaclass type? Using the `type` function. The `type` function when passed a single argument, it returns the type of the argument. The same function can also be used to create a class dynamically as below.

  

```jsx
class Foo:
	pass

Bar = type('Bar', (Foo,), dict(attr=100)) 
```

The above code create a new class named `Bar`, inheriting from base class `Foo`

Let see what those argument are. The syntax is `type(<name>, <base classes>, <attibutes>)`

`<name>`: the name of the class to be created.

`<base classes>`: a tuple object of all classed to inherit from.

`<attibutes>`: a dictinary object of all the attribute to be added to the created class.

## Instance(class and object of class) creation flow

Knowing the flow of instance creation helps understand metaclasses better.

Creating a class instance which is basically creating objects from classes can be depicted from the below diagram

![assets/instance-creation.png](assets/instance-creation.png)

The diagram is more self explantory. The flow is

- When a new object for a class is created, the `__call__` method of the metaclass is called. In this case, the metaclass will be `type`
- The call method calls the `__new__` method of the class. This is the method which creates an instance and returns it to the `__call__` method
- Then the `__init__`method of the class is called with the created instance as the first parameter.
- Then the instance is returned  from the `__call__` method

Not lets look at the creation of instance of metaclass which is creating a class itself.

![Python%20Metaclass%20type/class-creation.png](Python%20Metaclass%20type/class-creation.png)

Let's see the flow 

- Initially, `__prepare__` method is called which can return a dictionary that will be used as a local namespace in the created class.
- `Meta-metaclass`, which is in normal cases the `type` class `__call__` method is invoked, which calls `__new__` method of the metaclass. This is where the class object is created and returned.
- Then the `__init__` method is invoked with created class a first parameter
- Once `__init__` returns, the created class is returned