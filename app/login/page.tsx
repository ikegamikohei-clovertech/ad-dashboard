"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch {
      setError("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-base font-extrabold"
            style={{ background: "linear-gradient(135deg, #1A1A2E, #3B3B5C)" }}
          >
            Ad
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1A1A2E]">mix.tokyo 広告入稿一覧ダッシュボード</h1>
            <p className="text-[11px] text-gray-400">Ad Submission Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-xs font-semibold text-gray-500 mb-2">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力..."
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4338CA] focus:ring-1 focus:ring-[#4338CA] transition-all"
            autoFocus
          />
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "linear-gradient(135deg, #1A1A2E, #3B3B5C)" }}
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
