import { Specialties } from "@prisma/client";
import { IFile } from "../../interface/file";
import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (req: Request): Promise<Specialties> => {
  const file = req.file as IFile;

  if (file) {
    const uploadIcon = await fileUploader.uploadToColudinary(file);
    req.body.icon = uploadIcon?.secure_url;
  }
  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};

const getAllFromDB = async () => {
  return await prisma.specialties.findMany();
};

const deleteFromDB = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};
export const SpecialtiesService = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};
