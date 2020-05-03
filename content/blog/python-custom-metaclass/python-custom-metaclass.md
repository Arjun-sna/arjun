# Python Custom Metaclass

As discussed in the metaclasses definition, whenever an object is created for a class, the `__call__` method of a metaclass is called which in turn calls the `__new__` and then `__init__` method of the class for which the object is created.

```jsx
class Foo:
  pass

f = Foo()
```

Here when `f` is created, the metaclass of `Foo` which is `type` calls the `__new__` method in `Foo`. But since `Foo` doesn't implement the method `__new__` , it tries to invoke the method from the `Foo`'s ancestor which in this case would be `object`.

With that, if you want to override the object instantiation for any object, just implement `__new__` in the object as below. 

```jsx
class Foobar:
    def __init__(self):
      self.var = "Hello World!"

    def __new__(cls):
      print("Creating instance")
      return super().__new__(cls)

x = Foobar() // Creating instance
print(x.var) // Hello World!
```

In the same way, since the `class` is an object of `type` metaclass, the instantiation of the class can be customized by overriding `__new__` in the metaclass.

```jsx
def new(cls):
  x = type.__new__(cls)
  x.val = "Hello World!"
  return x // Here x is a class object

type.__new__ = new // TypeError: can't set attributes of built-in/extension type 'type' 

class Foo:
  pass
```

Though the above code makes sense, python won't allow setting attributes to `type` class directly and even if it does, it will end up an infinite loop. So to overcome this, we need to create a custom metaclass to achieve what we want. Custom metaclasses are user-defined metaclasses which are derived from `type` metaclass. So let's define a custom metaclass first.

 

```jsx
class CustomMeta(type):
  def __new__(cls, name, bases, dict):
    x = super().__new__(cls, name, bases, dict)
    x.val = "Hello World!"
    return x
```

The above metaclass just overrides `__new__` method and creates the intended class object whenever class code is executed. Now let's see how to use this custom metaclass.

```jsx
class Foo(metaclass=CustomMeta):
  pass

f = Foo()
print(f.val) // Hello World!
print(Foo.val) // Hello World!
```

Here we have defined a class and specified it's metaclass using the `metaclass` keyword. Now all the classes with this custom metaclass will have attribute `val` assigned to it automatically. We can use it as a class factory.