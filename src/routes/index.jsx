import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/Home';
import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';
import OnboardingPage from '../pages/Onboarding';

import WorkspaceShell from '../components/memoryos/WorkspaceShell';
import WorkspaceHome from '../pages/Workspace/Home';
import TimelinePage from '../pages/Workspace/Timeline';
import MapPage from '../pages/Workspace/Map';
import PeoplePage from '../pages/Workspace/People';
import CollectionsPage from '../pages/Workspace/Collections';
import SearchPage from '../pages/Workspace/Search';
import AIPage from '../pages/Workspace/AI';
import { SettingsPage, PrivacyPage, SecurityPage } from '../pages/Workspace/Settings';

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F5F2EC]">
    <div className="text-center">
      <p className="font-display text-6xl font-extrabold text-heading">404</p>
      <p className="mt-3 text-base text-text-muted">This page doesn't exist.</p>
      <a href="/" className="mt-6 inline-block text-sm font-semibold text-heading underline underline-offset-2">
        Go home
      </a>
    </div>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing page — FROZEN, untouched */}
      <Route path="/" element={<HomePage />} />

      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      {/* Legacy register redirect */}
      <Route path="/auth/register" element={<Navigate to="/auth/signup" replace />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Workspace — authenticated shell */}
      <Route path="/workspace" element={<WorkspaceShell />}>
        <Route index element={<WorkspaceHome />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="ai" element={<AIPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="security" element={<SecurityPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
