import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },

  admissionNo: {
    type: Number,
    required: true
  },

  className: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  issuedBooks: [{
    bookName: {
      type: String,
      required: true
    },
    serialNo: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
  }]

})

const student = mongoose.model("student", studentSchema);
export default student;