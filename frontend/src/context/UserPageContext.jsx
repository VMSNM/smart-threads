import { createContext, useContext, useState } from "react";

export const UserPageContext = createContext();

export const useUserPageContext = () => {
    return useContext(UserPageContext);
}

export const UserPageContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return <UserPageContext.Provider value={{user, setUser}}>
        {children}
    </UserPageContext.Provider>
}