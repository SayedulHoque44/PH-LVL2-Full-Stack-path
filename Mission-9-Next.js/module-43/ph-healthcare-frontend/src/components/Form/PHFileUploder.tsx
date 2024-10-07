import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Input, Stack, Typography } from "@mui/material";
import Image from "next/image";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function PHFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // console.log(value);
        return (
          <>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {label || "Upload file"}
              <Input
                {...field}
                type={name}
                value={value?.fileName}
                onChange={(e) =>
                  onChange((e?.target as HTMLInputElement).files?.[0])
                }
                style={{ display: "none" }}
              />
            </Button>
            {value && (
              <Box p={1} border={1} borderColor={"lightgray"} my={1}>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Image
                    src={URL.createObjectURL(value)}
                    height={50}
                    width={50}
                    alt="specilty"
                  />
                  <Typography component={"h2"} fontSize={12} fontWeight={700}>
                    {value.name}
                  </Typography>
                </Stack>
              </Box>
            )}
          </>
        );
      }}
    />
  );
}
