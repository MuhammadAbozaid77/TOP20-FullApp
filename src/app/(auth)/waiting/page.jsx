export default function WaitingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-center p-4">
      <h1 className="text-3xl font-bold mb-4">⏳ حسابك قيد المراجعة</h1>
      <p className="text-lg text-gray-700">
        شكراً لتسجيلك. سيتم مراجعة حسابك من قبل الإدارة قريباً.
      </p>
    </div>
  );
}
