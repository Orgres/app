import {
  IonButton,
  IonList,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFooter,
  useIonAlert,
  useIonToast,
  useIonLoading,
  IonModal
} from "@ionic/react";
import React, { ReactChild, useContext, useState } from "react";
import AddPhoto from "../../../components/AddPhoto/AddPhoto";
import Location, { LatLng } from "../../../components/Location/Location";
import classes from './Meter.module.css';
import { getType } from '../../../API/meter';
import { pointContext } from '../../../context';
import { isPlatform } from '@ionic/react';
import { Photo } from "@capacitor/camera";
import { Input } from "../../../components/input";
import { updateMeter } from '../../../API/meter';
import { ImageNames, Images } from '../../../types/image'
import { FormInputs, ValidationScheme } from "../../../types/meter/indes";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

type Props = {
  showModal: boolean,
  id: string,
  close: () => void
  save: (meter: any) => void
}

const images: Images = {
  meter: { files: [], count: 1, name: "ПУ", errorMessage: "Не добавлены фото ПУ" },
}

const message = 'Не заполнено поле';

const form: {
  inputs: ValidationScheme<FormInputs>, images: Images
} = {
  inputs: {
    latlong: {
      label: "Геолокация",
      value: '',
      readonly: true,
      button: 'geoposition',
      errorMessage: `${message} Геолокация`,
      element: "input",
      required: true
    },
    number: {
      label: "Номер ПУ",
      value: '',
      readonly: true,
      button: 'qrscan',
      errorMessage: `${message} Номер ПУ`,
      element: "input",
      required: true
    },
    serial: {
      label: "Серия ПУ",
      value: '',
      readonly: true,
      errorMessage: `${message} Серия ПУ`,
      element: "input",
      required: true
    },
    type: {
      label: "Тип ПУ",
      value: '',
      readonly: true,
      errorMessage: `${message} Тип ПУ`,
      element: "input",
      required: true
    },
    seal: {
      label: "Номер пломбы",
      value: '',
      errorMessage: `${message} Номер пломбы`,
      element: "input",
      required: true
    },
    verification: {
      label: "Дата поверки",
      value: '',
      errorMessage: `${message} Дата поверки`,
      element: "datepicture",
      type: "date",
      required: true
    }
  },
  images: images
}

const checkValue = (value: string) => value.length === 0 || value === undefined || value === null;

const validateForm = (): string[] => {
  const errors: string[] = [];

  const errorImages = Object.values(form.images).reduce((pr, cr) => {
    if (cr.files.length !== cr.count) {
      pr.push(cr.errorMessage);
    }
    return [...pr]
  }, [] as string[]);

  errors.unshift(...errorImages)

  const inputErrors = Object.values(form.inputs).reduce((pr, cr) => {
    if (cr.required && checkValue(cr.value)) {
      pr.push(cr.errorMessage)
    }
    return [...pr]
  }, [] as string[]);

  errors.unshift(...inputErrors)

  return errors;
}

const UpdateMeter: React.FC<Props> = (props) => {

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

    const images = Object.entries(form.images);
    for (let i = 0; i < images.length; i++) {
      images[i][1].files = [];
    }
    setValue(value + 1);
  }

  const onChangeInput = (value: string, name: string) => {
    form.inputs[name as keyof FormInputs].value = value;
  }

  const setGeoposition = (geoposition: LatLng) => {
    if (form.inputs['latlong']) {
      form.inputs['latlong'].value = `${geoposition.lat}:${geoposition.lng}`
      setValue(value + 1)
    }
  }

  const addImage = (id: ImageNames, index: number, img: Photo) => {
    form.images[id].files.push({ index, file: img });
    setValue(value + 1);
  }

  const removeImage = (id: ImageNames, index: number,) => {
    form.images[id].files = form.images[id].files.filter(img => img.index !== index);
    setValue(value + 1);
  }

  const initMeter = async (number: string, serial: string) => {
    setIsLoader(true);
    const type = await getType(number)
      .catch(() => {
        console.error('could not find type')
      })
      .finally(() => {
        setIsLoader(false);
      });

    if (form.inputs["number"]) {
      form.inputs["number"].value = number
    }

    if (form.inputs["serial"]) {
      form.inputs["serial"].value = serial
    }

    if (form.inputs["type"]) {
      form.inputs["type"].value = type?.type as string
    }

    setValue(value + 1);
  }

  const openScanner = async () => {
    try {
      if (!isPlatform('mobileweb')) {

        const data = await BarcodeScanner.scan();
        let codesArr = data.text.split('#');

        if (codesArr.length === 2) {
          const number = codesArr[0];
          const serial = codesArr[1];
          await initMeter(number, serial)
        };
      }
      else {
        setTimeout(async () => {
          const number = "012455159112591";
          const serial = "0010201120"
          await initMeter(number, serial)
        }, 1000)
      }
    }
    catch (Ex) {
      console.error(Ex)
    }
  };

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

    updateMeter(form, point, props.id)
      .then((res) => {
        clearForm();
        props.save(res);
        props.close();
      }).catch(err => {
        console.log(err)
        alert('Не удалось сохранить ПУ');
      }).finally(() => {
        dismissLoading();
      })

  }

  const Buttons: { [key: string]: ReactChild } = {
    qrscan: (
      <IonButton color="success" slot="end" onClick={openScanner} > Сканировать QR- код</IonButton>
    ),
    geoposition: (
      <Location setGeo={setGeoposition} />
    )
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
          <div className={classes['photos']}>
            {
              Object.entries(form.images).map((image, index) => {
                const Image = [];
                for (let i = 0; i < image[1].count; i++) {
                  Image.push(
                    <AddPhoto
                      key={index + i}
                      id={image[0] as ImageNames}
                      index={i}
                      imageSrc={image[1].files[i]?.file.webPath}
                      name={`${image[1].name}-${i + 1}`}
                      getImage={addImage}
                      removeImage={removeImage} />)
                }
                return Image;
              })
            }

          </div>
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

export default UpdateMeter;
