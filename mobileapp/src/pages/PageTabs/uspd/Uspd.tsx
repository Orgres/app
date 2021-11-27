import {
  IonPage,
  IonHeader,
  IonContent,
  IonText,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton
} from '@ionic/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { pointContext } from '../../../context';
import { PointPage } from '../../PointPage/Point';
import classes from './Uspd.module.css';


const Uspd: React.FC = () => {

  const point = useContext(pointContext)?.point;
  const history = useHistory();

  return (
    <>
      {
        point ? <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle onClick={() => {
                alert(point.name)
              }}>{point?.name}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={e => {
                  history.push('/point')
                }} color="success">
                  Изменить
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className={classes.content}>
              <IonText color="success">
                <h4 >Страница на стадии разработки</h4>
              </IonText>
            </div>
          </IonContent>
        </IonPage> : <PointPage />
      }
    </>

  );
};

export default Uspd;
