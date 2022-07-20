import React from "react";
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
import { useUser } from "../../hooks/useUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { locationTypes } from "../../utils";

export const VeeDialog = ({
  open,
  handleClose,
  children,
  title,
  subtitle,
}: {
  open: boolean;
  handleClose: any;
  children: any;
  title: string;
  subtitle: string;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await submitNewRequest(
      { ...data, value, locationType: location },
      user
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
          <div className="absolute top-0 left-0 z-10 w-full  h-full">
            <div className="absolute top-0 left-0 min-w-full min-h-full bg-slate-100 opacity-30" />
            <div className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
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
            {title}
          </Typography>
          <Typography variant="subtitle1" className="font-primary ">
            {subtitle}
          </Typography>
        </motion.div>
        {children}
      </div>
    </Dialog>
  );
};
export default VeeDialog;
