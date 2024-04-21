import multer from "multer";
import path from "path";
import fs from "fs";

// cloudinary
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interface/file";

cloudinary.config({
  cloud_name: "dsd56bsyo",
  api_key: "437889334158711",
  api_secret: "DZa3SS4HiE3CQgqorOOru2w038k",
});

// mullter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//
const uploadToColudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path, //file locaiton
      // { public_id: file.originalname }, //file name
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        // error/result handler
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToColudinary,
};
