import {pool} from "./database.js";

class librosController {
    
    async getAll(req, res){
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            if (result.length > 0) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'No se encontraron libros.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener los libros.' });
        }
    }
    async getOne(req, res){
        try {
            const id = req.params.id;
            const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id]);
            if (result.length === 0) {
                res.status(404).json({ error: 'Libro no encontrado. corrobore el id' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener el libro' });
        }
    }
    
    async add(req, res){
        try {
            const libro = req.body;
            if (!libro.nombre || !libro.autor || !libro.categoria || !libro.anio_publicacion || !libro.isbn) {
                res.status(404).json({ error: 'Faltan campos requeridos' });
                return;
            }
            const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anio_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn]);
            res.json({"Id insertado": result.insertId});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al agregar el libro' });
        }
    }
    
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`,[libro.id]);
        res.json({"Registros eliminados": result.affectedRows});

    }
    async delete(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`,[libro.isbn]);
            if (result.affectedRows === 0) {
                throw new Error('No se encontró un libro con el ISBN proporcionado.');
            }
            res.json({"Registros eliminados": result.affectedRows});
        } catch (error) {
            console.error(error);
            if (error.message === 'No se encontró un libro con el ISBN proporcionado.') {
                res.status(404).json({ error: 'No se encontró un libro con el ISBN proporcionado.' });
            } else {
                res.status(500).json({ error: 'Hubo un error al eliminar el libro' });
            }
        }
    }
    
    
    
    async update(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), isbn=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn, libro.id]);
            if (result.changedRows === 0) {
                throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.');
            }
            res.json({"Registros Actualizados": result.changedRows});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
        }
    }
    
}

export const libro = new librosController();