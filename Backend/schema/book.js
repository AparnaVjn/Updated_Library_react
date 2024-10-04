import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },

  issueStatus: {
    type: String,
    default: "No",
  },
  admissionNo: {
    type: Number,
    default: null,
    unique: true
  }

})

const book = mongoose.model("book", bookSchema);
export default book;