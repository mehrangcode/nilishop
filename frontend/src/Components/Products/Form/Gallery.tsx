import * as React from 'react';
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { IFormProps } from "../../../Utils/FormController";
import { RouteComponentProps } from "react-router";
import folderPath from '../../../Assets/Icons/folder.svg';
import { Link } from 'react-router-dom';
import { galleryPath } from '../../../Utils/General/GConst';
import Spinner from '../../../Utils/Spinner';
type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{ crudType: string }>;
const Gallery = (props: IProps) => {
    const [path, setPath] = React.useState<string>("")

    const onFolderClick = (folder: any) => {
        let folderPath = folder.path.replace("../uploads", "")
         folderPath = folderPath.replace("//", "/")
        setPath(folderPath + "/" + folder.name)
        props.getGalleryDir(folderPath + "/" + folder.name)
    }
    const goUp = () => {
        const newPath = path.split("/")
        newPath.pop();
        setPath(newPath.join("/"))
        props.getGalleryDir(newPath.join("/"))

    }
    React.useEffect(() => {
        props.getGalleryDir("")
    }, []);
    console.log(path)
    return <div className="gallery">
        <Spinner loading={props.gallery.loading} />
        {path && <div className="row">
            <p onClick={goUp}> UP...</p>
        </div>}
        <div className="row">
            {props.gallery.data.map(item => {
                if (item.isDir) {
                    return (
                        <div className="col-1 ml-1">
                                <img src={folderPath} alt="folder" onClick={() => onFolderClick(item)} />
                            {item.name}
                        </div>
                    )
                }

                return (
                    <div className="col-1 ml-1">
                        <a href={galleryPath + path + "/" +item.name}>
                            <img className="thumbnail" src={galleryPath + path + "/" +item.name} alt="folder" />
                        </a>
                        {item.name.split(".")[0]}
                    </div>
                )

            })}
        </div>
    </div>
}

export default Gallery