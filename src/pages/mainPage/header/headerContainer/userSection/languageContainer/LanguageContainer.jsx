import "./LanguageContainer.css";
import ReactFlagsSelect from "react-flags-select";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const LanguageContainer = () => {
    const { t, i18n } = useTranslation();
    const [ selectedLanguage, setSelectedLanguage ] = useState("AM");

    return (
        <div className="language-container">
            <ReactFlagsSelect selected={selectedLanguage}
                              countries={["GB", "RU", "AM"]}
                              showSelectedLabel={false}
                              showOptionLabel={false}
                              onSelect={(code) => {
                                  setSelectedLanguage(code);
                                  {code === "GB" && i18n.changeLanguage("en")}
                                  {code === "RU" && i18n.changeLanguage("ru")}
                                  {code === "AM" && i18n.changeLanguage("am")}
                              }} />
        </div>
    );
};

export default LanguageContainer;