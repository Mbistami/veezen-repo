import React from "react";
import CollabVeexpert from "../pages/signin/collab_veexpert";
import PhoneNumber from "../pages/signin/phone_number";
import Civility from "../pages/signin/civility";
import Address from "../pages/signin/address";
import Company from "../pages/signin/company";
import Cv from "../pages/signin/veexpert/CV";
import Picture from "../pages/signin/veexpert/picture";
import Certified from "../pages/signin/veexpert/certified";
import Expertise from "../pages/signin/veexpert/expertices";
import Availability from "../pages/signin/veexpert/availability";
import Experience from "../pages/signin/veexpert/experience";
import Language from "../pages/signin/veexpert/language";
import AnswersSaved from "../pages/signin/answers_saved";
import TimeSpent from "../pages/signin/time_spent";
import Diplomas from "../pages/signin/veexpert/diplomas";
import { Signin, Starter } from "../components/signin";

const steps = [
  {
    step: "signin",
    element: <Signin />,
    fields: ["fullName", "email", "password", "userName"],
    order: 0,
  },
  {
    step: "collab_veexpert",
    element: <CollabVeexpert />,
    order: 1,
  },
  {
    step: "starter",
    element: <Starter />,
    order: 2,
  },
  {
    step: "civility",
    element: <Civility />,
    fields: ["gender"],
    order: 3,
  },
  {
    step: "phone",
    element: <PhoneNumber />,
    fields: ["phoneNumber"],
    order: 4,
  },
  {
    step: "address",
    element: <Address />,
    fields: ["street", "city", "country"],
    order: 5,
  },
  {
    step: "company",
    element: <Company />,
    fields: ["company"],
    order: 6,
  },
  {
    step: "cv",
    element: <Cv />,
    fields: ["cv"],
    order: 7,
  },
  {
    step: "picture",
    element: <Picture />,
    fields: ["picture"],
    order: 8,
  },
  {
    step: "certified",
    element: <Certified />,
    fields: ["certifiedCoach"],
    order: 9,
  },
  {
    step: "expertise",
    element: <Expertise />,
    fields: ["expertise"],
    order: 10,
  },
  {
    step: "availability",
    element: <Availability />,
    fields: ["availablity"],
    order: 14,
  },
  {
    step: "lang",
    element: <Language />,
    fields: ["languages"],
    order: 13,
  },
  {
    step: "saved",
    element: <AnswersSaved />,
  },
  {
    step: "experience",
    element: <Experience />,
    fields: ["concreteExperience"],
    order: 12,
  },
  {
    step: "experience_number",
    element: <TimeSpent />,
    fields: ["experienceDuration"],
    order: 15,
  },
  {
    step: "diplomas",
    element: <Diplomas />,
    fields: ["diplomas"],
    order: 11,
  },
];

export default steps;
