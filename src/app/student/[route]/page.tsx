export default async function StudentModule({ params }: { params: Promise<{ route: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Student Module: {resolvedParams.route}</h1>
      <p>Welcome to your specifically authorized route.</p>
    </div>
  );
}
