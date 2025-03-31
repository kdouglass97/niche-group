'use client';

import { useEffect, useState } from 'react';

export default function TestMcpPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    status: string;
    connections?: {
      prisma: {
        connected: boolean;
        users: any[];
      };
      supabase: {
        connected: boolean;
        error: string | null;
        users: any[];
      };
    };
    error?: string;
    message?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkMcpConnections() {
      try {
        const response = await fetch('/api/test-mcp');
        const data = await response.json();
        setConnectionStatus(data);
      } catch (error) {
        setConnectionStatus({
          status: 'error',
          error: 'Failed to test connections',
          message: error.message
        });
      } finally {
        setLoading(false);
      }
    }

    checkMcpConnections();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">MCP Connection Test</h1>
      
      {loading ? (
        <div className="text-center">
          <p className="text-xl">Testing connections...</p>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Status Overview</h2>
            <div className="text-xl mb-2">
              Status: <span className={connectionStatus?.status === 'success' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {connectionStatus?.status}
              </span>
            </div>
            {connectionStatus?.error && (
              <div className="text-red-600 mt-2">
                Error: {connectionStatus.error}
                {connectionStatus.message && <div>{connectionStatus.message}</div>}
              </div>
            )}
          </div>

          {connectionStatus?.connections && (
            <>
              <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Prisma Connection</h2>
                <div className="text-xl mb-4">
                  Connected: <span className={connectionStatus.connections.prisma.connected ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {connectionStatus.connections.prisma.connected ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <h3 className="text-xl font-medium mb-2">Users from Prisma:</h3>
                {connectionStatus.connections.prisma.users.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {connectionStatus.connections.prisma.users.map((user) => (
                      <li key={user.id} className="mb-2">
                        <strong>{user.name}</strong> ({user.email})
                        <div className="text-sm text-gray-600">
                          Communities: {user.communities.join(', ')}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No users found</p>
                )}
              </div>

              <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Supabase Connection</h2>
                <div className="text-xl mb-4">
                  Connected: <span className={connectionStatus.connections.supabase.connected ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {connectionStatus.connections.supabase.connected ? 'Yes' : 'No'}
                  </span>
                </div>
                
                {connectionStatus.connections.supabase.error && (
                  <div className="text-red-600 mt-2 mb-4">
                    Error: {connectionStatus.connections.supabase.error}
                  </div>
                )}
                
                <h3 className="text-xl font-medium mb-2">Users from Supabase:</h3>
                {connectionStatus.connections.supabase.users.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {connectionStatus.connections.supabase.users.map((user) => (
                      <li key={user.user_id} className="mb-2">
                        <strong>{user.first_name} {user.last_name}</strong> ({user.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No users found</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 