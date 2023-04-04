type stateType = Record<string, any>;

const $$state: Record<symbol, any> = {};

export default class Store {
  #key = Symbol('key');
  #target = new EventTarget();

  #createEvent(state: stateType) {
    return new CustomEvent('state', {
      detail: state,
    });
  }

  set(key: string, value: any) {
    const oldState = $$state[this.#key];
    $$state[this.#key] = { ...oldState, [key]: value };
    this.#target.dispatchEvent(this.#createEvent($$state[this.#key]));
  }

  on(key: string, listener: (value: any) => void) {
    const state = $$state[this.#key];

    if (state) {
      listener(state[key]);
    }

    const eventHandler = (event: Event) => {
      if (!listener) {
        this.#target.removeEventListener('state', eventHandler);
      }

      const { detail } = event as any as { detail: stateType };
      listener(detail[key]);
    };

    this.#target.addEventListener('state', eventHandler);
  }
}
