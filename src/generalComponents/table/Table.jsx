import React, { useState } from 'react';
import { Space, Table } from 'antd';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

const TableComponent = ({ 
    whichTable, 
    datas,
    setCurrentData,
    banks,
    onClickEditButton, 
    onClickDeleteButton 
}) => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");

    const terminalsColumns = [
        {
            title: 'ID',
            width: 10,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Terminal ID',
            width: 14,
            dataIndex: 'tid',
            key: 'tid',
        },
        {
            title: 'Merchant ID',
            dataIndex: 'mid',
            key: 'mid',
            width: 14,
        },
        {
            title: 'S/N',
            dataIndex: 'serial',
            key: 'serial',
            width: 14,
        },
        {
            title: 'MCC',
            dataIndex: 'mcc',
            key: 'mcc',
            width: 10,
        },
        {
            title: 'Is Active',
            dataIndex: 'active',
            key: 'active',
            width: 11,
        },
        {
            title: 'POS type',
            dataIndex: 'pos_type',
            key: 'pos_type',
            width: 16,
        },
        {
            title: 'Merchant name',
            dataIndex: 'merchant_name_in_am',
            key: 'merchant_name_in_am',
            width: 25,
        },
        {
            title: 'Merchant TAX number',
            dataIndex: 'merchant_tax_number',
            key: 'merchant_tax_number',
            width: 15,
        },
        {
            title: 'Merchant city',
            dataIndex: 'merchant_city_in_am',
            key: 'merchant_city_in_am',
            width: 13,
        },
        {
            title: 'Merchant address',
            dataIndex: 'merchant_address_in_am',
            key: 'merchant_address_in_am',
            width: 25,
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
            width: 13,
        },
        {
            title: 'Action',
            key: 'operation',
            width: 10,
            render: (record) => (
                <Space size="middle">
                    <BsFillPencilFill style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        (role === "admin" || role === "bank") && onClickEditButton(record);
                    }} />
                    <BsFillTrashFill style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        (role === "admin" || role === "bank") && onClickDeleteButton(record);
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

    if (whichTable === "users") {
        columns = usersColumns;

        for (let i = 0; i < datas.length; i++) {
            data.push({
                id: datas[i].id,
                username: datas[i].username,
                bank: datas[i].bank ? banks[datas[i].bank] : "FPS",
                email: datas[i].email,
                is_active: datas[i].is_active,
                role: datas[i].role
            });
        }
    }
    else if (whichTable === "terminals") columns = terminalsColumns;
    else if (whichTable === "transactions") columns = transactionsColumns;
    else if (whichTable === "banks") columns = banksColumns;

    return (
        <Table
            columns={columns}            
            dataSource={whichTable === "users" ? data : datas}
            pagination={false}
            sticky={{
                offsetHeader: 64,
            }}
        />
    );
};
export default TableComponent;