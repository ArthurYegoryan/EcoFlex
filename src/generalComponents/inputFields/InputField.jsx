import './InputField.css';

const InputField = ({
    type = "text",
    placeholder = "",
    classNameDiv = "",
    classNameInput = "",
    onChangeHandler
}) => {
    return (
        <div className={`input-div ${classNameDiv}`}>
            <input type={type} 
                   placeholder={placeholder} 
                   className={`input-field ${classNameInput}`}
                   onChange={onChangeHandler} 
            />
        </div>
    );
};

export default InputField;