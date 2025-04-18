import { ServerSidePageProps, User } from "@/types/user";
import React from "react";
import SingleTonView from "@/components/SingleTon"
import { GetServerSideProps } from "next";
import { UserOperator } from "@/operators/users.operator";


const FactoryMethodPage: React.FC<ServerSidePageProps> = ({users}) => {
    return <SingleTonView users={users}/>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await UserOperator.fetchUsersServerSide();
  return {
    props: {
      users,
    },
  };
};

export default FactoryMethodPage;