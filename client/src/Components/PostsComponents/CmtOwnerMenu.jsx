import React from "react";
import { Dropdown} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";

const CmtOwnerMenu = ({cmt, post, getComments}) => {
    
  const items = [
     {key : 1, label : "Report"},
     {key : 2, label : "Delete"},
  ]


  const handleMenuBtn  = ({key}) =>{

      if (key == 1) {
        handleReport();
      } else if (key == 2) {
        handleDelete();
      } 
  }



  const handleReport = () =>{
    
  }
  

  const handleDelete = async() =>{
    try {
      const cmtId = cmt._id;

      const res  = await axios.delete(`${process.env.REACT_APP_API}/api/posts/delete-comment/${post?._id}/${cmtId}`);

      if(res.data.success){
        getComments();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dropdown menu={{items, onClick : handleMenuBtn}} trigger={["click"]} placement="bottomRight">
      <button className="more-btn">
        <MoreOutlined style={{ fontSize: "20px" }} />
      </button>
    </Dropdown>
  );
};

export default CmtOwnerMenu;
