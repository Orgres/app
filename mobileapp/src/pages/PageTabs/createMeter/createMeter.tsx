import {
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonFooter,
  useIonAlert,
  useIonToast,
  useIonLoading,
  IonModal
} from "@ionic/react";
import React, { ReactChild, useContext, useState } from "react";
import { pointContext } from '../../../context';
import { Input } from "../../../components/input";
import { createMeter } from '../../../API/meter';
import { Binding } from "../../../components/bindingMeteringPoint";
import { FormInputsUser, Phase, ValidationScheme } from "../../../types/meter/indes";

type Props = {
  showModal: boolean,
  close: () => void,
  save: (meter: any) => void
}


export const phases: { [key in Phase]: string } = {
  '1': '1Ф',
  '1G': '1Ф GSM',
  '3': '3Ф',
  '3G': '3Ф GSM'
}

const message = 'Не заполнено поле';

const form: {
  inputs: ValidationScheme<FormInputsUser>
} = {
  inputs: {
    phase: {
      label: 'Фазность',
      value: '',
      errorMessage: `${message} фазность`,
      element: "select",
      required: true
    },
    binding: {
      label: "Привязка",
      value: '',
      readonly: true,
      button: 'binding',
      errorMessage: `${message} Привязка`,
      element: "input",
      required: true
    },
    note: {
      label: "Заметка",
      value: '',
      element: "textarea",
      errorMessage: '',
    }
  }
}

const checkValue = (value: string) => value.length === 0 || value === undefined || value === null;

const validateForm = (): string[] => {
  const errors: string[] = [];

  const inputErrors = Object.values(form.inputs).reduce((pr, cr) => {
    if (cr.required && checkValue(cr.value)) {
      pr.push(cr.errorMessage)
    }
    return [...pr]
  }, [] as string[]);

  errors.unshift(...inputErrors)

  return errors;
}

const CreateMeter: React.FC<Props> = (props) => {

  const [presentToast, dismiss] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [value, setValue] = useState(0);
  const point = useContext(pointContext)?.point;
  const [present] = useIonAlert();


  const [isLoader, setIsLoader] = useState(false);

  const clearForm = () => {
    const inputs = Object.entries(form.inputs);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i][1].value = '';
    }
    setValue(value + 1);
  }

  const onChangeInput = (value: string, name: string) => {
    form.inputs[name as keyof FormInputsUser].value = value;
  }

  const changePhase = (phase: Phase) => {
    form.inputs.phase.value = phase
  }

  const sendForm = () => {
    const errors = validateForm();

    const message = errors.reduce((pr, cr, index) => {
      if (index === 0) {
        return `${cr}`
      }
      return `${pr},\r\n ${cr}`
    }, "");

    if (message.length > 0) {
      present(message);
      return;
    }

    presentLoading({
      message: 'Loading...'
    });

    createMeter(form, point?.guid as string)
      .then((res) => {
        clearForm();
        props.save(res);
        presentToast('ПУ успешно сохранен', 3000);
      }).catch(err => {
        console.log(err)
        alert('Не удалось сохранить ПУ');
      }).finally(() => {
        dismissLoading();
      })

  }

  const Buttons: { [key: string]: ReactChild } = {
    binding: (<Binding onSelect={(code: string) => {
      form.inputs.binding.value = code;
      setValue(value + 1);
    }} />)
  }

  return (
    <IonModal isOpen={props.showModal} cssClass='my-custom-class'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            *Новый прибор
          </IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={props.close} >
              Закрыть
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
          <IonItem>
            <IonLabel>Фазность</IonLabel>
            <IonSelect onIonChange={e => changePhase(e.detail.value)} value={form.inputs.phase.value} >
              {
                Object.entries(phases).map((phase, index) =>
                  <IonSelectOption key={index} value={phase[0]}>{phase[1]}</IonSelectOption>)
              }
            </IonSelect>
          </IonItem>
          {
            Object.entries(form.inputs)
              .map((item, index) => {
                if (item[1].element === "input" || item[1].element === "textarea" || item[1].element === "datepicture") {
                  return (< Input
                    element={item[1].element}
                    name={item[0]}
                    key={index}
                    label={item[1].label}
                    value={item[1].value}
                    type={item[1].type}
                    readonly={item[1].readonly}
                    onChange={onChangeInput}
                    children={item[1].button ? Buttons[item[1].button] : undefined}
                    loading={item[0] === 'meterType' ? isLoader : false}
                  />)
                }
                return null;
              })
          }
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton color="success" onClick={sendForm} expand="block">
          Сохранить ПУ
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default CreateMeter;
