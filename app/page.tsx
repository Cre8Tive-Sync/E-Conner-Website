export default function Home() {
  return (
    <main
      className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-[#07120c] px-6 py-12 text-white"
      style={{ cursor: "default", userSelect: "text" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(76,175,121,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(200,146,42,0.16),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4caf79] to-transparent opacity-50" />

      <section className="relative w-full max-w-2xl text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#a8d5b5]">
          Website Temporarily Disabled
        </div>

        <h1 className="font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
          Temporary disabled until client has fully paid all remaining balance.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          This website is currently unavailable. Full service will be restored
          after the outstanding balance has been settled.
        </p>
      </section>
    </main>
  );
}
