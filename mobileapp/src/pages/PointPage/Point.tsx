import React, { useContext, useEffect, useRef, useState } from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import { pointContext } from "../../context";
import {
    Area,
    Substation,
    Feeder,
    Transformer,
    getAreas,
    getSubstations,
    getFeeders,
    getTransformers
} from '../../API/structure'
import { useHistory } from "react-router";

export const PointPage = () => {

    const history = useHistory();

    const point = useContext(pointContext);

    const [areas, setAreas] = useState<Area[]>([]);
    const [areaId, setAreaId] = useState<number>(0);

    const [substations, setSubstations] = useState<Substation[]>([]);
    const [subsId, setSubsId] = useState<number>(0);

    const [feeders, setFeeders] = useState<Feeder[]>([]);
    const [feederId, setFeederId] = useState<number>(0);

    const [transformers, setTransformers] = useState<Transformer[]>([]);
    const [transformerId, setTransformerId] = useState<number>(0);

    const setPoint = () => {
        const area = areas.find(area => area.id === areaId)?.name;
        const substation = substations.find(substation => substation.id === subsId)?.name;
        const feeder = feeders.find(feeder => feeder.id === feederId)?.name;
        const transformer = transformers.find(transformer => transformer.id === transformerId);

        point?.setPoint({
            name: `${area}/${substation}/${feeder}/${transformer?.name}`,
            guid: `${transformer?.guid}`
        })

        history.goBack();
    }

    function usePrevious(value: any): any {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prev = usePrevious({ areaId, subsId, feederId });

    useEffect(() => {
        getAreas()
            .then(areas => {
                setAreas(areas);
            })
    }, []);

    useEffect(() => {
        if (areaId > 0 && areaId !== prev.areaId) {
            getSubstations(areaId).then((subs) => {
                setSubstations(subs);
                setSubsId(subs[0].id);
            })
        }
        if (subsId > 0 && subsId !== prev.subsId) {
            getFeeders(subsId).then((feeders) => {
                setFeeders(feeders);
                setFeederId(feeders[0].id);
            })
        }
        if (feederId > 0 && feederId !== prev.feederId) {
            getTransformers(feederId).then((transformers) => {
                setTransformers(transformers);
                setTransformerId(transformers[0].id);
            })
        }
    });

    const validate = areaId > 0 && subsId > 0 && feederId > 0 && transformerId > 0;


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Сетевой путь</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel color="success" position="stacked">РЭС</IonLabel>
                    <IonSelect value={areaId} placeholder="Выберите РЭС" onIonChange={e => setAreaId(e.detail.value)}>
                        {
                            areas?.map((area) => <IonSelectOption key={area.id} value={area.id}>{area.name}</IonSelectOption>)
                        }
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel color="success" position="stacked">Подстанция</IonLabel>
                    <IonSelect value={subsId} placeholder="Выберите Подстанцию" onIonChange={e => setSubsId(e.detail.value)}>
                        {
                            substations?.map((substation) => <IonSelectOption key={substation.id} value={substation.id}>{substation.name}</IonSelectOption>)
                        }
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel color="success" position="stacked">Фидер</IonLabel>
                    <IonSelect value={feederId} placeholder="Выберите Фидер" onIonChange={e => setFeederId(e.detail.value)}>
                        {
                            feeders?.map((feeder) => <IonSelectOption key={feeder.id} value={feeder.id}>{feeder.name}</IonSelectOption>)
                        }
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel color="success" position="stacked">ТП</IonLabel>
                    <IonSelect value={transformerId} placeholder="Выберите ТП" onIonChange={e => setTransformerId(e.detail.value)}>
                        {
                            transformers?.map((transformer) => <IonSelectOption key={transformer.id} value={transformer.id}>{transformer.name}</IonSelectOption>)
                        }
                    </IonSelect>
                </IonItem>
                <IonButton disabled={!validate} onClick={setPoint} className="ion-margin" color="success" expand="block">Выбрать</IonButton>
            </IonContent>
        </IonPage>
    )
}
