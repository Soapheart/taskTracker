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
    return{
        saveDataToLocalStorage,
        getDataFromLocalStorage
    }
}
export default dataService;