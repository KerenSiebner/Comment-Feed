import React from 'react'
import { Routes, Route } from 'react-router'

import { CommentFeed } from './pages/comment-feed'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route path="/" element={<CommentFeed />} />
                </Routes>
            </main>
        </div>
    )
}


