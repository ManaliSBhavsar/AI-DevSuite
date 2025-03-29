export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-slate-950 to-slate-900 text-white py-6 text-center shadow-md relative mt-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400"></div>

            <p className="text-sm text-amber-100">
                © {new Date().getFullYear()} <span className="font-semibold text-teal-400">AI DevSuite</span> – Powered by 
                <span className="text-blue-500 font-medium"> Next.js</span>
            </p>
        </footer>
    );
}
