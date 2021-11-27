import React, { useContext, useEffect, useState } from 'react';
import {
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonButton
} from '@ionic/react';
import classes from './Account.module.css';
import { authContext } from '../../../context';
import { Profile, getProfile } from '../../../API/user';


export const AccountPage: React.FC = () => {

  const auth = useContext(authContext);

  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setProfile(profile)
      })
      .catch(() => {

      })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Аккаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={classes.avatar} >
          <IonAvatar>
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
        </div>
        <IonItem>
          <IonLabel color="success" position="stacked">Логин</IonLabel>
          <IonInput value={profile?.login}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel color="success" position="stacked">Фамилия</IonLabel>
          <IonInput value={profile?.lastname}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel color="success" position="stacked">Имя</IonLabel>
          <IonInput value={profile?.firstname}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel color="success" position="stacked">Отчетсво</IonLabel>
          <IonInput value={profile?.middlename}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel color="success" position="stacked">Роль</IonLabel>
          <IonInput value={profile?.Role?.name}></IonInput>
        </IonItem>
        <IonButton className="ion-margin" color="danger" expand="block" onClick={() => {
          auth?.signout();
        }}>Выйти</IonButton>
      </IonContent>
    </IonPage>
  )
};
