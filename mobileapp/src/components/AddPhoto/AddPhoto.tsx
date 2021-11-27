import React, { useState } from 'react';
import { IonIcon, } from '@ionic/react';
import { addOutline, remove } from 'ionicons/icons';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import classes from './AddPhoto.module.css';
import { ImageNames } from '../../types/image'

type Props = {
  id: ImageNames;
  index: number;
  name: string;
  imageSrc?: string;
  getImage?: (id: ImageNames, index: number, image: Photo) => void;
  removeImage?: (id: ImageNames, index: number,) => void;
}

const AddPhoto: React.FC<Props> = (props: Props) => {

  const id = props.id;
  const index = props.index;
  const name = props.name;

  const takePicture = () => {
    if (!props.imageSrc) {
      Camera.getPhoto({
        resultType: CameraResultType.Uri
      })
        .then((image) => {

          if (props.getImage) {
            props.getImage(id, index, image)
          }

        }).catch(() => {
          console.error('error take photo')
        });
    }
  };

  const removePicture = () => {
    if (props.removeImage) {
      props.removeImage(id, index);
    }
  };

  return (
    <div>
      {name}
      <div className={classes['AddPhoto']} onClick={() => { takePicture() }}>
        {
          props.imageSrc
            ? <div className={classes['removeIconContainer']}>
              <IonIcon
                icon={remove}
                className={classes['removeIcon']}
                onClick={removePicture}
              />
            </div>
            : null
        }
        {
          props.imageSrc
            ? <img alt="img" src={props.imageSrc} className={classes['image']} />
            : <IonIcon icon={addOutline} style={{
              margin: 'auto',
              width: '50px',
              height: '50px',
            }} />
        }
      </div>
    </div>
  );
};

export default AddPhoto;
