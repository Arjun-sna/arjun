---
layout: post
title:  "Multiple AsyncTasks"
date:   2017-01-24 10:42:32 +0530
categories: Android
summary: How AsyncTask works and how to execute multiple AsyncTasks

---

AsyncTask enables the proper and easy use of the UI thread. This class allows you to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers. This is the definition given for `AsyncTask` in android documentation. Now let us see how this class works internally.

AsyncTask uses `Handler`, `Thread`, `Executor`, `FutureTask`, `Callable` to achieve its functionality, which is to perform the operation in background and post the status and result of the operation onto the main thread. Whenever a new AsyncTask object is created, a new `Callable` and `FutureTask` instance are created in the constructor.

Every AsyncTask created will have a common `THREAD_POOL_EXECUTOR` and `SERIAL_EXECUTOR` at the process level to execute the tasks in a new thread.

`SERIAL_EXECUTOR` - This is the default executor used in AsyncTask, which executed the AsyncTask in a sequential order, using a `Queue` implementation. However, `SERIAL_EXECUTOR` used `THREAD_POOL_EXECUTOR` at the end to execute the task in a new thread.

`THREAD_POOL_EXECUTOR` - This executor is used when the AsyncTask is executed using `executeOnExecutor()` method. This executed uses Java's `ThreadPoolExecutor` to maintain a pool of threads and execute all the asynctasks using threads from that pool.

So in order to execute multiple AsyncTask in parallel, we have to use `THREAD_POOL_EXECUTOR` and execute the AsyncTasks.

Below is the sample of running multiple AsyncTasks

```java
for (Request req : allPendingRequest) {
  new BatchTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, req);
}
```

What the above code does is, for all the parallel requests to be made, it creates a new AsyncTask and instead of executing it using `SERIAL_EXECUTOR`(by using `execute()` method), we pass in the `AsyncTask.THREAD_POOL_EXECUTOR` to be used as executor for executing tasks in parallel.

This `AsyncTask.THREAD_POOL_EXECUTOR` will queue up all the task and execute it 5 tasks at a time and when any of running task is completed, the next on from the queue is executed. This is repeated until queue becomes empty. `AsyncTask.THREAD_POOL_EXECUTOR` cannot queue more that 128 tasks at a time. So if we submit more than that, an exception will be thrown.


