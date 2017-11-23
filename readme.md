# Crummm Emitter System

A zero-dependency emitter system with some fancy features under the hood.


**Just tell me how to install it!**
```
$ npm i crummm-emitter-system --save
```

**Great...what's it for?**

The original intent of this system was to decouple components, libraries, services, etc by allowing them to communicate anonymously. That said, there's countless ways to use emitter systems.

**Aren't there like a million emit/on, pub/sub, event/listener systems out there already?**

You betcha, and somehow none of them did the trick for me. My dev soul was deeply saddened by the following:
* wonky implementation
* unfulfilling feature-sets
* framework dependencies
* a lack of TypeScript support
* developers who fell asleep at the wheel (that's my job!)

Plus, I wanted some advanced features like those referenced later in this documentation.

All that said, will this system work for you? Probably not. Ha! But I kind of like it, so there is that.

Fancy words aside, let's get to the meat and potatoes of this thing.

### Basic features
* emit and listen by type
* remove listeners by
  * type and callback
  * all by type
  * all
* do once listeners

### Advanced features
* listen order: this is cool as hell and quite necessary when specific execution order is required
* requests: anonymously emit a request and listen for a anonymous response...super simple...super cool
* two different ways to use
  * create any number of system instances: ```new CrummmEmitterSystemInstance()```
  * single system instance via static class methods: ```CrummmEmitterSystem```

### Enough talk! What's the implementation look like?!

I hear you! I hate when I have to dig through source code just to get a sense of what the implementation looks like. Fear not, I'll hold your hand through this.

**Request example**

```
// listen for requests
CrummmEmitterSystem.onRequest(
  "helloRequest",
  (responseCallback: Function, requestValue: any)=> {
    responseCallback("Hello " + requestValue + "!");
  }
);

// make request for data
CrummmEmitterSystem.emitRequest(
  "helloRequest",
  (response: string)=> {
    console.log(response);
  },
  "Billy"
);

// output: 
// Hello Billy!
```

**Listen order example**

```
const TYPE = "TYPE";
const emitter = new CrummmEmitterSystemInstance();

emitter.onOnce(
  TYPE,
  (payload) => {
    console.log("This should fire 3rd even though it's setup 1st: ", payload.message);
  },
  5 // this param is the listen order!
);

emitter.onOnce(
  TYPE,
  (payload) => {
    console.log("This should fire 1st even though it's setup 2nd: ", payload.message);
  },
  1 // so is this! notice it's a lower number than the previous 'onOnce' listener...so it'll fire before it.
);

emitter.onOnce(
  TYPE,
  (payload) => {
    console.log("This should fire 2nd even though it's setup 3rd: ", payload.message);
  },
  2 // someone has to be in the middle of this sandwich...and since 2 is in-between 1 and 5 it looks like we found our victim.
);

setTimeout(
  () => {
    emitter.emit(TYPE, { message: "Hello listenOrder!" });
  },
  1000
);

// console.log:
// This should fire 1st even though it's setup 2nd:  Hello listenOrder!
// This should fire 2nd even though it's setup 3rd:  Hello listenOrder!
// This should fire 3rd even though it's setup 1st:  Hello listenOrder!
```

## How to go forward...

TODO - npm

##### Install / setup / npm
```$ npm -i```

##### Run
```$ npm start```

##### Test
```$ npm test```

### Examples
Check out the 'examples' directory for different implementations and usages.

### Errors
What'd you do wrong now?! Hey, don't beat yourself up, I've probably done the same thing already. Check out my mistakes and (hopefully) solutions below!
* ```tsc command not found ```
  * when: occurs after attempting to run command ```$ npm start```
  * mistake: something got jacked up...so I'm not beating myself up for this one
  * solution: ```$ npm install typescript -g```
  
#### If using an IntelliJ product
* mark the following directories as excluded
  * dist
  * examples

### In conclusion

Did I miss something? Let me know if I did...and feel free to checkout my dev blog below:

[Crummm Dev](https://crummm.com/dev/)
