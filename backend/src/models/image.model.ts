import mongoose from "mongoose";

export interface IImage {
  filename: string;
  path: string;
  url: string;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    filename: {
      type: String,
      required: [true, "This is a required field."],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "This is a required field."],
      trim: true,
    },
    path: {
      type: String,
      required: [true, "This is a required field."],
      trim: true,
      select: false,
    },
  },
  { timestamps: true }
);

imageSchema.pre("validate", function() {
  this.url = `${process.env.BASE_URL}/images/${this.filename}` 
})

const Image = mongoose.model("Image", imageSchema);

export default Image;
