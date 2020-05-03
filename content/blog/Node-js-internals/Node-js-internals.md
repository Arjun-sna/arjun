# Node.js internals

Node.js is a cross-platform Javascript runtime, which executes Javascript code outside of the browser environment. It uses the Chrome V8 engine and libuv. V8 engine compiles Javascript code into the C++ code. libuv is a c++ library that provides asynchronous I/O operation like the file system, networking, etc. Node.js acts as an interface, which helps to access low-level C++ API while writing JS code.

The Node.js has two parts, the JS part, and the C++ part. The JS part is like a wrapper around the C++ part, to make all the API written in C++ available to the JS code were write. Most of the working/operations of Node.js are in C++. In order to wrap and expose the C++ functions/API, `process.binding` in use. This function returns the C++ module in the JS code. V8 converts values between JS and C++ code.

![assets/_aToI5oI5HYZLQ172.png](assets/_aToI5oI5HYZLQ172.png)

**Process.binding** is a bridge where the JavaScript world connects to the C++ code.

```jsx
using v8::Array;
using v8::Boolean;
using v8::Exception;
using v8::External;
using v8::False;
using v8::Function;
using v8::Int32;
using v8::String;

#include <uv.h>

int main() {
  loop = uv_default_loop();

  uv_tcp_t server;
  uv_tcp_init(loop, &server);

  struct sockaddr_in bind_addr = uv_ip4_addr("0.0.0.0", 7000);
  uv_tcp_bind(&server, bind_addr);
  int r = uv_listen((uv_stream_t*) &server, 128, on_new_connection);
  if (r) {
    fprintf(stderr, "Listen error!\n");
    return 1;
  }
  return uv_run(loop, UV_RUN_DEFAULT);
}
```

This libuv snippet is initializing a new TCP connection. As discussed earlier it can do tasks related to OS.

This V8 snippet is importing c++ definition of JS objects such as Array, and Boolean. V8 engine translates JS objects into their C++ equivalents.

Node.js is single-threaded and the event loop of the Node also runs in the same thread. But the libraries(C++) that node uses are multithreaded. As mentioned already node uses `libuv` internally for all OS related operations. libuv maintains a thread pool of size 4 by default. So if there are four cores in the CPU, four operations can be performed parallelly. The default thread pool can also be configured to have more threads in the pool.

Ref: [https://medium.com/better-programming/learn-node-js-under-the-hood-37966a20e127](https://medium.com/better-programming/learn-node-js-under-the-hood-37966a20e127)