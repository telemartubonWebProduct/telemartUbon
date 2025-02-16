"use client";


import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookChat() {
    return (
        <FacebookProvider appId="1689092495005992" chatSupport>
            <CustomChat pageId="538960199305317" minimized={true} />
        </FacebookProvider>
    );
}   