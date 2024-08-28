import "./SideBar.css";
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
import { paths } from "../../constants/paths/paths";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const role = useSelector((state) => state.auth.role) ?? localStorage.getItem("role");

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>                
                <div className={`logo-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                    <div className={`logo-area-content-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                        {!collapsed ?
                            <img src={process.env.PUBLIC_URL + 'favicon.ico'} alt="Logo" className="opened-menu-logo" /> :
                            <img src={process.env.PUBLIC_URL + 'favicon.ico'} alt="Logo" className="closed-menu-logo" />
                        }
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={
                        role === "Admin" ? 
                        [
                            {
                                key: '1',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/fuelTypes.svg'} alt="Fuel types" />
                                    </span>
                                ),
                                label: t("nav.fuelTypes"),
                                onClick: () => {navigate(paths.FUEL_TYPES)}
                            },
                            {
                                key: '2',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/stationsGroups.svg'} alt="Stations groups" />
                                    </span>
                                ),
                                label: t("nav.stationGroups"),
                                onClick: () => {navigate(paths.STATIONS_GROUPS)}
                            },
                            {
                                key: '3',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/prices.svg'} alt="Prices" />
                                    </span>
                                ),
                                label: t("nav.fuelPrices"),
                                onClick: () => {navigate(paths.FUEL_PRICES)}
                            },
                            {
                                key: '4',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/dispensers.svg'} alt="Dispensers" />
                                    </span>
                                ),
                                label: t("nav.dispensers"),
                                onClick: () => {navigate(paths.DISPENSERS)}
                            },
                            {
                                key: '5',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/users.svg'} alt="Users" />
                                    </span>
                                ),
                                label: t("nav.users"),
                                onClick: () => {navigate(paths.USERS)}
                            },
                            {
                                key: '6',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/transactions.svg'} alt="Transactions" />
                                    </span>
                                ),
                                label: t("nav.transactions"),
                                onClick: () => {navigate(paths.TRANSACTIONS)}
                            },
                        ]
                        : role === "FuelSupervisor" ? 
                        [
                            {
                                key: '1',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/stationsGroups.svg'} alt="Stations groups" />
                                    </span>
                                ),
                                label: t("nav.stationGroups"),
                                onClick: () => {navigate(paths.STATIONS_GROUPS)}
                            },
{
                                key: '2',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/prices.svg'} alt="Prices" />
                                    </span>
                                ),
                                label: t("nav.fuelPrices"),
                                onClick: () => {navigate(paths.FUEL_PRICES)}
                            },
{
                                key: '3',
                                icon: (
                                    <span className={`menu-icon-area-${!collapsed ? "opened-menu" : "closed-menu"}`}>
                                        <img src={process.env.PUBLIC_URL + 'img/transactions.svg'} alt="Transactions" />
                                    </span>
                                ),
                                label: t("nav.transactions"),
                                onClick: () => {navigate(paths.TRANSACTIONS)}
                            },
                        ]
                        : null
                    }
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default SideBar;