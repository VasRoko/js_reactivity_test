let data = { a: 5, b: 2 }
let result

class Dep {
    constructor() {
        this.subscribers = []
    }

    depend() {
        if (target && !this.subscribers.includes(target)) {
            this.subscribers.push(target);
        }
    }

    notify() {
        this.subscribers.forEach(s => s())
    }
}

Object.keys(data).forEach(key => {
    let internalVal = data[key] 
    const dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            console.log(`Getting ${key}: ${internalVal}`)
            dep.depend(target);
            return internalVal;
        },
        set(newVal) {
            console.log(`Setting ${key}: ${newVal}`)
            internalVal = newVal
            dep.notify();
        }
    })
})
function watcher(Func) {
    target = Func
    target()
    target = null
}

watcher(() => {
    result = data.a * data.b
});

