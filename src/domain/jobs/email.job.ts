import { CaseModel } from "../../data/models/case.model";
import { EmailService } from "../services/email.services"
import cron from 'node-cron'
import { generateCaseEmailTemplate } from "../templates/email.templates";
import { CaseController } from "../../presentation/controllers/cases/controllers";


export const emailJob = ()=>{
    const emailService = new EmailService();
    cron.schedule("*/20 * * * * *", async ()=>{
        try {
            const cases = await CaseModel.find({isEmailSent:false})
            if(!cases.length){
                console.log("There are no new cases registered.")
                return;
            }
            console.log(`Processing ${cases.length} cases`)
            await Promise.all(
                cases.map(async (caseV) => {
                    try {
                        const htmlBody = generateCaseEmailTemplate(
                            caseV.name,
                            caseV.lastname,
                            caseV.genre,
                            caseV.age,
                            caseV.lat,
                            caseV.lng
                        )
                        await emailService.sendEmail({
                            to: "aj8984524@gmail.com",
                            subject: `New Case : ${caseV.name} ${caseV.lastname}`, 
                            htmlBody: htmlBody
                        });
                        console.log(`Email sent for the case with ID: ${caseV._id}`);
                        
                        let updateCase = {
                            name: caseV.name,
                            lastname: caseV.lastname,
                            genre: caseV.genre,
                            age: caseV.age,
                            lat: caseV.lat,
                            lng: caseV.lng,
                            isEmailSent:true
                        }
                        await CaseModel.findByIdAndUpdate(caseV._id, updateCase);
                        console.log(`Case updated for ID: ${caseV._id}`);

                    } catch (error) {
                        console.log("Error processing the case");
                    }
                })
            )
        } catch (error) {
            console.error("Error occurred while sending emails");
        }
    })
}