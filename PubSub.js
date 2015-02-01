/**
 * Created by TinyBear.
 * Publish/Subscribe 模式
 */

(function (context) {
    var PubSub = {};
    var cache = {};

    /**
     * 订阅
     * @param topic
     * @param callback
     * @returns {*[]}
     */

    PubSub.subscribe = function (topic, callback) {

        if (!cache[topic]) {
            cache[topic] = [];
        }
        cache[topic].push(callback);
        return [topic, callback];
    };

    /**
     * 取消订阅
     * @param handle
     * @param callback
     */
    PubSub.unsubscribe = function (handle, callback) {
        var subs = cache[callback ? handle : handle[0]],
            callback = callback || handle[1],
            len = subs ? subs.length : 0;

        while (len--) {
            if (subs[len] === callback) {
                subs.splice(len, 1);
            }
        }
    };

    /**
     * 发布
     * @param topic
     * @param args
     */
    PubSub.publish = function (topic, args) {

        var subs = cache[topic],
            len = subs ? subs.length : 0;
        while (len--) {
            subs[len].apply(context, args || []);
        }
    };

    context.subscribe = PubSub.subscribe;
    context.unsubscribe = PubSub.unsubscribe;
    context.publish = PubSub.publish;


})(this);
