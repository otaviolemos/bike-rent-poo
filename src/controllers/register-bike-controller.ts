import { Request, Response } from "express";
import app from '../app-factory'
import { Bike } from "../bike";

export async function registerBikeController(
    req: Request,
    res: Response
) {
    try {
        const { 
            name, type, bodySize, maxLoad, rate, description, ratings, imageUrls
        } = req.body;
        const bikeToBePersisted = new Bike(
            name, type, bodySize, maxLoad, rate, description, ratings, imageUrls
        )
        const id = await app.registerBike(bikeToBePersisted)
        res.status(201).json({ id })
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}

export default registerBikeController