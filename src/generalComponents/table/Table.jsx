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
    windowHeight,
    minWidth,
    scroll = false,
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

    const usersColumns = [
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
                            filterHandlers.byFullName();
                        }}
                    />
                    &nbsp;&nbsp;{t("users.fullName")}
                </span>
            ),
            dataIndex: 'fullName',
            key: 'fullName',
            width: "13px",
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
                            filterHandlers.byRole();
                        }}
                    />
                    &nbsp;&nbsp;{t("users.role")}
                </span>
            ),
            dataIndex: 'role',
            key: 'role',
            width: "12px",
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
                    &nbsp;&nbsp;{t("users.stations")}
                </span>
            ),
            dataIndex: 'stationsList',
            key: 'stationsList',
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
                            filterHandlers.byPhoneNumber();
                        }}
                    />
                    &nbsp;&nbsp;
                    <img src={process.env.PUBLIC_URL + 'img/phone.svg'} 
                        alt="Phone" 
                        style={{
                            width: "15px",
                        }}
                    />
                </span>
            ),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: "10px",
        },
        {
            title: t("users.action"),
            key: 'operation',
            width: "10px",
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: colors.originalBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                    <BsFillTrashFill style={{ color: colors.cancelBgColor, cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickDeleteButton(record);
                    }} />
                </Space>
            )
        },
    ];

    const transactionsColumns = [
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
            dataIndex: 'yandexTransactionId',
            key: 'yandexTransactionId',
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
                    <img src={process.env.PUBLIC_URL + 'img/sort.svg'} 
                        alt="Sort" 
                        style={{
                            width: "15px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            filterHandlers.byTransactionType();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.transactionType")}
                </span>
            ),
            dataIndex: 'transactionType',
            key: 'transactionType',
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
                            filterHandlers.byTransactionDate();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.transactionDate")}
                </span>
            ),
            dataIndex: 'transactionDate',
            key: 'transactionDate',
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
                            filterHandlers.byStation();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.station")}
                </span>
            ),
            dataIndex: 'stationName',
            key: 'stationName',
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
                            filterHandlers.byTin();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.tin")}
                </span>
            ),
            dataIndex: 'tin',
            key: 'tin',
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
                            filterHandlers.byStationGroup();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.stationGroup")}
                </span>
            ),
            dataIndex: 'stationGroupName',
            key: 'stationGroupName',
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
                            filterHandlers.byFuelType();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.fuelType")}
                </span>
            ),
            dataIndex: 'fuelTypeName',
            key: 'fuelTypeName',
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
                            filterHandlers.byFuelSize();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.fuelVolume")}
                </span>
            ),
            dataIndex: 'fuelSizeCountType',
            key: 'fuelSizeCountType',
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
                            filterHandlers.byAmount();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.transactionAmount")}
                </span>
            ),
            dataIndex: 'amountCurrency',
            key: 'amountCurrency',
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
                            filterHandlers.byTransactionStatus();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.yandexStatus")}
                </span>
            ),
            dataIndex: 'currentTransactionStatus',
            key: 'currentTransactionStatus',
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
                            filterHandlers.byEcrStatus();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.yandexStatus")}
                </span>
            ),
            dataIndex: 'ecrStatus',
            key: 'ecrStatus',
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
                            filterHandlers.byReceiptId();
                        }}
                    />
                    &nbsp;&nbsp;{t("transactions.receiptId")}
                </span>
            ),
            dataIndex: 'receiptId',
            key: 'receiptId',
            width: "11px",
        },
    ]

    let columns = [];

    if (whichTable === "fuelTypes") columns = fuelTypesColumns;
    else if (whichTable === "stationsGroup") columns = stationsGroupColumns;
    else if (whichTable === "stations") columns = stationsColumns;
    else if (whichTable === "stationsGroupFuelPrices") columns = stationsGroupFuelPricesColumns;
    else if (whichTable === "fuelTypesWithPrices") columns = fuelTypesWithPricesColumns;
    else if (whichTable === "dispensers") columns = dispensersColumns;
    else if (whichTable === "users") columns = usersColumns;
    else if (whichTable === "transactions") columns = transactionsColumns;

    return (
        <Table
            columns={columns}            
            dataSource={datas}
            pagination={false}
            size={size}
            sticky={{
                offsetHeader: 64,
            }}
            scroll={scroll && {
                scrollToFirstRowOnChange: true,
                y: (windowHeight < 950) ? 450 : 650,
                x: minWidth
            }}
        />
    );
};
export default TableComponent;