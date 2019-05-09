class Pubsub {

    constructor() {
        this.eventObjs = {};
    }

    // 订阅接口
    on(eventType, handler, once, context) {
		if (!this.eventObjs[eventType]) {
			this.eventObjs[eventType] = [];
		}

		this.eventObjs[eventType].push({
			handler: handler,
			once: once,
			context: context
        });

		let self = this;
		return function () {
			self.off(eventType, handler);
		};
    }

    // 退订接口
    off(eventType, handler) {
        let types = eventType ? [eventType] : [];
        types.forEach(type => {
            if (!handler) {
                // 移除所有
                this.eventObjs[type] = [];
            } else {
                let handlers = this.eventObjs[type] || [],
				nextHandlers = [];

				handlers.forEach(evtObj => {
					if (evtObj.handler !== handler) {
						nextHandlers.push(evtObj);
					}
				});
				this.eventObjs[type] = nextHandlers;
            }
        });
        return this;
    }

    // 发布接口
    emit(eventType) {
        let args = Array.prototype.slice.call(arguments, 1);

        let handlers = this.eventObjs[eventType] || [];
        let deleteList = [];
        handlers.forEach(evtObj => {
            if (evtObj.once && evtObj.called) {
                deleteList.push(evtObj);
            } else {
                evtObj.called = true;
                try {
                    evtObj.handler && evtObj.handler.apply(evtObj.context, args);
                } catch (e) {
                    console.error(e.stack || e.message || e);
                }
            }
        });
        deleteList.forEach(evtObj => {
            this.off(eventType, evtObj.handler);
        });
    }

}

export default Pubsub;
