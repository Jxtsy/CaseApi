import { Request, Response } from "express"
import { CaseModel } from "../../../data/models/case.model";


export class CaseController {
    public getCases = async (req: Request, res: Response) =>{
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json([])
        }
    }


    public createCase = async (req: Request, res: Response) => {
        try {
            const {lat, lng, genre, age} = req.body;
            const newCase = await CaseModel.create({
                lat, 
                lng, 
                genre,
                age
            })
            res.json(newCase);
        } catch (error) {
            res.json({ message: "Error registering the case"})
        }
    }

    public getCaseById = async  (req: Request, res: Response )=> {
        try {
            const { id } = req.params;
            const caseId = await CaseModel.findById(id);
            return res.json(caseId);
        } catch (error) {
            return res.json({message: "An error occurred while retrieving the ID; it does not exist."})
        }
    }

    public updateCase = async (req: Request, res: Response) =>{
        try {
            const {id} = req.params;
            const {lat, lng, genre, age} = req.body;
            await CaseModel.findByIdAndUpdate(id, {
                lng,
                lat,
                genre,
                age
            })

            const updateCase = await CaseModel.findById(id);
            return res.json(updateCase);
            
        } catch (error) {
            return res.json({message:"An error occurred while updating the case." })
        }
    }

    public deteleCase = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const deleteCase = CaseModel.findByIdAndDelete(id);
            return res.json(deleteCase)
        } catch (error) {
            return res.json({message: "An error occurred while deleting the case."})
        }
    }
}

