import React, { useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import {
  IonButton,
  IonIcon,
  useIonModal,
} from "@ionic/react";
import { Geolocation } from '@capacitor/geolocation';
import { Loader } from "@googlemaps/js-api-loader";
import classes from './Location.module.css';
import { navigateOutline } from "ionicons/icons";


export type LatLng = {
  lat: number;
  lng: number;
};

type Props = {
  setGeo: (data: LatLng) => void,
  onDismiss: () => void
};

const Map: React.FC<Props> = (props) => {

  let currentPosition: LatLng;

  const saveGeolocation = () => {
    props.setGeo(currentPosition);
    props.onDismiss();
  };

  let map: google.maps.Map;
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_KEY || '',
    version: "weekly",
  });

  useEffect(() => {

    Geolocation.getCurrentPosition().then((Position) => {
      return {
        status: true,
        position: {
          latitude: Position.coords.latitude,
          longitude: Position.coords.longitude
        }
      }
    }).catch(() => {
      return {
        status: false,
        position: {
          latitude: 0,
          longitude: 0
        }
      }
    }).then((result) => {
      map.setCenter({ lat: result.position.latitude, lng: result.position.longitude })
    });

    loader.load().then(() => {

      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 18,
      });

      currentPosition = { lat: 0, lng: 0 }

      const findMe = document.createElement("div")
      const staticElement = ReactDOMServer.renderToStaticMarkup(
        <IonButton color="warning">
          <IonIcon icon={navigateOutline} />
        </IonButton>
      )
      findMe.innerHTML = staticElement;
      findMe.onclick = () => {
        Geolocation.getCurrentPosition().then((result) => {
          currentPosition = { lat: result.coords.latitude, lng: result.coords.longitude }
          map.setCenter(currentPosition);
          marker.setPosition(currentPosition);
        });
      }

      const savelocation = document.createElement("div")
      const staticElement1 = ReactDOMServer.renderToStaticMarkup(
        <IonButton color="success">
          Сохранить
        </IonButton>
      )
      savelocation.innerHTML = staticElement1;
      savelocation.onclick = () => {
        saveGeolocation();
      }

      const output2 = document.createElement("div")
      output2.style.display = "flex"
      output2.style.marginBottom = "20px"
      output2.appendChild(findMe)
      output2.appendChild(savelocation)


      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(output2);

      map.addListener("click", (e: any) => {
        placeMarkerAndPanTo(e.latLng, map);
      });

      //Marker
      const marker = new google.maps.Marker({
        position: {
          lat: 0,
          lng: 0,
        },
        map: map,
        draggable: true,
        title: "Marker",
      });

      marker.setMap(map);

      const placeMarkerAndPanTo = (latLng: google.maps.LatLng, map: google.maps.Map): void => {
        marker.setPosition(latLng);
        map.panTo(latLng);
        currentPosition = {
          lat: latLng.lat(),
          lng: latLng.lng(),
        };
      };

      marker.addListener("mouseup", (e: any) => {
        currentPosition = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
      });
    });

  }, []);

  return (<div id="map" className={classes['mapContainer']}>   </div>);
};

const Location: React.FC<{ setGeo: (geoposition: LatLng) => void }> = (props: { setGeo: (geoposition: LatLng) => void }) => {

  const handleDismiss = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(Map, {
    setGeo: props.setGeo,
    onDismiss: handleDismiss,
  });

  return (
    <>
      <IonButton
        color="success"
        slot="end"
        onClick={() => {
          present({
            cssClass: "my-class",
          });
        }}
      >
        Геолокация
      </IonButton>
    </>
  );
};

export default Location;
