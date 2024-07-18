import {Ziggy} from "@/ziggy.js";

const ZiggyDecorator = storyFn => {
    globalThis.Ziggy = Ziggy
    return storyFn()
}

export default ZiggyDecorator
