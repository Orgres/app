import { TextFieldTypes } from "@ionic/core";

export type MeterType = {
    id: string,
    type: string
}

export type MeterData = {
    firstCode: string;
    secondCode: string;
    meterType: string;
    seal: string;
    phase: string;
    images: [];
}

export type Phase = "1" | "1G" | "3" | "3G";

export interface FormInputs {
    latlong: string;
    number: string;
    serial: string;
    type: string;
    seal: string;
    verification: string;
}

export interface FormInputsUser {
    phase: string;
    binding: string;
    note: string;
}

export type ValidationScheme<T> = {
    [K in keyof T]: {
        label: string;
        value: T[K];
        readonly?: boolean | undefined;
        button?: string,
        errorMessage: string
        element: "select" | "input" | "textarea" | "datepicture"
        type?: TextFieldTypes;
        required?: boolean;
    }
}
