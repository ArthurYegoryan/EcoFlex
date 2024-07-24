import axios from "axios";

export const downloadCSV = async (url, fileName) => {
     return await axios.get(
        url,
        {
            responseType: 'blob',
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw new Error('Network status was not 200');
        }
        
        const href = window.URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${fileName}.xlsx`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }).catch(err => console.log(err));
};