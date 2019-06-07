import React from "react";

const Image = (props) =>
    <div>
        {props.image && props.image.length > 4 ?
            <div>
                <img id="updatePic" src={props.image} alt="tromboneImage" />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Change Image</span>
                        <input id="fileUpload" type="file" accept="image/*" onChange={props.imageUpload} />
                    </div>
                    <div className="file-path-wrapper">
                        <input name="imagePath" className="file-path validate" type="text" />
                    </div>
                </div>
            </div>
            :
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input id="fileUpload" type="file" accept="image/*" onChange={props.imageUpload} />
                </div>
                <div className="file-path-wrapper">
                    <input name="imagePath" className="file-path validate" type="text" />
                </div>
            </div>
        }
    </div>;

export default Image;