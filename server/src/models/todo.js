const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// // create a new todo
// TodoSchema.methods.create = function(text) {
//   const newTodo = { text };
//   const todo = new this.model(newTodo);

//   return todo.save();
// }

// // return all todos
// findAll() {
//   return this.model.find();
// }

// //find todo by the id
// findById(id) {
//   return this.model.findById(id);
// }

// // delete todo
// deleteById(id) {
//   return this.model.findByIdAndDelete(id);
// }

// //update todo
// updateById(id, object) {
//   const query = { _id: id };
//   return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } });
// }

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
