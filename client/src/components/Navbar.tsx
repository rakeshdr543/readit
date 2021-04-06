
import Link from 'next/link'

import RedditLogo from '../images/reddit.svg'
import React from "react";

const Navbar:React.FC =()=> (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
        {/* Logo and title */}
        <div className="flex items-center">
            <Link href="/">
                <a>
                    <RedditLogo className="w-8 h-8 mr-2" />
                </a>
            </Link>
            <span className="text-2xl font-semibold">
                <Link href="/">readit</Link>
            </span>
        </div>
        {/* Serach Input */}
    </div>
)

export default Navbar