import axios from "axios";
import conver2Base64 from "../Utility/Base64Converter";
import React, { createContext, useContext, useState} from "react";
import { SnackBarContext } from "./SnackBar";
import { BASEURL } from "../Utility/Config";
export const UserContext = createContext();

export function UserContextProvider(props) {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const [formObj, setFormObj] = useState({ _id: '', username: '', useremail: '', userpassword: '', usercpassword: '', userimage: '' });
    const [displayinfo, setdisplayinfo] = useState(true);

    function fetchUserInfo() {
        async function getUserObj() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.get(BASEURL + '/getprofile', config);
            console.log('data to display: ', res.data);
            const resData = await res.data.userData;
            return resData
        }
        getUserObj().then((resData) => {
            setFormObj({ ...formObj, ['_id']: resData._id, ['username']: resData.name, ['useremail']: resData.email, ['userimage']: resData.userImage });
        })
    }

    const UpdateUserInfo = async () => {
        try {
            if (formObj.username.length < 5 || formObj.username.length > 30) {
                ActiveSnackBar('Invalid name...', 'error');
                return
            }
            else if (formObj.userpassword.length < 6) {
                ActiveSnackBar('Invalid Password....', 'error');
                return;
            }
            else if (formObj.userpassword !== formObj.usercpassword) {
                ActiveSnackBar('Password & Confirm password not Matched....', 'error');
                return;
            }
            else {
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                    }
                }
                const res = await axios.put(BASEURL + '/updateprofile', formObj, config);
                const resData = await res.data;
                // console.log('update ka response: ', resData);
                ActiveSnackBar(resData.serverMsg, resData.success ? "success" : "error");
                // setMessage(resData.serverMsg)
                if (resData.success === true) {
                    setdisplayinfo(true);
                }
            }
        }
        catch(err){
            ActiveSnackBar('Unknown error in updating profile', 'error');
        }
    }

    const updateImageField = async (e) => {
        console.log(e.target.files[0]);
        const filedata = await conver2Base64(e.target.files[0]);
        setFormObj({ ...formObj, 'userimage': filedata });
    }

    const updateTextFields = (e) => {
        console.log(e.target.name);
        setFormObj({ ...formObj, [e.target.name]: e.target.value });
    }

    return (
        <UserContext.Provider value={{ formObj, setFormObj, displayinfo, setdisplayinfo, fetchUserInfo, UpdateUserInfo, updateImageField, updateTextFields }}>
            {props.children}
        </UserContext.Provider>
    )
}