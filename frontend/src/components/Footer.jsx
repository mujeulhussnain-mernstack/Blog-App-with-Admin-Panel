import { quickLinks, needHelp, followUs } from "../constants/index.js";
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="px-4 py-8">

                <div className="flex flex-col lg:flex-row gap-8 mb-8">

                    <div className="lg:w-2/5">
                        <h1 className="text-2xl font-bold mb-4">
                            <span className="text-blue-600">Quick</span>
                            <span className="text-gray-800">Blog</span>
                        </h1>
                        <p className="text-gray-600 mb-4">
                            A solo exploration of Technology, Philosophy, and Everyday Life.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            One writer, three perspectives
                        </div>
                    </div>

                    <div className="lg:w-3/5">
                        <div className="flex flex-wrap justify-between gap-8">

                            <div className="min-w-[140px]">
                                <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                                <ul className="space-y-2">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="min-w-[140px]">
                                <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                                <ul className="space-y-2">
                                    {needHelp.map((link, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="min-w-[140px]">
                                <h3 className="font-semibold text-gray-800 mb-3">Follow</h3>
                                <ul className="space-y-2">
                                    {followUs.map((link, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="flex-center pt-6 border-t">
                    <p className="text-gray-500 text-sm mb-2 sm:mb-0">
                        © {new Date().getFullYear()} QuickBlog Mujeeb Ul Hussnain - All Right Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;