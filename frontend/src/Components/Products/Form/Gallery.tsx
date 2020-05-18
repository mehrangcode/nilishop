import * as React from 'react';
import { IProductState } from "../../../actions/Products/model";
import * as ProductActions from "../../../actions/Products";
import { IFormProps } from "../../../Utils/FormController";
import { RouteComponentProps } from "react-router";
import folderPath from '../../../Assets/Icons/folder.svg';
import { Link } from 'react-router-dom';
import { galleryPath } from '../../../Utils/General/GConst';
import Spinner from '../../../Utils/Spinner';
type IProps = IProductState & typeof ProductActions & IFormProps & RouteComponentProps<{ crudType: string }> & {
    onChange: (value: string) => void;
};
const Gallery = (props: IProps) => {
    const [images, saveImages] = React.useState<string[]>([])
    const [path, setPath] = React.useState<string>("")
    React.useEffect(() => {
        props.getGalleryDir("")
    }, []);
    React.useEffect(() => {
        const imagesList = images.join(",")
        props.onChange(imagesList)
    }, [images]);

    const onFolderClick = (folder: any) => {
        let folderPath = folder.path.replace("../uploads", "")
         folderPath = folderPath.replace("//", "/")
        setPath(folderPath + "/" + folder.name)
        props.getGalleryDir(folderPath + "/" + folder.name)
    }
    const modifyImages = (image: string) => {
        let newImageList = [...images]; //.filter(x => x !== image);
        const imageIndex = images.findIndex(x => x === image);
        // console.log("index: ", imageIndex)
        if(imageIndex < 0){
            newImageList.push(image)
            saveImages(newImageList)
        } else {
            newImageList = images.filter(x => x !== image)
            saveImages(newImageList)
        }
       
    }
    const goUp = () => {
        const newPath = path.split("/")
        newPath.pop();
        setPath(newPath.join("/"))
        props.getGalleryDir(newPath.join("/"))

    }
    return <div className="gallery">
        <Spinner loading={props.gallery.loading} />
        {path && <div className="row">
            <p onClick={goUp} className="galerryGoUp"> UP...</p>
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
                            <img 
                            className="thumbnail" 
                            src={galleryPath + path + "/" +item.name} 
                            alt="folder"
                            onClick={() => modifyImages(galleryPath + path + "/" +item.name)} />
                        {item.name.split(".")[0] + " " + (images.some(x => x.includes(path + "/" + item.name)) ? "X" : "")}
                    </div>
                )

            })}
        </div>
    </div>
}

export default Gallery