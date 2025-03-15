import React from "react";
import { Dropdown, Menu, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const PostViewerMenu = ({post, setIsModalOpen}) => {
  
  const items = [
     {key : 1, label : "Share"},
     {key : 2, label : "Save"},
     {key : 3, label : "Report"}
  ]


  const handleMenuBtn  = ({key}) =>{

          if (key == 1) {
            handleShare();
            
          } else if (key == 2) {
            handleSave();

          } else if (key == 3) {
            handleReport();
          }
  }
  
  const handleShare = () =>{

  }

  const handleSave = () =>{
    
  }

  const handleReport = () =>{

  }



  return (
    <Dropdown menu={{items, onClick : handleMenuBtn}} trigger={["click"]} placement="bottomRight">
      <button className="more-btn">
        <MoreOutlined style={{ fontSize: "20px" }} />
      </button>
    </Dropdown>
  );
};

export default PostViewerMenu;

