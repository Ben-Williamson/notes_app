
import React, {createContext, useReducer} from "react";
import Reducer from './reducer'


const initialState = {
    selected: 0,
    loggedIn: true,
    selectedDay: 25,
    apiKey: null,

    folderTreeState: [
        {
        name: "root",
        path: "root",
        open: true,
        type: "folder",
        children: [
            {
                name: "child folder",
                path: "root.child folder",
                type: "folder",
                open: true,
                children: [
                    {
                        name: "child file",
                        type: "file"
                    }
                ]
            },

            {
                name: "child file",
                type: "file"
            }
        ]
        },

        
    ]
    
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;