import { ThemeProvider } from './components/theme-provider';
import { Dashboard } from './components/dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LeadManager } from './components/leads/lead-manager';
import { ScheduleView } from './components/schedule/schedule-view';
import { InventoryManager } from './components/inventory/inventory-manager';
import { CustomerManager } from './components/customers/customer-manager';
import { AuthProvider } from './components/auth/auth-provider';
import { LoginForm } from './components/auth/login-form';
import { TechnicianView } from './components/technicians/technician-view';
import { SettingsView } from './components/settings/settings-view';
import { AccountPage } from './components/pages/account-page';
import { ProfilePage } from './components/pages/profile-page';
import { ProtectedRoute } from './components/auth/protected-route';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leads/*"
              element={
                <ProtectedRoute>
                  <LeadManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule/*"
              element={
                <ProtectedRoute>
                  <ScheduleView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory/*"
              element={
                <ProtectedRoute>
                  <InventoryManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/*"
              element={
                <ProtectedRoute>
                  <CustomerManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technicians/*"
              element={
                <ProtectedRoute>
                  <TechnicianView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsView />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;