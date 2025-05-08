import React from 'react';
import DashboardLayout from '@/src/client/dashboard/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
