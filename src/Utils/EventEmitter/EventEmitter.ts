class Emitter {
  private _state: {
    [p: string | symbol]: any;
  } = {};
  private _callbacks: {
    [p: string | symbol]: Function[] | undefined;
  } = {};
  me = this;
  private _stateProxy = new Proxy(this._state, {
    set: (target, property, newValue, receiver) => {
      target[property] = newValue;
      this._callbacks[property]?.forEach((callback) => callback(newValue));
      return true;
    },
  });
  on(eventName: string, callback: Function) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName]!.push(callback);
    } else {
      this._callbacks[eventName] = [callback];
    }
  }
  emit(eventName: string, data: any) {
    this._stateProxy[eventName] = data;
  }
}

export default Emitter;
