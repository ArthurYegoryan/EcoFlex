import "./UsersSearchSection.css";
import AddUser from "./addUser/AddUser";
import TextInput from "../../../generalComponents/inputFields/textInputComponent/TextInputComponent";
import ButtonComponent from "../../../generalComponents/buttons/Button";
import ModalComponent from "../../../generalComponents/modalComponent/ModalComponent";
import SearchIcon from '@mui/icons-material/Search';
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const UsersSearchSection = ({
    stationsGroups,
    stations,
    isUserAdded,
    setIsUserAdded,
    setSearchText,
    isSearchClicked,
    setIsSearchClicked
}) => {
    const [ isOpenedAddUserModal, setIsOpenedAddUserModal ] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="stations-groups-search-area">
            <TextInput label={t("searchSections.searchData")}
                        onChangeHandler={(e) => setSearchText(e.target.value.trim())} />
            <ButtonComponent label={t("operations.search")}
                            startIcon={<SearchIcon />}
                            height={"30px"}
                            marginTop={"5px"}
                            marginLeft={"15px"}
                            onClickHandler={() => setIsSearchClicked(!isSearchClicked)} />
            <ButtonComponent label={t("users.addChangeUser.addNewUser")}
                                startIcon={<Add />}
                                height={"30px"}
                                marginTop={"5px"}
                                marginLeft={"15px"}
                                onClickHandler={() => setIsOpenedAddUserModal(true)} />
            {isOpenedAddUserModal &&
                <ModalComponent onCloseHandler={() => setIsOpenedAddUserModal(false)}
                                isOpen={isOpenedAddUserModal}
                                title={t("users.addChangeUser.addNewUser")}
                                body={<AddUser stationsGroups={stationsGroups}
                                                stations={stations}
                                                isUserAdded={isUserAdded}
                                                setIsUserAdded={setIsUserAdded}
                                                onCloseHandler={() => setIsOpenedAddUserModal(false)} />}
                                closeImageUrl="../img/x.svg" />
            }
        </div>
    );
};

export default UsersSearchSection;