import "./StationPage.css";

const StationPage = () => {
    const url = window.location.href;
    const stationId = Number(url.slice(url.lastIndexOf("/") + 1))

    console.log("Station id: ", stationId);

    return (
        <div>
            Station Page
        </div>
    );
};

export default StationPage;