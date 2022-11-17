import mongoose from "mongoose";
import { productSchema } from "./userModel";

export default mongoose.model("product", productSchema)