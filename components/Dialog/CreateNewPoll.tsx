import React, { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  Select,
  Tooltip,
  CircularProgress,
  IconButton,
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
import { Add, Label, Close } from "@mui/icons-material";
import styles from "../../styles/Dropzone.module.css";

export const CreateNewPoll = ({
  open,
  handleClose,
  onlySucessClose,
}: {
  open: boolean;
  handleClose: any;
  onlySucessClose: boolean;
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
        options,
        description: "",
        username: user?.userName,
      },
      user,
      `https://api.veezen.com/api/v1/survey/poll/create`
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
  const [options, setOptions] = React.useState([]);
  const [newOptionName, setNewOptionName] = React.useState("");
  const handleNewOptions = () => {
    const newOptions = [
      ...options,
      { description: newOptionName, pos: options.length },
    ];
    if (newOptionName.length > 0) setOptions(newOptions);
  };
  const handleOptionRemoval = (index: number) => {
    const newOptions = options.slice(index, 1);
  };
  return (
    <Dialog open={open} onClose={!onlySucessClose ? handleClose : null}>
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
            className="font-primary font-bold "
            sx={{ marginBottom: 0 }}
          >
            Please fix your password!
          </Typography>
          <Typography variant="subtitle1" className="font-primary text-sm">
            Here you can update your password using your old password.
          </Typography>
        </motion.div>
        <form
          className={`w-full mt-7 flex flex-col gap-3 ${
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
            {...register("name", {
              required: "name is required!",
            })}
          />

          <div className="flex flex-row gap-1">
            <TextField
              size="small"
              label="new option name"
              className="w-full"
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
            />
            <div>
              <Tooltip title="Add option">
                <IconButton onClick={handleNewOptions}>
                  <Add />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {options.map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row gap-1 items-center"
                  style={{ maxWidth: "300px" }}
                >
                  <Label sx={{ color: "#0fb29c" }} />
                  <Typography>{e?.description}</Typography>
                  <IconButton onClick={() => handleOptionRemoval(i)}>
                    <Close fontSize="small" />
                  </IconButton>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row ">
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
export default CreateNewPoll;
