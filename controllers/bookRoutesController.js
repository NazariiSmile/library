import BookModel from "../Schemas/bookSchema.js";
import ApplicationError from "../Errors/applicationError.js";

const wrapCatchAsync = (func) => {
  return (request, response, next) => {
    func(request, response, next).catch((err) => next(err));
  };
};

const getAllbooks = wrapCatchAsync(async (req, res, next) => {
  let allBooks = await BookModel.find({});
  res.status(200).json({
    "total-number": allBooks.length,
    entries: allBooks,
  });
});

const getBookById = wrapCatchAsync(async (req, res, next) => {
  const bookById = await BookModel.findById(req.params.id);
  if (!bookById) {
    return next(new ApplicationError(404, "Book with this Id is not found"));
  }
  res.status(200).json({
    entrie: bookById,
  });
});

const updateBook = wrapCatchAsync(async (req, res, next) => {
  const updatedBook = await BookModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false, runValidators: true }
  );
  if (!updatedBook) {
    return next(new ApplicationError(404, "Book with this Id is not found"));
  }
  res.status(200).json({
    status: "success",
    entrie: {
      updatedBook,
    },
  });
});

const setNewBook = wrapCatchAsync(async (req, res, next) => {
  const newBook = await BookModel.create(req.body);
  res.status(201).json({
    status: "success",
    entrie: {
      newBook,
    },
  });
});

const deleteBookById = wrapCatchAsync(async (req, res, next) => {
  const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
  if (!deletedBook) {
    return next(new ApplicationError(404, "Book with this Id is not found"));
  }
  res.status(200).json({
    status: "success",
    entrie: {
      deletedBook,
    },
  });
});

export { getAllbooks, getBookById, setNewBook, updateBook, deleteBookById };
