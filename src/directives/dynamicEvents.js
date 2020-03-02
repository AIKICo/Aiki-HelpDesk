const DynamicDirectives={
    bind: function (el, binding, vnode) {
        const allEvents = binding.value;
        allEvents.forEach((event) => {
            // register handler in the dynamic component
            vnode.componentInstance.$on(event, (eventData) => {
                // when the event is fired, the proxyEvent function is going to be called
                vnode.context.proxyEvent(event, eventData);
            });
        });
    },
    unbind: function (el, binding, vnode) {
        vnode.componentInstance.$off();
    },
}

export default DynamicDirectives;
