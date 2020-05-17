import * as React from 'react';
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { IFormProps } from "../../../Utils/FormController";
import { RouteComponentProps } from "react-router";
import folderPath from '../../../Assets/Icons/folder.svg';
import { Link } from 'react-router-dom';
import { galleryPath } from '../../../Utils/General/GConst';
type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{ crudType: string }>;
const Gallery = (props: IProps) => {
    const [path, setPath] = React.useState<string>("")

    const onFolderClick = (name: string) => {
        setPath(path + "/" + name)
        props.getGalleryDir(path + "/" + name)
    }
    React.useEffect(() => {
        props.getGalleryDir("/")
    }, []);
    console.log(props.gallery)
    return <div className="gallery">
        <div className="row">
            <a href="#"> UP...</a>
        </div>
        <div className="row">
            {props.gallery.data.map(item => {
                if (item.isDir) {
                    return (
                        <div className="col-1 ml-1">
                                <img src={folderPath} alt="folder" onClick={() => onFolderClick(item.name)} />
                            {item.name}
                        </div>
                    )
                }

                return (
                    <div className="col-1 ml-1">
                        <Link to={galleryPath + "/uploads/" +item.name}>
                            <img className="thumbnail" src={galleryPath + "/uploads/" +item.name} alt="folder" />
                        </Link>
                        {item.name}
                    </div>
                )

            })}
        </div>
    </div>
}

export default Gallery