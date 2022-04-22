export default function setError(response: string) {
    switch (response) {
        case "ENCODED_FILE_SUCCESSFULLY" :
            return "Your file has been uploaded and encoded successfully.";

        case "WRONG_FILE_TYPE" :
            return "Wrong file type.";

        case "FILE_ALREADY_EXIST" :
            return "Your file is already exist.";

        case "FILE_MISSING" :
            return "You have missing the file to upload."

        default:
            return `Something went wrong. Sorry. Please send email at support@videomenthe.fr`;
    }
}
