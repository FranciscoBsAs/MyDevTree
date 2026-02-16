export const errorsMessageObj = {

    required ( field : string ) : string {

        return `The ${field} is required`
    },

    format: 'Email format is invalid',

    notTheSamePassword: "The password are not the same" ,

    invalidedFormatURL: "Unknown or incorrectly formatted URL"

}