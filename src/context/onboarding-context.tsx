"use client";

import { createContext, useContext, useState } from "react";

interface IOnboardingContextData {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  doctorProfileId: string;
  setDoctorProfileId: (value: string) => void;
}

const initialData: IOnboardingContextData = {
  trackingNumber: "",
  setTrackingNumber: () => {},
  doctorProfileId: "",
  setDoctorProfileId: () => {},
};

const OnboardingContext = createContext<IOnboardingContextData>(initialData);

export function OnboardingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [doctorProfileId, setDoctorProfileId] = useState("");

  const contextValues: IOnboardingContextData = {
    trackingNumber,
    setTrackingNumber,
    doctorProfileId,
    setDoctorProfileId,
  };

  return (
    <OnboardingContext.Provider value={contextValues}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  return useContext(OnboardingContext);
}
