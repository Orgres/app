import React, { useContext } from 'react';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import Meters from './PageTabs/meters/Meters';
import Uspd from './PageTabs/uspd/Uspd';
import { AccountPage } from './PageTabs/account/Account';
import { person, calculator, serverOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../context';
import { Login } from './LoginPage/Login';
import { PointPage } from './PointPage/Point';

const PageTU: React.FC = () => {

  const auth = useContext(authContext);

  return (
    <>
      {
        auth?.auth ?
          <IonTabs >
            <IonRouterOutlet>
              <Route path="/meter">
                <Meters />
              </Route>
              <Route path="/uspd">
                <Uspd />
              </Route>
              <Route path="/account">
                <AccountPage />
              </Route>
              <Route path="/point">
                <PointPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/meter" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="meter" href="/meter">
                <IonIcon icon={calculator} />
                <IonLabel>Точка учета</IonLabel>
              </IonTabButton>
              <IonTabButton tab="uspd" href="/uspd">
                <IonIcon icon={serverOutline} />
                <IonLabel>УСПД</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon icon={person} />
                <IonLabel>Профиль</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          : <Login />
      }
    </>
  );
};

export default PageTU;
