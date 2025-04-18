import { fetchUsersServerSide } from "@/operators/users.operator";
import { ServerSidePageProps } from "@/types/user";
import ServerSideView from "@/components/ServerSide"


const ServerSidePage = ({users}: ServerSidePageProps) => {
    return <ServerSideView users={users}/>
}

export async function getServerSideProps() {
    const users = await fetchUsersServerSide();

    return {
      props: {
        users,
      },
    };
  }

export default ServerSidePage;