import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro/:id_libro',libro.getOne);
router.post('/libro', libro.add);
router.delete('/libro/id/:id_libro',libro.delete);
router.delete('/libro/isbn/:isbn',libro.deleteByIsbn);
router.put('/libro/:id_libro', libro.update);