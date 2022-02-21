import express from "express";
import {
  getAllbooks,
  getBookById,
  setNewBook,
  updateBook,
  deleteBookById,
} from "../controllers/bookRoutesController.js";

const router = express.Router();

router.route("/").get(getAllbooks).post(setNewBook);
router.route("/:id").get(getBookById).patch(updateBook).delete(deleteBookById);

export default router;
