import { colors } from '../../assets/styles/colors';
import { Space, Table } from 'antd';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const TableComponent = ({ 
    whichTable, 
    datas,
    setCurrentData,
    setCurrentDataName,
    onClickHref,
    onClickEditButton,
    onClickDeleteButton,
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
                        setCurrentDataName(text);
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
            width: "17px",
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

    const banksColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Short name',
            width: 14,
            dataIndex: 'short_name',
            key: 'short_name',
        },
        {
            title: 'Name AM',
            width: 14,
            dataIndex: 'name_am',
            key: 'name_am',
        },
        {
            title: 'Name RU',
            width: 14,
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'Name EN',
            width: 14,
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 25,
        },
        {
            title: 'Second email',
            dataIndex: 'secondEmail',
            key: 'secondEmail',
            width: 25,
        },
        {
            title: 'Is active',
            dataIndex: 'is_active',
            key: 'is_active',
            width: 11,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            width: 30,
        },
        {
            title: 'Is owner',
            dataIndex: 'is_owner',
            key: 'is_owner',
            width: 11,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 15,
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickEditButton(record);
                    }} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        setCurrentData(record);
                        onClickDeleteButton(record);
                    }} />
                </Space>
            )
        },
    ]

    const data = [];

    let columns = [];

    if (whichTable === "fuelTypes") columns = fuelTypesColumns;
    else if (whichTable === "stationsGroup") columns = stationsGroupColumns;
    else if (whichTable === "stations") columns = stationsColumns;
    else if (whichTable === "banks") columns = banksColumns;

    return (
        <Table
            columns={columns}            
            dataSource={datas}
            pagination={false}
            size='normal'
            sticky={{
                offsetHeader: 64,
            }}
            
        />
    );
};
export default TableComponent;