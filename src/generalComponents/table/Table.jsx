import "./Table.css";
import { colors } from '../../assets/styles/colors';
import { Space, Table, Typography } from 'antd';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import React from 'react';
import { useTranslation } from 'react-i18next';

const TableComponent = ({ 
    whichTable,
    size = "normal",
    datas,
    setCurrentData,
    onClickHref,
    onClickEditButton,
    onClickDeleteButton,
    renderHandler,
    filterHandlers,
    fuelTypesfilterHandlers,
    stationsGroupFilterHandlers,
    stationsFilterHandlers,
}) => {
    const { t } = useTranslation();

    const fuelTypesColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            fuelTypesfilterHandlers.byId()
                        }}
                    />
                    &nbsp;&nbsp;ID
                </span>
            ),
            dataIndex: 'number',
            key: 'number',
            width: "10px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            fuelTypesfilterHandlers.byYandexId()
                        }}
                    />
                    &nbsp;&nbsp;{t("fuelTypes.yandexId")}
                </span>
            ),
            dataIndex: 'yandexFuelTypeId',
            key: 'yandexFuelTypeId',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            fuelTypesfilterHandlers.byFuelName()
                        }}
                    />
                    &nbsp;&nbsp;{t("fuelTypes.fuelName")}
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            width: "20px",
        },
        {
            title: t("fuelTypes.adgCode"),
            dataIndex: 'adgCode',
            key: 'adgCode',
            width: "10px",
        },
        {
            title: t("fuelTypes.departmentId"),
            dataIndex: 'departmentId',
            key: 'departmentId',
            width: "10px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            fuelTypesfilterHandlers.byCountType()
                        }}
                    />
                    &nbsp;&nbsp;{t("fuelTypes.countType")}
                </span>
            ),
            dataIndex: 'countType',
            key: 'countType',
            width: "15px",
        },
        {
            title: t("fuelTypes.action"),
            key: 'operation',
            width: "10px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const stationsGroupColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsGroupFilterHandlers.byId()
                        }}
                    />
                    &nbsp;&nbsp;ID
                </span>
            ),
            dataIndex: 'number',
            key: 'number',
            width: "10px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsGroupFilterHandlers.byStationsGroupName();
                        }}
                    />
                    &nbsp;&nbsp;{t("stationsGroup.stationsGroupName")}
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            width: "30px",
            render: (text) => {
                return (
                    <a onClick={() => {
                        // setCurrentDataName(text);
                        onClickHref(text);
                    }}>
                        {text}
                    </a>
                );
            }
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsGroupFilterHandlers.byStationsGroupAddress();
                        }}
                    />
                    &nbsp;&nbsp;{t("stationsGroup.stationsGroupAddress")}
                </span>
            ),
            dataIndex: 'address',
            key: 'address',
            width: "30px",
        },        
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsGroupFilterHandlers.byStationsGroupPhoneNumber();
                        }}
                    />
                    &nbsp;&nbsp;{t("stationsGroup.stationsGroupPhoneNumber")}
                </span>
            ),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: "30px",
        },
        {
            title: t("stationsGroup.action"),
            key: 'operation',
            width: "10px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const stationsColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'}
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byId();
                        }}
                    />
                    &nbsp;&nbsp;ID {process.env.PUBLIC_URL}
                </span>
            ),
            dataIndex: 'number',
            key: 'number',
            width: "8px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byYandexId();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.yandexId")}
                </span>
            ),
            dataIndex: 'yandexStationId',
            key: 'yandexStationId',
            width: "10px",
            ellipsis: true,
            render: (value) => {
                return value.trim() && (
                    <Typography.Text style={{ maxWidth: 80 }} ellipsis copyable>
                        {value.trim()}
                    </Typography.Text>
                )
            }
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byStationName();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationName")}
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byStationAddress();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationAddress")}
                </span>
            ),
            dataIndex: 'address',
            key: 'address',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byStationPhoneNumber();
                        }}
                    />
                    &nbsp;&nbsp;
                    <img src={process.env.PUBLIC_URL + '../img/phone.svg'} 
                        alt="Phone" 
                        style={{
                            width: "20px"
                        }}
                    />
                </span>
            ),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: "11px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            stationsFilterHandlers.byStationTin();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationTin")}
                </span>
            ),
            dataIndex: 'tin',
            key: 'tin',
            width: "10px",
        },
        {
            title: t("stations.fuelTypes"),
            dataIndex: 'fuelTypes',
            key: 'fuelTypes',
            width: "20px",
            render: (values) => {
                return (
                    <>
                        {values.map((value, index) => (
                            <React.Fragment key={index}>
                                <Typography.Text>
                                    {value}
                                </Typography.Text>
                                <br/>
                            </React.Fragment>
                        ))}
                    </>
                );
            }
        },
        {
            title: t("stations.action"),
            key: 'operation',
            width: "10px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const stationsGroupFuelPricesColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'}
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byId();
                        }}
                    />
                    &nbsp;&nbsp;ID {process.env.PUBLIC_URL}
                </span>
            ),
            dataIndex: 'number',
            key: 'number',
            width: "8px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byYandexId();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.yandexId")}
                </span>
            ),
            dataIndex: 'yandexStationId',
            key: 'yandexStationId',
            width: "10px",
            ellipsis: true,
            render: (value) => {
                return value.trim() && (
                    <Typography.Text style={{ maxWidth: 80 }} ellipsis copyable>
                        {value.trim()}
                    </Typography.Text>
                )
            }
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationName();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationName")}
                </span>
            ),
            dataIndex: 'name',
            key: 'name',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationAddress();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationAddress")}
                </span>
            ),
            dataIndex: 'address',
            key: 'address',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationPhoneNumber();
                        }}
                    />
                    &nbsp;&nbsp;
                    <img src={process.env.PUBLIC_URL + '../img/phone.svg'} 
                        alt="Phone" 
                        style={{
                            width: "20px"
                        }}
                    />
                </span>
            ),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: "11px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + '../img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationTin();
                        }}
                    />
                    &nbsp;&nbsp;{t("stations.stationTin")}
                </span>
            ),
            dataIndex: 'tin',
            key: 'tin',
            width: "10px",
        },
        {
            title: t("stations.fuelTypes"),
            dataIndex: 'fuelTypes',
            key: 'fuelTypes',
            width: "30px",
            render: (record) => renderHandler ? renderHandler(record) : null
        },
        {
            title: t("stations.action"),
            key: 'operation',
            width: "10px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const fuelTypesWithPricesColumns = [
        {
            title: 'Fuel name',
            dataIndex: 'name',
            key: 'name',
            width: "15px",
        },
        {
            title: 'Count type',
            dataIndex: 'countType',
            key: 'countType',
            width: "5px",
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: "10px",
        },
    ]

    const dispensersColumns = [
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byId();
                        }}
                    />
                    &nbsp;&nbsp;ID
                </span>
            ),
            dataIndex: 'number',
            key: 'number',
            width: "7px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byYandexDispenserId();
                        }}
                    />
                    &nbsp;&nbsp;{t("dispensers.dispenserId")}
                </span>
            ),
            dataIndex: 'yandexDispenserId',
            key: 'yandexDispenserId',
            width: "18px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.bySerialNumber();
                        }}
                    />
                    &nbsp;&nbsp;{t("dispensers.serialNumber")}
                </span>
            ),
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: "18px",
        },        
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationName();
                        }}
                    />
                    &nbsp;&nbsp;{t("dispensers.stationName")}
                </span>
            ),
            dataIndex: 'stationName',
            key: 'stationName',
            width: "20px",
        },
        {
            title: (
                <span>
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byStationGroupName();
                        }}
                    />
                    &nbsp;&nbsp;{t("dispensers.stationGroupName")}
                </span>
            ),
            dataIndex: 'stationGroupName',
            key: 'stationGroupName',
            width: "23px",
        },
        {
            title: t("dispensers.address"),
            dataIndex: 'address',
            key: 'address',
            width: "30px",
        },
        {
            title: t("dispensers.fuelTypes"),
            dataIndex: 'fuelTypes',
            key: 'fuelTypes',
            width: "22px",
            render: (values) => {
                return (
                    <>
                        {values.map((value, index) => (
                            <React.Fragment key={index}>
                                <Typography.Text>
                                    {value}
                                </Typography.Text>
                                <br/>
                            </React.Fragment>
                        ))}
                    </>
                );
            }
        },
        {
            title: t("stationsGroup.action"),
            key: 'operation',
            width: "13px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                </Space>
            )
        },
    ];

    let columns = [];

    if (whichTable === "fuelTypes") columns = fuelTypesColumns;
    else if (whichTable === "stationsGroup") columns = stationsGroupColumns;
    else if (whichTable === "stations") columns = stationsColumns;
    else if (whichTable === "stationsGroupFuelPrices") columns = stationsGroupFuelPricesColumns;
    else if (whichTable === "fuelTypesWithPrices") columns = fuelTypesWithPricesColumns;
    else if (whichTable === "dispensers") columns = dispensersColumns;

    return (
        <Table
            columns={columns}            
            dataSource={datas}
            pagination={false}
            size={size}
            sticky={{
                offsetHeader: 64,
            }}
        />
    );
};
export default TableComponent;