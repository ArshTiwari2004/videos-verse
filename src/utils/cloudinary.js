import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) 
    return null
    // Check if the file exists at the specified path
    // if (!fs.existsSync(localFilePath)) {
    //   throw new Error(`File not found at path: ${localFilePath}`);
    // }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    // console.log("file is uploaded to cloudinary", response.url);
    fs.unlinkSync(localFilePath)
    return response;

    // // File has been uploaded successfully, now delete the local file
    // fs.unlinkSync(localFilePath);

    // return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // Handle any errors that occurred during upload or cleanup
    // console.error("Error uploading to Cloudinary:", error.message);

    // // Attempt to delete the local file if it exists
    // if (fs.existsSync(localFilePath)) {
    //   fs.unlinkSync(localFilePath);
    // }

    return null;
  }
}

export { uploadOnCloudinary }


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
