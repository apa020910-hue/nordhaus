import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="fs-expanded text-8xl font-semibold text-charcoal">404</p>
        <p className="mt-4 text-lg text-concrete">Page not found.</p>
        <Link href="/" className="mt-8 inline-flex h-12 items-center rounded bg-rust px-6 font-medium text-paper">
          Back to home
        </Link>
      </div>
    </div>
  );
}
