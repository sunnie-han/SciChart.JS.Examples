import VitalSignsMonitorDemoCopy from "../Examples/FeaturedApps/MedicalCharts/VitalSignsMonitorDemo/indexCopy";

function TestPage() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
            {Array(32)
                .fill("cell")
                .map((_, index) => {
                    return <VitalSignsMonitorDemoCopy key={index} divElementId={index.toString()} />;
                })}
        </div>
    );
}

export default TestPage;
