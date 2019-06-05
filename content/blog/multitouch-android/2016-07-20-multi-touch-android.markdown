---
layout: post
title:  "Multi-Touch in android"
date:   2016-07-20 08:42:32 +0530
categories: Android
summary: Multi-Touch in android was available since Android 2.0. When more than one finger touches the screen multi-touch gesture happens and android provide various apis to handle these gestures. Lets start with the basic event handling for single finger on the screen

---
Multi-Touch in android was available since Android 2.0. When more than one finger touches the screen multi-touch gesture happens and android provide various apis to handle these gestures. Lets start with the basic event handling for single finger on the screen

```java
public boolean onTouchEvent(MotionEvent ev){
final int action = ev.getAction();
switch(action){
   case MotionEvent.ACTION_DOWN:{
     Log.i("Event handled ", "Action finger down");
      break;
   }

   case MotionEvent.ACTION_UP:{
     Log.i("Event handled ", "Action finger up");
     break;
   }
   return true;
}
```

The above is the one of many methods of handling touches which logs touch down and up of single finger. This work fine as long as we don't need to handle multiple fingers. But in many cases handling single finger events in not sufficient. For handling multi-touch we need to handle the below two additional events.

`ACTION_POINTER_DOWN` - MotionEvent.ACTION_POINTER_DOWN is the event triggered whenever the secondary pointer touches the screen. If there is already a pointer(finger) on the screen and one more pointer goes in contact with the screen, ACTION_POINTER_DOWN event is triggered. For all the next coming pointers the ACTION_POINTER_DOWN is triggered. MotionEvent.ACTION_DOWN will be triggered only for the first pointer coming in contact with the screen.

`ACTION_POINTER_UP` - MotionEvent.ACTION_POINTER_UP is the event triggered when a pointer goes up and there in yet another pointer still in contact with the screen. The same event is triggered for all pointer going up till the last pointer and MotionEvent.ACTION_UP will be triggered for the last pointer leaving the screen.

The next two things we should know to keep track of each pointer is are `Pointer Index` and `Pointer ID`. Lets see what they are and how they help us in handling multi-touch.

`Index` - In a `MotionEvent` object, the pointer details are stored in array. So, the `Index` of a pointer is its position in that array. From this we can infer that pointer index in not persistent across the event. To put that with an example, when a first pointer touches the screen, it will be the first object in array, with pointer index 0. When second pointer comes, it will be stored in index 1. Now when the pointer with index 0 goes up, the position of pointer in array is rearranged, which puts the second pointer which is currently stays on screen in index 0.

`ID` - While the pointer index is non persistent, to identify the pointers across events of an entire gesture, `Pointer ID` comes in handy. `Pointer ID` is unique ID mapping to the pointer which stays persistent always. So in the example discussed for `Index`, even when the position of pointer in array changes, its pointer id remains same. That makes the difference between `Index` and `ID`.    

Lets find how we can use the above discussed things and handle multi-touch. We will take a real example and make things more clear. Consiter we have three buttons on screen namely `LEFT` `RIGHT` `JUMP`. As the name of the buttons suggests, they perform move right, move left and jump actions respectively. Take a look at the screen below.

![demo screen](http://i38.photobucket.com/albums/e125/arjunsna/blogs/screen_zpstrcgxtp4.jpg)

Basically how we handle this is when pointer goes down, take that event's `X` and `Y` and check whether the point (X,Y) lies with in the area of any of the three button and perform operations accordingly as below

```java
public boolean onTouchEvent(MotionEvent motionEvent){
  int x,y;
  final int action = ev.getAction();
  switch(motionEvent.getAction() & MotionEvent.ACTION_MASK) {
     case MotionEvent.ACTION_DOWN:{
        x = (int) motionEvent.getX();
        y = (int) motionEvent.getY();
        if (right.contains(x, y)) {
            setIsPressingLeft(false);
            setIsPressingRight(true);
        } else if (left.contains(x, y)) {
            setIsPressingLeft(true);
            setIsPressingRight(false);
        } else if (jump.contains(x, y)) {
            startJump();
        }
        break;
   }

   case MotionEvent.ACTION_UP:
        x = (int) motionEvent.getX();
        y = (int) motionEvent.getY();
        if (right.contains(x, y)) {
            setIsPressingRight(false);
        } else if (left.contains(x, y)) {
            setIsPressingLeft(false);
        } else if (jump.contains(x, y)) {
            stopJump();
        }
        break;
   return true;
}
// right, left, jump in the above code are
//RECT objects which represent the button location on screen.
```

The above code will work for single pointer events. When multiple pointer touches the screen, events will be missed desired output is not achieved. Now will revise the above code so that we will handle all events when multiple pointers touches the screen.

```java
int x,y;
final int action = ev.getAction();
switch(motionEvent.getAction() & MotionEvent.ACTION_MASK) {
   case MotionEvent.ACTION_DOWN:{
      x = (int) motionEvent.getX();
      y = (int) motionEvent.getY();
      if (right.contains(x, y)) {
          setIsPressingLeft(false);
          setIsPressingRight(true);
      } else if (left.contains(x, y)) {
          setIsPressingLeft(true);
          setIsPressingRight(false);
      } else if (jump.contains(x, y)) {
          startJump();
      }
      break;
 }

 case MotionEvent.ACTION_UP:
      x = (int) motionEvent.getX();
      y = (int) motionEvent.getY();
      if (right.contains(x, y)) {
          setIsPressingRight(false);
      } else if (left.contains(x, y)) {
          setIsPressingLeft(false);
      } else if (jump.contains(x, y)) {
          stopJump();
      }
      break;

  case MotionEvent.ACTION_POINTER_DOWN:
       x = (int) motionEvent.getX();
       y = (int) motionEvent.getY();
       if (right.contains(x, y)) {
           setIsPressingRight(false);
       } else if (left.contains(x, y)) {
           setIsPressingLeft(false);
       } else if (jump.contains(x, y)) {
           stopJump();
       }
       break;

   case MotionEvent.ACTION_POINTER_DOWN:
        x = (int) motionEvent.getX();
        y = (int) motionEvent.getY();
        if (right.contains(x, y)) {
            setIsPressingRight(false);
        } else if (left.contains(x, y)) {
            setIsPressingLeft(false);
        } else if (jump.contains(x, y)) {
            stopJump();
        }
        break;

 return true;
```

Now it looks fine, when secondary pointer goes in contact or leaves the screen, `ACTION_POINTER_DOWN` and `ACTION_POINTER_DOWN` events are triggered respectively and we have handled it well. But this is not enough. If you have noticed, we always use `motionEvent.getX()` and `motionEvent.getY()` to get x and y co-ordinated. By default `getX()` and `getY()` returns co-ordinated of pointer in index 0. So what we are doing is always handle co-ordinates of primary poitner even though we handle secondary pointer events. Lets tweek the code above a little more to make it work perfectly.

```java
int x,y;
final int action = ev.getAction();
switch(motionEvent.getAction() & MotionEvent.ACTION_MASK) {
   case MotionEvent.ACTION_DOWN:{
      x = (int) motionEvent.getX();
      y = (int) motionEvent.getY();
      if (right.contains(x, y)) {
          setIsPressingLeft(false);
          setIsPressingRight(true);
      } else if (left.contains(x, y)) {
          setIsPressingLeft(true);
          setIsPressingRight(false);
      } else if (jump.contains(x, y)) {
          startJump();
      }
      break;
 }

 case MotionEvent.ACTION_UP:
      x = (int) motionEvent.getX();
      y = (int) motionEvent.getY();
      if (right.contains(x, y)) {
          setIsPressingRight(false);
      } else if (left.contains(x, y)) {
          setIsPressingLeft(false);
      } else if (jump.contains(x, y)) {
          stopJump();
      }
      break;

  case MotionEvent.ACTION_POINTER_DOWN:
      final int pointerIndexDown = (motionEvent.getAction() &
          MotionEvent.ACTION_POINTER_INDEX_MASK) >> MotionEvent.ACTION_POINTER_INDEX_SHIFT;
       x = (int) motionEvent.getX(pointerIndexDown);
       y = (int) motionEvent.getY(pointerIndexDown);
       if (right.contains(x, y)) {
           setIsPressingRight(false);
       } else if (left.contains(x, y)) {
           setIsPressingLeft(false);
       } else if (jump.contains(x, y)) {
           stopJump();
       }
       break;

   case MotionEvent.ACTION_POINTER_DOWN:
       final int pointerIndexUp = (motionEvent.getAction() &
            MotionEvent.ACTION_POINTER_INDEX_MASK) >> MotionEvent.ACTION_POINTER_INDEX_SHIFT;
        x = (int) motionEvent.getX(pointerIndexUp);
        y = (int) motionEvent.getY(pointerIndexUp);
        if (right.contains(x, y)) {
            setIsPressingRight(false);
        } else if (left.contains(x, y)) {
            setIsPressingLeft(false);
        } else if (jump.contains(x, y)) {
            stopJump();
        }
        break;

 return true;
```

Now lets discuss the changes done above. For events `ACTION_DOWN` and `ACTION_UP`, we have not changed anything since it will be triggered on for primary pointer(first pointer which triggers event). For other two event we are finding the index of the pointer for which the event has occurred and get the x,y co-ordinates of the event with the pointer index as below

```java
final int pointerIndexDown = (motionEvent.getAction() &
                         MotionEvent.ACTION_POINTER_INDEX_MASK) >> MotionEvent.ACTION_POINTER_INDEX_SHIFT;

final int pointerIndexUp = (motionEvent.getAction() &
                        MotionEvent.ACTION_POINTER_INDEX_MASK) >> MotionEvent.ACTION_POINTER_INDEX_SHIFT;
```

In the above `pointerIndexDown` will hold the index of pointer which came in contact with screen when there is other pointer(s) already in contact with screen and by which the event was triggered. In other words, it is the recent pointer which came in contact with screen after the primary pointer. And `pointerIndexUp` holds the index of the pointer which left the screen recently when other pointer(s) is already on the screen. We use these pointer indices to get the correct co-ordinates of the event and perform operation

 ```java

x = (int) motionEvent.getX(pointerIndexDown);
y = (int) motionEvent.getY(pointerIndexDown);

x = (int) motionEvent.getX(pointerIndexUp);
y = (int) motionEvent.getY(pointerIndexUp);

 ```

`motionEvent.getX(pointerIndex)` gives the x co-ordinate of event which was triggered by the pointer with given pointer index. Same goes for `motionEvent.getY(pointerIndex)` which gives y co-ordinate.

We have discussed one of the many use cases of multi-touch handling. To find a working example of multi-touch, take a look at the following project
<https://github.com/Arjun-sna/SwipeCards>
