import React, { useCallback } from "react";
import VeezenContainer from "../../../components/VeezenContainer";
import { useDropzone } from "react-dropzone";
import styles from "../../../styles/Dropzone.module.css";
import BackupIcon from "@mui/icons-material/Backup";
import VeeButton from "../../../components/VeeButton";

const Diploma = ({ setCurrentStep, setValue }) => {
  const [files, setFiles] = React.useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      console.log(file?.path);
      setFiles([...acceptedFiles]);

      setValue("diplomas", [...acceptedFiles]);
      reader.onload = () => {
        console.warn(`Loaded file $>${file}`);
      };
    });
  });
  const { getRootProps, getInputProps } = useDropzone({
    noDragEventsBubbling: true,
    onDrop,
  });
  const fileList = files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <VeezenContainer title="Certificates & Diplomas*" navbar="_blank">
      <br />
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <div className={styles.dropzone_inner}>
          <div>
            <BackupIcon fontSize="large" style={{ color: "#a1e3e2" }} />
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
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <VeeButton text="Ok" onClick={() => setCurrentStep("experience")} />
      </div>
    </VeezenContainer>
  );
};
export default Diploma;
