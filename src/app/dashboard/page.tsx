import DashboardPage from '@/src/client/dashboard/DashboardPage';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const t = typeof params.t === 'string' ? params.t : undefined;
    return <DashboardPage key={t || 'default'} />;
}

