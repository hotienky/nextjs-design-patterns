import { ServerSidePageProps, User } from "@/types/user";
import React from "react";
import SingleTonView from "@/components/SingleTon"
import { UserOperator } from "@/operators/users.operator";


const StrategyPage: React.FC<ServerSidePageProps> = ({users}) => {
    return <SingleTonView users={users}/>;
}


export async function getServerSideProps() {
    const users = await UserOperator.fetchUsersServerSide();

    return {
      props: {
        users,
      },
    };
  }

export default StrategyPage;