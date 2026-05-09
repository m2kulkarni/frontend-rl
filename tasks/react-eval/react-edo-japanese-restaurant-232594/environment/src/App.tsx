import { useEffect, useState } from 'react'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'

const ROUTES: Record<string, React.ReactElement> = {
    '/page-1': <Page1 />,
    '/page-2': <Page2 />,
    '/page-3': <Page3 />,
    '/page-4': <Page4 />,
    '/page-5': <Page5 />,
    '/page-6': <Page6 />,
}

function getRoute(): string {
    const h = (typeof window !== 'undefined' ? window.location.hash : '') || '#/page-1'
    return h.replace(/^#/, '') || '/page-1'
}

export default function App() {
    const [route, setRoute] = useState(getRoute())
    useEffect(() => {
        const onHash = () => setRoute(getRoute())
        window.addEventListener('hashchange', onHash)
        return () => window.removeEventListener('hashchange', onHash)
    }, [])
    return ROUTES[route] || ROUTES['/page-1']
}
