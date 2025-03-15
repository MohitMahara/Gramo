import React from "react";
import { Dropdown} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";

const CmtViewerMenu = ({cmt}) => {

    
  const items = [
     {key : 1, label : "Report"}
  ]


  const handleReport  = () =>{

  }
  
  return (
    <Dropdown menu={{items, onClick : handleReport}} trigger={["click"]} placement="bottomRight">
      <button className="more-btn">
        <MoreOutlined style={{ fontSize: "20px" }} />
      </button>
    </Dropdown>
  );
};

export default CmtViewerMenu;
