export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        You are not authorized to view this page.
      </p>
    </div>
  );
}
