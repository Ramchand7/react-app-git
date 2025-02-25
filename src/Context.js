import useContext from "react";

 const BioContent = useContext();
const BioProvider = ({children}) => {
    const myAge = 20;
    return <BioContent.Provider value={myAge}>{children}</BioContent.Provider>
};
export { BioContent, BioProvider };