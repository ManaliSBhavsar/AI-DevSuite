export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-gray-300 p-4 text-center shadow-md border-t border-slate-700">
            <p className="text-sm">
                © {new Date().getFullYear()} AI DevSuite. Built using Next.js &
                OpenAI APIs.
            </p>
        </footer>
    );
}
