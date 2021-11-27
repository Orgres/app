import React, { useContext, useState } from "react";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import classes from "./Login.module.css";
import { userAuth, Auth } from '../../API/auth';
import { authContext } from '../../context'
type InputText = string;

export const Login = () => {

    const [login, setLogin] = useState<InputText>('');
    const [password, setPassword] = useState<InputText>('');

    const auth = useContext(authContext);

    const inLogin = () => {
        userAuth(login, password).then((data: Auth) => {
            auth?.signin(data.token);

        }).catch((error) => {
            alert('Не удалось авторизоваться проверьте логин и пароль')
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Авторизация</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={classes.main}>
                    <form>
                        <IonItem>
                            <IonLabel position="stacked" color="success">Логин</IonLabel>
                            <IonInput onIonChange={(event) => {
                                setLogin(event.detail?.value || '')
                            }} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked" color="success">Пароль</IonLabel>
                            <IonInput onIonChange={(event) => {
                                setPassword(event.detail?.value || '')
                            }} autocomplete="off" type="password"></IonInput>
                        </IonItem>
                    </form>
                    <IonButton onClick={inLogin} className="ion-margin" color="success" expand="block">Авторизоваться</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}
