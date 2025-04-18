import { useState, useEffect, memo } from 'react';
import { subscribeToUsers, fetchAndUpdateUsers } from '@/operators/users.operator';
import { User } from '@/types/user';

const ObserverView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Register Observer to update Users
    const unsubscribe = subscribeToUsers({
      update: (data: User[]) => {
        setUsers(data);
        setIsLoading(false);
      },
    });

    // First data
    fetchAndUpdateUsers().catch(err => {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    });

    // Cleanup when component unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default memo(ObserverView);