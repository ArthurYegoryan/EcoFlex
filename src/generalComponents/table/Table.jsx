import React, { useState } from 'react';
import { colors } from '../../assets/styles/colors';
import { Space, Table } from 'antd';
import { BsFillTrashFill, BsFillPencilFill, BsCCircle } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const TableComponent = ({ 
    whichTable, 
    datas,
    setCurrentData,
    onClickEditButton, 
    onClickDeleteButton 
}) => {
    const { t } = useTranslation();

    const fuelTypesColumns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
            width: "10px",
            sorter: {
                compare: (a, b) => a.id - b.id,
            }
        },
        {
            title: t("fuelTypesTable.yandexId"),
            dataIndex: 'yandexFuelTypeId',
            key: 'yandexFuelTypeId',
            width: "20px",
            sorter: (a, b) => a.yandexFuelTypeId.localeCompare(b.yandexFuelTypeId)
        },
        {
            title: t("fuelTypesTable.fuelName"),
            dataIndex: 'name',
            key: 'name',
            width: "20px",
        },
        {
            title: t("fuelTypesTable.adgCode"),
            dataIndex: 'adgCode',
            key: 'adgCode',
            width: "10px",
        },
        {
            title: t("fuelTypesTable.departmentId"),
            dataIndex: 'departmentId',
            key: 'departmentId',
            width: "10px",
        },
        {
            title: t("fuelTypesTable.countType"),
            dataIndex: 'countType',
            key: 'countType',
            width: "10px",
        },
        {
            title: t("fuelTypesTable.action"),
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

    const transactionsColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'RRN',
            width: 10,
            dataIndex: 'rrn',
            key: 'rrn',
        },
        {
            title: 'Terminal ID',
            dataIndex: 'tid',
            key: 'tid',
            width: 10,
        },
        {
            title: 'Merchant ID',
            dataIndex: 'mid',
            key: 'mid',
            width: 10,
        },
        
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 10,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 20,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 10,
        },
        {
            title: 'Trx type',
            dataIndex: 'trx_type',
            key: 'trx_type',
            width: 8,
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 10,
        },
        {
            title: 'Pay sys',
            dataIndex: 'payment_system',
            key: 'payment_system',
            width: 10,
        }
    ];

    const usersColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            width: 20,
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 20,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 35,
        },
        {
            title: 'Is active',
            dataIndex: 'is_active',
            key: 'is_active',
            width: 11,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 20,
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
    // else if (whichTable === "terminals") columns = terminalsColumns;
    else if (whichTable === "transactions") columns = transactionsColumns;
    else if (whichTable === "banks") columns = banksColumns;

    return (
        <Table
            columns={columns}            
            dataSource={datas}
            pagination={false}
            // bordered={true}
            size='normal'
            sticky={{
                offsetHeader: 64,
            }}
            
        />
    );
};
export default TableComponent;