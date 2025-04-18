import { ServerSidePageProps, User } from "@/types/user";
import React from "react";
import ServerSideView from "@/components/ServerSide";
import { GetServerSideProps } from "next";
import { UserOperator } from "@/operators/users.operator";


const FactoryMethodPage: React.FC<ServerSidePageProps> = ({users}) => {
    return <ServerSideView users={users}/>;
}


// export const getServerSideProps: GetServerSideProps = async () => {
//   const factory = new ApiUserFetcherFactory();
//   const fetcher = factory.createFetcher();
//   const users = await fetcher.fetchUsers();
//   return {
//     props: {
//       users,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await UserOperator.fetchUsersServerSide();
  return {
    props: {
      users,
    },
  };
};

export default FactoryMethodPage;