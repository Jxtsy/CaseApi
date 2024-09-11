import { Request, Response } from "express"
import { CaseModel } from "../../../data/models/case.model";


export class CaseController {
    public getCases = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json([])
        }
    }


    public createCase = async (req: Request, res: Response) => {
        try {
            const { name, lastname, genre, age, lat, lng } = req.body;
            const newCase = await CaseModel.create({
                name,
                lastname,
                genre,
                age,
                lat,
                lng,
            })
            res.json(newCase);
        } catch (error) {
            res.json({ message: "Error registering the case" })
        }
    }

    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const caseId = await CaseModel.findById(id);
            return res.json(caseId);
        } catch (error) {
            return res.json({ message: "An error occurred while retrieving the ID; it does not exist." })
        }
    }

    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, lastname, genre, age, lat, lng, } = req.body;
            await CaseModel.findByIdAndUpdate(id, {
                name,
                lastname,
                genre,
                age,
                lat,
                lng,
            })

            const updateCase = await CaseModel.findById(id);
            return res.json(updateCase);

        } catch (error) {
            return res.json({ message: "An error occurred while updating the case." })
        }
    }

    public deteleCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleteCase = CaseModel.findByIdAndDelete(id);
            return res.json(deleteCase)
        } catch (error) {
            return res.json({ message: "An error occurred while deleting the case." })
        }
    }

    // public getRecordsFromLastWeek = async (req: Request, res: Response) => {
    //     try {
    //         const today = new Date()
    //         const date = today.toLocaleDateString();

    //         const before = new Date(today);
    //         before.setDate(today.getDate() - 1);

    //         const registros = await CaseModel.find({
    //             creationDate: {
    //                 $gte: before, 
    //                 $lt: today       
    //             }
    //         }); 
    //         return res.json(registros)

    //     } catch (error) {
    //         return res.json({message: "Error retrieving records"})
    //     }
    // }
}

