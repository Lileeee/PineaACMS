import mitt, { Emitter } from "mitt";
type Events = {
    [propName: string]: any;
    bar?: number;
};
const bus: Emitter<Events> = mitt<Events>();

export default bus;
