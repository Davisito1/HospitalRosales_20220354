import {Schema, model} from "mongoose"

const medicalEquipmentModel = new Schema({
    equipmentName: {type: String},
    description: {type: String},
    brand: {type: String},
    model: {type: String},
    purchaseDate: {date: Date},
    maintenanceDate: {type: Date},
    condition: {type: String},
    image: {type: String},
    public_id: {type: String},
    status: {type: String},
    isAvailable: {type: Boolean}
})

export default model("medicalEquipment", medicalEquipmentModel)