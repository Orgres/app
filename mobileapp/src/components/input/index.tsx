import { TextFieldTypes } from "@ionic/core";
import { IonItem, IonLabel, IonInput, IonSpinner, IonDatetime, IonTextarea } from "@ionic/react";
import React, { ReactChild, ReactChildren } from "react";

type Props = {
    name: string;
    label: string;
    loading?: boolean;
    value: string;
    readonly?: boolean | undefined;
    onChange?: (value: string, name: string) => void;
    children?: ReactChild | ReactChildren;
    type?: TextFieldTypes,
    placeholder?: string,
    element: "select" | "input" | "textarea" | "datepicture"
}

export const Input: React.FC<Props> = (props: Props) => {

    const renderSwitch = (param: string): JSX.Element | null => {
        switch (param) {
            case 'datepicture':
                return (<IonDatetime
                    displayFormat="DD.MM.YYYY"
                    placeholder={props.placeholder}
                    value={props.value}
                    onIonChange={(event) => {
                        if (props.onChange) props.onChange(event.detail.value as string, props.name)
                    }}
                ></IonDatetime>);
            case 'input':
                return (<IonInput
                    type={props?.type}
                    readonly={props.readonly}
                    placeholder={props.placeholder}
                    onIonChange={(event) => {
                        if (props.onChange) props.onChange(event.detail.value as string, props.name)
                    }}
                    value={props.value} />);
            case 'textarea':
                return (<IonTextarea
                    value={props.value}
                    onIonChange={(event) => {
                        if (props.onChange) props.onChange(event.detail.value as string, props.name)
                    }}>
                </IonTextarea>)
            default:
                return null;
        }
    }

    return (
        <>
            <IonItem>
                <IonLabel position="stacked" >{props.label}</IonLabel>
                {
                    props.loading ? <IonSpinner slot="end" name='dots' />
                        : renderSwitch(props.element)
                }
                <>{props.children}</>
            </IonItem>
        </>)
}
