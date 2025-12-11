import { Layout } from "../components/Layout/Layout";
import ProfileSidebar from "../components/HomePage/ProfileSidebar";
import Feed from "../components/HomePage/Feed";
import RightSidebar from "../components/HomePage/RightSidebar";

export const HomePage = () => {
  return (
    <Layout>
      <div className="flex justify-center gap-6 px-4 py-6">
        <aside className="hidden md:block w-1/4">
          <ProfileSidebar />
        </aside>

        <main className="w-full md:w-2/4">
          <Feed />
        </main>

        <aside className="hidden lg:block w-1/4">
          <RightSidebar />
        </aside>
      </div>
    </Layout>
  );
};
