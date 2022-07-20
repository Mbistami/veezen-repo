import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  submitNewRequest,
  usersRoles,
  uploadFilesArray,
  genders,
} from "../../utils";
import { useUser } from "@hooks/useUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { locationTypes } from "../../utils";
import { useDropzone } from "react-dropzone";
import VeeButton from "../VeeButton";
import { Backup } from "@mui/icons-material";
import styles from "../../styles/Dropzone.module.css";

export const RequestSession = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) => {
  const [files, setFiles] = React.useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      setFiles([...acceptedFiles]);

      reader.onload = () => {
        console.warn(`Loaded file $>${file}`);
      };
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    noDragEventsBubbling: true,
    onDrop,
  });
  const fileList = files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({});
  const onSubmit = handleSubmit(async (data) => {
    // setIsLoading(true);
    const urls = await uploadFilesArray(files);
    if (urls[0])
      await submitNewRequest(
        {
          ...data,
          "@type": "Employee",
          roles: [role],
          avatar: urls[0],
          gender,
        },
        user,
        `https://api.veezen.com/api/v1/account/auth/admin/register`
      ).then((res) => {
        setIsLoading(false);
        handleClose();
      });
  });
  const handleChange = (e: any) => setRole(e.target.value);

  const [value, setValue] = React.useState<Date | null>(null);
  const user = useUser();
  const [role, setRole] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ minWidth: "480px" }} className="h-full px-8 py-7 relative">
        {isLoading && (
          <div className="absolute w-full h-full top-0 left-0  z-10">
            <div className="min-w-full min-h-full absolute top-0 left-0 bg-slate-100 opacity-30" />
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-40">
              <CircularProgress className="z-50" />
            </div>
          </div>
        )}
        <motion.div className={isLoading && `blur-sm`}>
          <Typography
            variant="h4"
            className="font-primary font-bold"
            sx={{ marginBottom: 0 }}
          >
            Create a new employee
          </Typography>
          <Typography variant="subtitle1" className="font-primary ">
            Here you can create new employees on your company.
          </Typography>
        </motion.div>
        <form
          className={`w-full mt-5 flex flex-col gap-4 ${
            isLoading && "blur-sm"
          }`}
          onSubmit={onSubmit}
        >
          <div className="flex flex-row gap-2">
            <TextField
              size="small"
              type="text"
              label="First name"
              onChange={(e) => {
                setFname(e?.target.value);
              }}
              className="w-1/2"
              error={!!errors?.dailyDuration}
              helperText={errors?.dailyDuration?.message}
              {...register("firstName", {
                required: "Duration in days is required!",
              })}
            />
            <TextField
              size="small"
              type="text"
              label="Last name"
              onChange={(e) => setLname(e?.target.value)}
              className="w-1/2"
              error={!!errors?.duration}
              helperText={errors?.duration?.message}
              {...register("lastName", {
                required: "Duration in hours is required!",
              })}
            />
          </div>
          <div>
            <TextField
              size="small"
              label={"Username"}
              className="w-full"
              // label={fName + lName}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              {...register("userName", { required: "Event name is required!" })}
            />
          </div>
          <TextField
            size="small"
            type="text"
            label="Phone number"
            className="w-full"
            error={!!errors?.maxAttendees}
            helperText={errors?.maxAttendees?.message}
            {...register("phoneNumber", {
              required: "Max attendees is required!",
            })}
          />
          <div className="flex flex-row gap-2">
            <TextField
              size="small"
              type="text"
              label="City"
              className="w-1/2"
              error={!!errors?.dailyDuration}
              helperText={errors?.dailyDuration?.message}
              {...register("city", {
                required: "Duration in days is required!",
              })}
            />
            <TextField
              size="small"
              type="text"
              label="Country"
              className="w-1/2"
              error={!!errors?.duration}
              helperText={errors?.duration?.message}
              {...register("country", {
                required: "Duration in hours is required!",
              })}
            />
          </div>
          <TextField
            size="small"
            type="text"
            label="Street"
            className="w-full"
            error={!!errors?.maxAttendees}
            helperText={errors?.maxAttendees?.message}
            {...register("street", {
              required: "Max attendees is required!",
            })}
          />
          <TextField
            size="small"
            type="text"
            label="Function"
            className="w-full"
            error={!!errors?.maxAttendees}
            helperText={errors?.maxAttendees?.message}
            {...register("function", {
              required: "Max attendees is required!",
            })}
          />
          <div
            {...getRootProps({ className: styles.dropzone })}
            style={{ height: "100px" }}
          >
            <input {...getInputProps()} />
            <div className={styles.dropzone_inner}>
              <div>
                <Backup fontSize="large" style={{ color: "#a1e3e2" }} />
              </div>
              <div>
                {files.length === 0 ? (
                  <p>
                    <strong style={{ color: "#1cbcba" }}>Profile image</strong>{" "}
                    or <strong>drag here</strong>
                  </p>
                ) : (
                  fileList
                )}
              </div>
            </div>
          </div>
          <TextField
            value={role}
            onChange={(e) => handleChange(e)}
            size="small"
            label="Role"
            select
          >
            {usersRoles().map((e, i) => (
              <MenuItem key={i} value={e?.value}>
                <Typography className="font-primary">{e.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={gender}
            onChange={(e: any) => setGender(e?.target?.value)}
            size="small"
            label="Gender"
            select
          >
            {genders().map((e, i) => (
              <MenuItem key={i} value={e?.value}>
                <Typography className="font-primary">{e.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <div className="flex flex-row mt-7">
            <Button type="submit" color="success" className=" w-1/2">
              Submit!
            </Button>
            <Button
              color="error"
              onClick={() => handleClose(false)}
              className=" w-1/2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
export default RequestSession;
