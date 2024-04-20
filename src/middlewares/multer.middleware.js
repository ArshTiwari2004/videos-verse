// Purpose: Multer middleware for file upload.
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp") //gitkeep file is there in temp folder
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname) // many more functionalities can be there 
    }
  })
  
export const upload = multer({ 
    storage, 
})