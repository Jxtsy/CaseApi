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
            const deleteCase = await CaseModel.findByIdAndDelete(id);
            return res.json(deleteCase)
        } catch (error) {
            return res.json({ message: "An error occurred while deleting the case." })
        }
    }

    public getCasesFromLastWeek = async (req: Request, res: Response) => {
        try {
            const today = new Date();
            
            const lastWeekStart = new Date();
            lastWeekStart.setDate(today.getDate() - 7);
            
            const startOfLastWeek = new Date(lastWeekStart.setHours(0, 0, 0, 0)); 
            const endOfLastWeek = new Date(today.setHours(23, 59, 59, 999)); 

            const cases = await CaseModel.find({
                creationDate: {
                    $gte: startOfLastWeek,
                    $lte: endOfLastWeek
                }
            });

            return res.json(cases);
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while retrieving cases from last week." });
        }
    }

   
}

