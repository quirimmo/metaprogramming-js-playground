// NOTE: YOU CAN CREATE A REVOCABLE PROXY THROUGH Proxy.revocable constructor (without new syntax) and then call proxyInstance.revoke();

// Proxy over object
// ==============================

const input = {
  bla: "blablabla",
  test() {
    console.log("Test method");
  }
};
const proxiedInput = new Proxy(input, {
  get(target, prop, receiver) {
    if (typeof target[prop] !== "function") {
      return "etcetcetc";
    }
    return function(...args) {
      console.log("I am a trapped method");
    };
  },
  set(obj, prop, value) {
    obj[prop] = "standard value";
    console.log("setting the value:", obj[prop], "instead of", value);
  }
});
console.log("Input bla:", input.bla);
console.log("Proxied Input Bla:", proxiedInput.bla);
input.bla = "new blablabla";
console.log("Input bla:", input.bla);
proxiedInput.bla = "ignored value";
console.log("Proxied Input Bla:", proxiedInput.bla);

proxiedInput.test();

console.log(
  "======================================================================"
);

// Proxy over class instance
// ==============================

class Person {
  constructor() {
    this.bla = "blablabla";
  }
  test() {
    console.log("I am a test method");
  }
}

const person = new Person();
const proxiedPerson = new Proxy(person, {
  get(target, prop, receiver) {
    if (typeof target[prop] !== "function") {
      return "etcetcetc";
    }
    return function(...args) {
      console.log("I am a trapped method");
    };
  }
});
console.log("proxied person instance:", proxiedPerson.bla);
const newPerson = new Person();
console.log("proxied person instance:", newPerson.bla);

console.log(
  "======================================================================"
);

// Proxy over class
// ==============================
class Boy {
  constructor() {
    this.name = "Quirino";
  }
  test() {
    console.log("I am a test");
  }
}

const ProxiedBoyClass = new Proxy(Boy, {
  construct() {
    return new Proxy(Boy, {
      get(target, prop, receiver) {
        return "Bruce Wayne";
      }
    });
  }
});
class ProxiedBoyClass2 {
  constructor() {
    return new Proxy(Boy, {
      get(target, prop, receiver) {
        return "Tony Stark";
      }
    });
  }
}
const proxiedBoyInstance = new ProxiedBoyClass();
console.log(proxiedBoyInstance.name);
const proxiedBoyInstance2 = new ProxiedBoyClass2();
console.log(proxiedBoyInstance2.name);
