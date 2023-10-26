import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get ('/libros', libro.getAll);
router.post('/libros', libro.add);
router.delete('/libros/id/:id', libro.delete);
router.delete('/libros/isbn/:isbn', libro.delete);
router.put('/libros', libro.update);
router.get('/libros/:id', libro.getOne);
