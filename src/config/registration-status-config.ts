import { RegistrationStatus } from "@/types";

type RegistrationStatusInfo = {
  label: string;
  value: RegistrationStatus;
  progressValue: number;
};

export const REGISTRATION_STATUS: RegistrationStatusInfo[] = [
  { label: "annulleret", value: "annulleret", progressValue: 0 },
  { label: "afventer", value: "afventer", progressValue: 25 },
  {
    label: "modtaget (afvent bekræftelse)",
    value: "modtaget (afvent bekræftelse)",
    progressValue: 50,
  },
  { label: "bekræftet", value: "bekræftet", progressValue: 100 },
];
