import { ServerSidePageProps, User } from '@/types/user';
import { memo } from 'react';


const SingleTonView: React.FC<ServerSidePageProps> = ({ users }) => {
  if (!users.length) {
    return <div>No users found</div>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default memo(SingleTonView);