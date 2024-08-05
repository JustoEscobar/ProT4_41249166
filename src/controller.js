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
        const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, fecha_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [nombre, autor, categoria, fecha_publicacion, isbn]);
        res.json({ message: 'Libro insertado', id: result.insertId });
    }

    async delete(req, res) {
        const { id_libro } = req.params;
        const [result] = await pool.query(`DELETE FROM libros WHERE id_libro = ?`, [id_libro]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Libro no encontrado' });
        } else {
            res.json({ message: 'Libro eliminado' });
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