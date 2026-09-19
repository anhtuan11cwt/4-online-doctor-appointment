"use client";

import { createContext, useContext, useState } from "react";
import type {
  AdditionalInfoSchema,
  BioDataSchema,
  ContactInfoSchema,
  EducationSchema,
  PracticeInfoSchema,
  ProfileInfoSchema,
} from "@/lib/validations";

interface IOnboardingContextData {
  additionalData: AdditionalInfoSchema;

  bioData: BioDataSchema;
  contactData: ContactInfoSchema;
  doctorProfileId: string;
  educationData: EducationSchema;
  practiceData: PracticeInfoSchema;
  profileData: ProfileInfoSchema;

  savedDBData: Record<string, unknown>;
  setAdditionalData: (data: AdditionalInfoSchema) => void;
  setBioData: (data: BioDataSchema) => void;
  setContactData: (data: ContactInfoSchema) => void;
  setDoctorProfileId: (value: string) => void;
  setEducationData: (data: EducationSchema) => void;
  setPracticeData: (data: PracticeInfoSchema) => void;
  setProfileData: (data: ProfileInfoSchema) => void;
  setSavedDBData: (data: Record<string, unknown>) => void;
  setTrackingNumber: (value: string) => void;
  trackingNumber: string;
}

const initialBioData = {
  address: "",
  email: "",
  fullName: "",
  gender: undefined as "male" | "female" | undefined,
  phone: "",
} as BioDataSchema;

const initialProfileData: ProfileInfoSchema = {
  bio: "",
  medicalLicense: "",
};

const initialContactData: ContactInfoSchema = {
  city: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  ward: "",
};

const initialEducationData = {
  additionalCourses: [] as string[],
  degree: "",
  graduationYear: undefined as unknown as number,
  university: "",
} as EducationSchema;

const initialPracticeData = {
  hospitalAddress: "",
  hospitalContactNumber: "",
  hospitalEmailAddress: "",
  hospitalName: "",
  hospitalWebsite: "",
  hoursOfOperation: "",
  insuranceAccepted: undefined as "yes" | "no" | undefined,
  languagesSpoken: [] as string[],
  servicesOffered: [] as string[],
} as PracticeInfoSchema;

const initialAdditionalData = {
  accomplishments: "",
  additionalDocs: [] as unknown[],
  educationHistory: "",
  publishedWork: "",
} as AdditionalInfoSchema;

const initialData: IOnboardingContextData = {
  additionalData: initialAdditionalData,

  bioData: initialBioData,
  contactData: initialContactData,
  doctorProfileId: "",
  educationData: initialEducationData,
  practiceData: initialPracticeData,
  profileData: initialProfileData,

  savedDBData: {},
  setAdditionalData: () => {},
  setBioData: () => {},
  setContactData: () => {},
  setDoctorProfileId: () => {},
  setEducationData: () => {},
  setPracticeData: () => {},
  setProfileData: () => {},
  setSavedDBData: () => {},
  setTrackingNumber: () => {},
  trackingNumber: "",
};

const OnboardingContext = createContext<IOnboardingContextData>(initialData);

export function OnboardingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [doctorProfileId, setDoctorProfileId] = useState("");

  const [bioData, setBioData] = useState<BioDataSchema>(initialBioData);
  const [profileData, setProfileData] =
    useState<ProfileInfoSchema>(initialProfileData);
  const [contactData, setContactData] =
    useState<ContactInfoSchema>(initialContactData);
  const [educationData, setEducationData] =
    useState<EducationSchema>(initialEducationData);
  const [practiceData, setPracticeData] =
    useState<PracticeInfoSchema>(initialPracticeData);
  const [additionalData, setAdditionalData] = useState<AdditionalInfoSchema>(
    initialAdditionalData,
  );

  const [savedDBData, setSavedDBData] = useState<Record<string, unknown>>({});

  const contextValues: IOnboardingContextData = {
    additionalData,

    bioData,
    contactData,
    doctorProfileId,
    educationData,
    practiceData,
    profileData,

    savedDBData,
    setAdditionalData,
    setBioData,
    setContactData,
    setDoctorProfileId,
    setEducationData,
    setPracticeData,
    setProfileData,
    setSavedDBData,
    setTrackingNumber,
    trackingNumber,
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
