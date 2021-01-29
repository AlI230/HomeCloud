import React from 'react';
import axios from 'axios';

class FolderList extends React.Component {
    state = {
        folders: []
    }

    constructor(props) {
        super(props);
        this.getFiles = this.props.getFiles;
    }
    
    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('tokens'));
        axios({method: 'GET', url:`http://${process.env.REACT_APP_HOST_IP}:3030/folders/${token.id}`})
            .then(res => {
            const folders = res.data;
            this.setState({ folders });
        })
    }

    render() {
        return (
        <>
            {this.state.folders.map(folder => (
                <a className="block border-b cursor-pointer" href={`/collection/folder/${folder.name}/${folder.folder_id}`}>
                    <div className={folder.name == this.props.selectedName ? styles.selected : styles.default}>
                        <div className="flex flex-row items-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            <strong className="flex-grow font-normal">{folder.name}</strong>
                        </div>
                    </div>
                </a>
            ))}
        </>
        )
    }
}

const styles = {
    default: "border-l-2 border-transparent hover:border-blue-500 hover:bg-blue-100 p-3 space-y-4",
    selected: "border-l-2 border-blue-500 bg-blue-100 p-3 space-y-4"
}

export default FolderList;