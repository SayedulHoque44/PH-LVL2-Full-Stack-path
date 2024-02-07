import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
//
cloudinary.config({
  cloud_name: "dsd56bsyo",
  api_key: "437889334158711",
  api_secret: "DZa3SS4HiE3CQgqorOOru2w038k",
});

//
export const sendImageToCloudinary = async (
  imageName: string,
  filePath: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject("faild to uplode image");
          fs.unlink(filePath, err => {
            if (err) {
              console.log(err);
            } else {
              console.log("file is deleted");
            }
          });
        }
        resolve(result?.secure_url as string);
        // resolve(result as UploadApiResponse ); --> type solved
        // delete a file asynchronously
        fs.unlink(filePath, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("file is deleted");
          }
        });
      },
    );
  });
};

//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
