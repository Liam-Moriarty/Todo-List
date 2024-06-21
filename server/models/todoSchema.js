import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
