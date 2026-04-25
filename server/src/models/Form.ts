import { InferSchemaType, model, Schema } from "mongoose";

const formSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Patient", "Volunteer"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type FormDocument = InferSchemaType<typeof formSchema> & { _id: string };

export default model("Form", formSchema);
