---
layout: post
title:  "Java abstract vs interface"
date:   2017-02-02 10:42:32 +0530
categories: Java
summary: Difference between abstract and interface in java

---

The below table gives the base implementation difference between abstract and interface which every search result in google gives.

| abstract  | interface |
|-----------------------------------------------------------|-----------|
| Abstract class can have abstract and non-abstract methods | Interface can have only abstract methods. Since Java 8, it can have default and static methods also |
| Abstract class doesn't support multiple inheritance | Interface supports multiple inheritance |
| abstract class can have final, non-final, static and non-static variables | interface has only static and final variables |

Here is a useful compilation from various website for the search **when to use interface and when to use abstract**

`abstract` class achieves partial abstraction whereas `interface` achieves fully abstraction.

An `abstract` class’s purpose is to provide an appropriate superclass from which other classes can inherit and thus share a common design.

An `interface` describes a set of methods that can be called on an object but does not provide concrete implementations for all the methods. Once a class implements an interface, all objects of that class have an is-a relationship with the interface type, and all objects of the class are guaranteed to provide the functionality described by the interface. This is true of all subclasses of that class as well. Interfaces form a contract between the class and the outside world, and this contract is enforced at build time by the compiler

Use `abstract` classes and inheritance if you can make the statement "A is a B". Use interfaces if you can make the statement "A is capable of [doing] as", or also, abstract for what a class is, interface for what a class can do. We can say a triangle is a polygon but it makes no sense to say a triangle is capable of being a polygon

Consider using abstract classes if any of these statements apply to your situation:

* You want to share code among several closely related classes.
* You expect that classes that extend your abstract class have many common methods or fields or require access modifiers other than public (such as protected and private).
* You want to declare non-static or non-final fields. This enables you to define methods that can access and modify the state of the object to which they belong.

Consider using interfaces if any of these statements apply to your situation:

* You expect that unrelated classes would implement your interface. For example, the interfaces Comparable and Cloneable are implemented by many unrelated classes.
* You want to specify the behavior of a particular data type, but not concerned about who implements its behavior.
* You want to take advantage of multiple inheritances.