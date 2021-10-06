import React from "react";
import { Button, Input } from "@material-ui/core";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Publish from "@material-ui/icons/Publish";
import SwapHoriz from "@material-ui/icons/SwapHoriz";

const Image = (props) =>
    <div style={{ margin: '20px 0px' }}>
        {props.image && props.image.length > 4 ?
            <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 'auto', width: '70%' }}
            >
                <Button variant="outlined" component="label" disableRipple>
                    <SwapHoriz />
                    Change Image
                    <Input type='file' inputProps={{ accept: 'image/*' }} style={{ display: 'none' }} onChange={(event) => props.imageUpload(event, props.index)} />
                </Button>
                <img id="updatePic" src={props.image} alt="tromboneImage" />
                <Button
                    variant="outlined"
                    onClick={() => props.imageDelete(props.index)}
                    disableRipple
                >
                    <HighlightOff /> Delete image
                </Button>
            </div>
            :
            <Button
                variant="outlined"
                component="label"
                disableRipple
            >
                <Publish />
                Upload Image
                <Input type="file" inputProps={{ accept: "image/*" }} style={{ display: 'none' }} onChange={(event) => props.imageUpload(event, props.index)} />
            </Button>
        }
    </div>;

export default Image;