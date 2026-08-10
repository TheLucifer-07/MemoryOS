import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WorkspaceSidebar from './WorkspaceSidebar';

export default function WorkspaceShell() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F5F2EC] lg:flex-row">
      <WorkspaceSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
