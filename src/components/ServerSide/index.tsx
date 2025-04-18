import {  memo } from 'react';
import { ServerSidePageProps } from '@/types/user';

const ServerSideView: React.FC<ServerSidePageProps> = ({users}) => {

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default memo(ServerSideView);