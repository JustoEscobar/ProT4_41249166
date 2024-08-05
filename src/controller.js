import { pool } from "./database.js";

class LibroController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res) {
        const { id_libro } = req.params;
        const [result] = await pool.query(`SELECT * FROM libros WHERE id_libro = ?`, [id_libro]);
        if (result.length === 0) {
            res.status(404).json({ message: 'Libro no encontrado' });
        } else {
            res.json(result[0]);
        }
    }

    async add(req, res) {
        const { nombre, autor, categoria, fecha_publicacion, isbn } = req.body;
        try {
            const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, fecha_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [nombre, autor, categoria, fecha_publicacion, isbn]);
            res.status(201).json({ message: 'Libro insertado', id: result.insertId });
        } catch (error) {
            console.error('Error al insertar el libro:', error);
    
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ message: 'Error: El libro con este ISBN ya existe.' });
            } else {
                res.status(500).json({ message: 'Error al insertar el libro', error: error.message });
            }
        }
    }    

    async delete(req, res) {
        const { id_libro } = req.params;
        const [result] = await pool.query(`DELETE FROM libros WHERE id_libro = ?`, [id_libro]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'ID Libro no encontrado' });
        } else {
            res.json({ message: 'Libro eliminado mediante ID' });
        }
    }

    async deleteByIsbn(req, res) {
        const { isbn } = req.params;
        const [result] = await pool.query(`DELETE FROM libros WHERE isbn = ?`, [isbn]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'ISBN Libro no encontrado' });
        } else {
            res.json({ message: 'Libro eliminado mediante ISBN' });
        }
    }

    async update(req, res) {
        const { id_libro } = req.params;
        const { nombre, autor, categoria, fecha_publicacion, isbn } = req.body;

        try {
            const [result] = await pool.query(
                `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, fecha_publicacion = ?, isbn = ? WHERE id_libro = ?`,
                [nombre, autor, categoria, fecha_publicacion, isbn, id_libro]
            );

            if (result.changedRows === 0) {
                res.status(404).json({ message: 'Libro no encontrado o sin cambios' });
            } else {
                res.json({ message: 'Libro actualizado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el libro', error });
        }
    }
}

export const libro = new LibroController();