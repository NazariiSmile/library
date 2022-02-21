import mongoose from "mongoose";

const booksMongooseShema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book's title is required."],
    unique: true,
    trim: true,
    maxlength: [60, "A book's title mush by less then 60 characters."],
    minlength: [5, "A book's title must exceed 4 characters."],
  },
  pageCount: {
    type: Number,
    required: [true, "A number of pages are required to specify for the book."],
  },
  publishedDate: {
    date: {
      type: Date,
    },
  },
  thumbnailUrl: {
    type: String,
    required: [true, "Book URL is required."],
    minlength: [3, "Minimum URL length is 3 characters."],
    maxlength: [2000, "Book URL can't exceed 2000 characters."],
  },
  shortDescription: {
    type: String,
    required: [true, "A book must have a short description"],
    maxlength: [
      150,
      "The length of the short description can'\t exceed 150 characters.",
    ],
    minlength: [
      20,
      "The length of the short description can'\t by less then 20 characters.",
    ],
  },
  longDescription: {
    type: String,
    required: [true, "A book must have a long description"],
    maxlength: [
      1000,
      "The length of the long description can'\t exceed 1000 characters.",
    ],
    minlength: [
      20,
      "The length of the long description can'\t by less then 20 characters.",
    ],
  },
  status: {
    type: String,
    required: [
      true,
      "The book status are required. The following values are available: PUBLISH, UNPUBLISH.",
    ],
    enum: ["PUBLISH", "UNPUBLISH"],
  },
  authors: {
    type: [String],
    required: [true, "The author's name must be specified."],
  },
});

const BookModel = mongoose.model("Books", booksMongooseShema);
export default BookModel;
