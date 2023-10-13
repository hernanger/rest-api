import {pool} from "./database.js";

class librosController {
    
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }
    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`,[libro.id]);
        res.json({"Registros eliminados": result.affectedRows});

    }
    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libro SET nombre=(?), autor=(?), categoria=(?), año_publicacion=(?), isbn=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn, libro.id]);
        res.json({"Registros Actualizados": result.changedRows});
    }
}

export const libro = new librosController();