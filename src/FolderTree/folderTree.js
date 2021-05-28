import "./folderTree.css";
import caret from "../Icons/caret-down.svg";
import {Context} from '../store';
import React, {useContext} from 'react';

// class Folder extends React.Component {

//     constructor(props) {
//         super(props);
//     }
    
//     handleClick() {
//         console.log(this.props);
//     }

//     render() {
//         return (
//             <div className={"folder " + (this.props.open ? "" : "closed") }>
//                 <div onClick={() => this.handleClick()} name={this.props.name} className="folderInfo">
//                     <img src={ caret } alt=">"></img>
//                     { this.props.name }
//                 </div>
//                 <div className="folderChildren">
//                     { this.props.children }
//                 </div>
//             </div>
//         )
//     }
    
// }

function Folder(props) {
    const [state, dispatch] = useContext(Context);

    const onSuccess = () => {
        console.log(state.folderTreeState, this);

        dispatch({type: 'SET_TREE', payload: []});
    }

    return (
        <div className={"folder " + (props.open ? "" : "closed") }>
            <div onClick={onSuccess} name={props.name} className="folderInfo">
                <img src={ caret } alt=">"></img>
                { props.name }
            </div>
            <div className="folderChildren">
                { props.children }
            </div>
        </div>
    )
}

function File(props) {
    return (
        <div className="file">
            {props.name}
        </div>

    );
}

function RenderTree(props) {
    var item = props.item;
    return (
        <div>
        {item.map((item, key) => {
            if(item.type === "folder") {
                console.log(item);
                return <Folder path={item.path} key={key} name={ item.name } open={item.open} children={<RenderTree item={item.children} ></RenderTree>}></Folder>
            }
            return (
                <File key={key} name={ item.name }></File>
            )
        }
        )}
    </div>
    );
}

function FolderTree() {
    const [state] = useContext(Context);

    // for(var i = 0; i < state.folderTreeState.length; i++) {
    //     console.log(RenderTree(state.folderTreeState[i]));
    // }

    return (

        <RenderTree item={state.folderTreeState}></RenderTree>

        // <Folder name="folder 1">
        //     <File name="file 1"></File>
        //     <Folder name="folder 2">
        //         <File name="File in folder 2"></File>
        //     </Folder>
        // </Folder>
    )
}

export default FolderTree;