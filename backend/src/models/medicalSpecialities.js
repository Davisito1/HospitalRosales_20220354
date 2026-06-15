import {Schema, model} from "mongoose";

const specialitiesModel = new Schema({
    specialityName: {type: String},
    description: {type: String},
    isAvailable: {type: Boolean}
})

export default model("specialities", specialitiesModel)