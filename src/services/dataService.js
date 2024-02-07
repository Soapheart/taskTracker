const dataService = () => {
    let localDataStorage;
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem(localDataStorage, JSON.stringify(data));
    }
    const getDataFromLocalStorage = ()=> {
        let data = JSON.parse(localStorage.getItem(localDataStorage));
        if (!data){
            return data
        } else {
            return{
                data
            }
        }
    }
    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload(false);
    }
    const exportData = () => {
        const data = JSON.parse(localStorage.getItem(localDataStorage));
        const convertToCSV = (data) => { //copypaste
            const replacer = (key, value) => value === null ? '' : value; 
            const header = Object.keys(data[0]);
            let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
            csv.unshift(header.join(','));
            csv = csv.join('\r\n');
            return csv;
        }
        function downloadCSV(csv, filename) { //copypaste
            const csvData = new Blob([csv], { type: 'text/csv' });
            const csvURL = window.URL.createObjectURL(csvData);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', filename);
            tempLink.click();
          }
        const csv = convertToCSV(data);
        downloadCSV(csv, 'data.csv')
    }
    return{
        saveDataToLocalStorage,
        getDataFromLocalStorage,
        clearLocalStorage,
        exportData
    }
}
export default dataService;