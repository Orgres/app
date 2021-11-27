import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonModal } from "@ionic/react";
import React, { useContext, useState } from "react";
import { QueryParams } from "../../types/http";
import { getPoints, Point } from '../../API/points'
import { pointContext } from '../../context';

type Props = {
    guid: string;
    onSelect: (id: number) => void;
    onDismiss: () => void;
}

type FormFields = 'address' | 'account' | 'name'

const form: { [key in FormFields]: {
    label: string;
    value: string;
} } = {
    address: {
        label: 'Адрес',
        value: ''
    },
    account: {
        label: 'Лицевой счет / Номер договора',
        value: ''
    },
    name: {
        label: 'ФИО / Наименование',
        value: ''
    }
}

const Body: React.FC<Props> = (props: Props) => {

    const [points, setPoints] = useState<Point[]>([]);
    const [checked, setChecked] = useState(false);

    const FindParams = localStorage.getItem('find');

    if (FindParams) {
        const values = JSON.parse(FindParams);

        form.account.value = values?.account || '';
        form.address.value = values?.address || '';
        form.name.value = values?.name || '';
    }

    const inputChange = (name: FormFields, value: string) => {
        let newFindParams = { [name]: value };
        const storage = localStorage.getItem('find');

        if (storage) {
            newFindParams = { ...JSON.parse(storage), ...newFindParams }
        }
        localStorage.setItem('find', JSON.stringify(newFindParams));

        form[name].value = value;
    }

    const select = (id: number) => {
        props.onSelect(id)
    }

    const findPoints = () => {
        const params = Object.entries(form).reduce((pr, cr) => {
            if (cr[1].value === undefined || cr[1].value === null || cr[1].value === '') {
                return [...pr];
            }
            pr.push({ key: cr[0], value: cr[1].value });
            return [...pr];
        }, [] as QueryParams[]);

        if (checked) {
            params.push({
                key: 'guid',
                value: props.guid
            })
        }

        getPoints(params).then((points) => {
            setPoints(points);
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Привязка к ТУ
                    </IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={props.onDismiss} color="success">
                            Отмена
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    Object.entries(form).map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel position="floating">
                                {item[1].label}
                            </IonLabel>
                            <IonInput value={item[1].value} onIonChange={event => inputChange(item[0] as FormFields, event.detail.value as string)} clearInput />
                        </IonItem>
                    ))
                }

                <IonItem lines="none">
                    <IonCheckbox color="success" checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                    <IonLabel>Поиск по ТП</IonLabel>
                </IonItem>

                <IonButton className="ion-margin" color="success" expand="block" onClick={findPoints}>Найти</IonButton>

                <IonList>
                    {
                        points.map((point, index) => (
                            <IonItem onClick={() => select(point.id)} key={index}>
                                <IonLabel>
                                    <h3>{point.code}</h3>
                                    <h4>{point.account}</h4>
                                    <p>{point.area}</p>
                                    <p>{point.name}</p>
                                    <p>{point.address}</p>
                                </IonLabel>
                            </IonItem>
                        ))
                    }

                </IonList>

            </IonContent>
        </IonPage>
    )
}

export const Binding: React.FC<{ onSelect: (code: string) => void }> = (props) => {

    const point = useContext(pointContext)?.point;

    const handleSelect = (code: string) => {
        props.onSelect(code);
        dismiss();
    };

    const [present, dismiss] = useIonModal(Body, {
        guid: point?.guid,
        onSelect: handleSelect,
        onDismiss: () => dismiss(),
    });

    return (
        <IonButton
            color="success"
            slot="end"
            onClick={() => {
                present({
                    cssClass: 'my-class',
                });
            }}>
            Привязать к ТУ
        </IonButton>)
}
