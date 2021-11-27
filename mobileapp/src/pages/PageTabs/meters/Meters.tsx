import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonLabel,
    IonIcon,
} from "@ionic/react";
import { checkmarkCircle } from 'ionicons/icons'
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { pointContext } from '../../../context';
import { searchByID, getAllFromTP } from '../../../API/meter';
import { PointPage } from "../../PointPage/Point";
import CreateMeter from "../createMeter/createMeter";
import UpdateMeter from "../updateMeter/updateMeter";
import { getRole } from '../../../API/auth'

const Meters: React.FC = () => {

    const history = useHistory();
    const point = useContext(pointContext)?.point;
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState({ status: false, id: "" });

    const [code, setCode] = useState<string | null>();
    const [meters, setMeters] = useState<any[]>([]);
    const [role, setRole] = useState<string>('');

    useEffect(() => {

        getRole().then((data) => {
            return data.role;
        }).catch(() => {
            return '';
        }).then((role) => {
            setRole(role);
        })
    }, [])

    const searchById = () => {
        searchByID(code as string)
            .then((meters) => {
                setMeters(meters)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const getAll = () => {
        getAllFromTP(point?.guid as string)
            .then((meters) => {
                setMeters(meters)
            }).catch((error) => {
                alert(error)
            });
    }

    const close = () => {
        setShowModalUpdate({ ...showModalUpdate, status: false });
    }

    const updateMeter = (newMeter: any) => {
        const meter = meters.find(meter => meter.id === newMeter.id);

        if (meter) {
            const oldList = meters.filter(meter => meter.id !== newMeter.id);
            const newList = [...oldList];
            newList.unshift(newMeter);
            setMeters(newList);
        }
    }

    const createMeter = (newMeter: any) => {
        const newList = [...meters];
        newList.unshift(newMeter);
        setMeters(newList);
    }

    const Role = role === 'Admin' || role === 'User';

    return (
        <>
            {
                point ?
                    <IonPage>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle onClick={() => { alert(point?.name) }}>
                                    {point?.name}
                                </IonTitle>
                            </IonToolbar>
                            <IonToolbar>
                                <IonButtons slot="start">
                                    {
                                        Role ? <IonButton color="success" onClick={() => setShowModal(true)} >
                                            Добавить
                                        </IonButton> : null
                                    }

                                </IonButtons>
                                <IonButtons slot="end">
                                    <IonButton color="success" onClick={e => { history.push('/point') }} >
                                        Выбрать ТП
                                    </IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>

                            <CreateMeter
                                save={createMeter}
                                showModal={showModal}
                                close={() => setShowModal(false)} />

                            <UpdateMeter
                                save={(meter) => {
                                    updateMeter(meter);
                                }}
                                showModal={showModalUpdate.status}
                                close={close}
                                id={showModalUpdate.id} />

                            <IonItem lines="full">
                                <IonInput type="number" onIonChange={(e) => setCode(e.detail.value)} placeholder="Поиск по номеру" />
                                <IonButton disabled={!code} onClick={searchById} color="success" expand="block">Найти</IonButton>
                            </IonItem>
                            <IonButton onClick={getAll} color="success" expand="block">Показать все</IonButton>
                            <IonList>
                                {
                                    meters.map((meter, index) => (
                                        <IonItem key={index} onClick={() => {
                                            if (!meter?.number) {
                                                setShowModalUpdate({ status: true, id: meter.id })
                                            }
                                        }}>
                                            <IonLabel>
                                                <h1>{meter?.id}</h1>
                                                <h3>{meter?.Point?.address}</h3>
                                                <h4>{meter?.Point?.name}</h4>
                                                {meter?.number ? <p>{meter?.number}/{meter?.serial}/{meter?.seal}</p> : null}
                                                <p>{meter?.Point?.account}</p>
                                            </IonLabel>
                                            {
                                                meter?.number ? <IonIcon color="success" icon={checkmarkCircle}></IonIcon> : null
                                            }
                                        </IonItem>
                                    ))
                                }
                            </IonList>
                        </IonContent>
                    </IonPage> : <PointPage />
            }
        </>
    )
}

export default Meters;
