import PostTaskClient from "@/components/DashBoard/Client/PostTaskClient";
import { getUserSession } from "@/lib/core/session";
const PostTaskPage = async() => {
  const user = await getUserSession()


    return (
      <>
      <PostTaskClient user={user}/>
      </>
    );
};

export default PostTaskPage;