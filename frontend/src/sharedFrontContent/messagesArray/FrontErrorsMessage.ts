import type { userFrontI } from "../../interfaces/UserInterfaces";

export const errorsMessageObj = {

    required ( field : string ) : string {

        return `The ${field} is required`
    }

}