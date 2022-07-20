import React from "react";
import FormTextField from "../../components/FormItem";
import VeezenContainer from "../../components/VeezenContainer";
import styles from "../../styles/phone_number.module.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Flag from "../../assets/flag.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import { mergeStyles } from "../../utils";
import VeeButton from "../../components/VeeButton";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const Phone_number = ({ setCurrentStep, setValue }) => {
  const router = useRouter();
  const { register } = useForm();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <VeezenContainer title="Phone number*">
      <br />
      <div className={styles.pnContainer}>
        <div className={styles.pnFlagsMenu} onClick={handleClick}>
          <Image
            className={styles.pnFlagIcon}
            src={Flag}
            width={72}
            height={56}
          />
          <div style={{ paddingInline: "7px" }}>
            <KeyboardArrowDownIcon style={{ minWidth: "24px" }} />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <FormTextField
            inputPlaceholder="+212620-123456"
            onChange={(e) => setValue("phoneNumber", e?.target?.value)}
          />
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <div
            className={mergeStyles([styles.pnFlagsMenu, styles.menuContainer])}
          >
            <Image
              className={styles.pnFlagIcon}
              src={Flag}
              width={52}
              height={36}
            />
            <Typography>Morocco</Typography>
          </div>
        </MenuItem>
      </Menu>
      <br />
      <div className="center">
        <VeeButton text="OK" onClick={() => setCurrentStep("address")} />
      </div>
    </VeezenContainer>
  );
};
export default Phone_number;
