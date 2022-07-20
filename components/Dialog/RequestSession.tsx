import React, { useCallback } from "react";
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
import { submitNewRequest } from "../../utils";
import { useUser } from "@hooks/useUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { locationTypes, usersRoles } from "../../utils";
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
  } = useForm({});
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await submitNewRequest(
      {
        ...data,
        locationType: location,
        startDate: new Date(value).toISOString(),
        "@type": "CollectiveOpenEvent",
        meetingInfo: {},
        spheresIds: [],
        attendeeIds: [],
      },
      user,
      `https://api.veezen.com/api/v1/event/crud/create`
    ).then((res) => {
      setIsLoading(false);
      handleClose();
    });
  });
  const handleChange = (e: any) => setLocation(e.target.value);

  const [value, setValue] = React.useState<Date | null>(null);
  const user = useUser();
  const [location, setLocation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ minWidth: "480px" }} className="h-full px-5 py-4 relative">
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
            Request a new session
          </Typography>
          <Typography variant="subtitle1" className="font-primary ">
            Fill the required fields to request a new session.
          </Typography>
        </motion.div>
        <form
          className={`w-full mt-14 flex flex-col gap-3 ${
            isLoading && "blur-sm"
          }`}
          onSubmit={onSubmit}
        >
          <TextField
            size="small"
            label="Subject"
            className="w-full"
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register("name", { required: "Event name is required!" })}
          />
          <div className="flex flex-row gap-2">
            <TextField
              size="small"
              type="number"
              label="Duration (Days)"
              className="w-1/2"
              error={!!errors?.dailyDuration}
              helperText={errors?.dailyDuration?.message}
              {...register("dailyDuration", {
                required: "Duration in days is required!",
              })}
            />
            <TextField
              size="small"
              type="number"
              label="Duration (Hours)"
              className="w-1/2"
              error={!!errors?.duration}
              helperText={errors?.duration?.message}
              {...register("duration", {
                required: "Duration in hours is required!",
              })}
            />
          </div>
          <TextField
            size="small"
            type="number"
            label="Max attendees"
            className="w-full"
            error={!!errors?.maxAttendees}
            helperText={errors?.maxAttendees?.message}
            {...register("maxAttendees", {
              required: "Max attendees is required!",
            })}
          />
          <TextField
            multiline
            className="w-full"
            label="Description"
            size="small"
            {...register("description")}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Starting day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
          <TextField
            value={location}
            onChange={(e) => handleChange(e)}
            size="small"
            label="Location"
            select
          >
            {locationTypes().map((e, i) => (
              <MenuItem key={i} value={e?.value}>
                <Typography className="font-primary">{e.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            <div className={styles.dropzone_inner}>
              <div>
                <Backup fontSize="large" style={{ color: "#a1e3e2" }} />
              </div>
              <div>
                {files.length === 0 ? (
                  <p>
                    <strong style={{ color: "#1cbcba" }}>Choose file</strong> or{" "}
                    <strong>drag here</strong>
                  </p>
                ) : (
                  fileList
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <Button type="submit" color="success" className="mt-11 w-1/2">
              Submit!
            </Button>
            <Button
              color="error"
              onClick={() => handleClose(false)}
              className="mt-11 w-1/2"
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
