import {
  IonLabel,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
const Segment: React.FC<{segmentValue:string}> = (props) => {
  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonSegment value="ТУ" >
          <IonSegmentButton value={ props.segmentValue }>
            <IonLabel>ТУ</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={ props.segmentValue }>
            <IonLabel>Абонент</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
  );
};

export default Segment;