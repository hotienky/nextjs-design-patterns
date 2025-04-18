import { fetchUsersServerSide } from "@/operators/users.operator";
import { ServerSidePageProps, User } from "@/types/user";
import React from "react";
import SingleTonView from "@/components/SingleTon"
import { GetServerSideProps } from "next";
import { UserOperator } from "@/operators/singleton.oparator";


const SingletonPage: React.FC<ServerSidePageProps> = ({users}) => {
    return <SingleTonView users={users}/>;
}


export const getServerSideProps: GetServerSideProps = async () => {
    const userOperator = UserOperator.getInstance();
    const users = await userOperator.fetchUsers();
    return {
      props: {
        users,
      },
    };
  };

export default SingletonPage;