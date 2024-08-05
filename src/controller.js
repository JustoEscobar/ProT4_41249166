// import { Request, Response } from "express";
import { pool } from "./database.js";

class LibroController{

    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req,res){
        const libro = req.body;
        const [result] = await pool.query('INSERT INTO libros()')
    }

}

export const libro = new LibroController();
