-- CreateTable
CREATE TABLE "Specialties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "specialtiesId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("specialtiesId","doctorId")
);

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtiesId_fkey" FOREIGN KEY ("specialtiesId") REFERENCES "Specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
