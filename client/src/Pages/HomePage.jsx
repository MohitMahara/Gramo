import React from "react";
import Layout from "../Components/Layout/Layout";
import StoriesSection from "../Components/StoriesSection";
import Posts from "../Components/PostsComponents/Posts";

const HomePage = () => {

  return (
    <Layout>
      <div className="homeContainer container">
        <StoriesSection />

        <div className="postContainer">
          <Posts/>
          <Posts/>
          <Posts/>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
