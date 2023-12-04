import { Request, Response } from "express";
import { DuplicateUserError } from "../errors/duplicate-user-error";
import app from '../app-factory'

export async function registerUserController(
    req: Request,
    res: Response
) {
    try {
        const id = await app.registerUser(req.body)
        res.status(201).json({ id })
    } catch (e) {
        if (e instanceof DuplicateUserError) {
            res.status(400).json({
                message: 'Could not register user.'
            })
            return
        }
        res.status(500).json({
            message: 'Internal server error.'
        })        
    }
}