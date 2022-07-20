import React from "react";
import styles from "../styles/Announcement.module.css";
import { Typography, Dialog } from "@mui/material";
import { mergeStyles } from "../utils";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const Announcement = ({ aRef }) => {
  const [open, setOpen] = React.useState(false);
  const initialOptions = {
    "client-id":
      "AVWwwHIJnB7CCMTwDWlgVY7_VQdLjK0du_G1aZD1K0uBUEIRnbDLhBvwoQ7GlviLQv62VRjJCPXfWTwl",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className={styles.aContainer} ref={aRef}>
      <div className={styles.aTitleContainer}>
        <Typography fontSize={45} sx={{ width: 600 }} className={styles.aTitle}>
          WEBINAIRE ZOOM
        </Typography>
      </div>
      <br />
      <div>
        <Typography
          variant="h3"
          color="white"
          textAlign="center"
          paddingTop={5}
        >
          Comment retrouver la sante pendant le mois du Ramadan?
        </Typography>
      </div>
      <br />
      <Typography variant="h4" color="white" textAlign="center" paddingTop={5}>
        Avec le docteur benchekroun Medecin Preventive Nutritionelle
      </Typography>
      <br />
      <div className={styles.aTitleContainer}>
        <Typography sx={{ width: 850 }} fontSize={38} className={styles.aTitle}>
          Mardi 12.04.2022 a 15h (heure marocaine)
        </Typography>
      </div>
      <br />
      <div className={styles.aTitleContainer}>
        <Typography
          sx={{ width: 500 }}
          fontSize={38}
          className={mergeStyles([styles.aTitle, styles.aButton])}
          onClick={() => setOpen(true)}
        >
          Obtenez votre billet
        </Typography>
      </div>
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="#e3e3e3e3"
        paddingTop={1}
        fontStyle="italic"
      >
        Prix du billet 60$
      </Typography>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <div style={{ width: 450, backgroundColor: "white", padding: 15 }}>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Webinary Zoom",
                      amount: {
                        currency: "USD",
                        value: "60",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;

                  window.open(
                    "https://zoom.us/webinar/register/WN_z8mUW88PQHKn0ejWhT6p-Q?fbclid=IwAR2PN3A-_Hvxtvb-J5pexV8bLzPgyDfc2rG2djWkXi-I2ZOrC7-X_rC3bBA",
                    "_self"
                  );
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </Dialog>
    </div>
  );
};
export default Announcement;
