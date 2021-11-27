import React, {useEffect, useRef, useState} from "react";
import "semantic-ui-react";
import "./PointPage.css";
import { Header, Form, Button, Select, Dropdown } from "semantic-ui-react";
import {
    getAreas,
    getFeeders,
    getSubstations,
    getTransformers
} from '../../API/structure';


const PointPage = () => {

    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState(0);

    const [substations, setSubstations] = useState([]);
    const [subsId, setSubsId] = useState(0);

    const [feeders, setFeeders] = useState([]);
    const [feederId, setFeederId] = useState(0);

    const [transformers, setTransformers] = useState([]);
    const [transformerId, setTransformerId] = useState(0);

    const setPoint = () => {
        const area = areas.find(area => area.id === areaId)?.name;
        const substation = substations.find(substation => substation.id === subsId)?.name;
        const feeder = feeders.find(feeder => feeder.id === feederId)?.name;
        const transformer = transformers.find(transformer => transformer.id === transformerId);

        point?.setPoint({
            name: `${area}/${substation}/${feeder}/${transformer?.name}`,
            guid: `${transformer?.guid}`
        })
    }

    useEffect(() => {
        getAreas()
            .then(areas => {
                setAreas(areas);
                console.log(areas)
            })
    }, []);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prev = usePrevious({ areaId, subsId, feederId });

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

    const selections = [
        {
            value: areaId,
            placeholder: 'Выберите РЭС',
            label: 'РЭС',
            onChange: (event, data) => setAreaId(data.value),
            options: areas?.map((area) => ({key: area.id, text: area.name, value: area.id })),
        },
        {
            value: subsId,
            placeholder: 'Выберите Подстанцию',
            label: 'Подстанция',
            onChange: event => setSubsId(event.target.value),
            options: substations?.map((substation) => ({key: substation.id, text: substation.name, value: substation.id })),
        },
        {
            value: feederId,
            placeholder: 'Выберите Фидер',
            label: 'Фидер',
            onChange: event => setAreaId(event.target.value),
            options: feeders?.map((feeder) => ({key: feeder.id, text: feeder.name, value: feeder.id })),
        },
        {
            value: transformerId,
            placeholder: 'Выберите ТП',
            label: 'ТП',
            onChange: event => setAreaId(event.target.value),
            options: transformers?.map((transformer) => ({key: transformer.id, text: transformer.name, value: transformer.id })),
        }
    ];

    const validate = areaId > 0 && subsId > 0 && feederId > 0 && transformerId > 0;

    return (
        <div className="PointPage container">
            <Header as="h2"> Сетевой путь </Header>
            <Form className="PointPage-form" >
                {
                    selections.map((control, index) => {
                        return (
                            <Dropdown
                                selection
                                className='PointPage-select'
                                key={index}
                                value={control.value}
                                label={control.label}
                                placeholder={control.placeholder}
                                options={control.options}
                                onChange={control.onChange}
                            />
                        )
                    })
                }
                <Form.Field disabled={!validate} control={Button} >Выбрать</Form.Field>
            </Form>
        </div>
    );
};

export default PointPage;
