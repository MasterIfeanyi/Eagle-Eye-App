'use client'
import { useState } from 'react'
import { Copy, Check, Phone } from 'lucide-react'
import { Card } from 'react-bootstrap'
import Header from './Header'

const hotlines = [
    {
        category: "Police",
        icon: "🚔",
        numbers: [
            { label: "Nigeria Police Force", number: "199" },
            { label: "Police Emergency", number: "112" },
        ]
    },
    {
        category: "Medical",
        icon: "🏥",
        numbers: [
            { label: "National Emergency", number: "112" },
            { label: "Lagos State Ambulance", number: "767" },
        ]
    },
    {
        category: "Fire Service",
        icon: "🚒",
        numbers: [
            { label: "Federal Fire Service", number: "01-7944996" },
            { label: "Lagos Fire Service", number: "01-7628180" },
        ]
    },
    {
        category: "Anti-Corruption",
        icon: "⚖️",
        numbers: [
            { label: "EFCC Hotline", number: "08093322644" },
            { label: "ICPC Hotline", number: "08076999940" },
        ]
    },
    {
        category: "Gender & Child Safety",
        icon: "🛡️",
        numbers: [
            { label: "NAPTIP (Human Trafficking)", number: "08057000010" },
            { label: "Child Helpline", number: "116" },
        ]
    },
]

const HotlineItem = ({ label, number }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(number)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
            <div>
                <p className="small fw-medium mb-0">{label}</p>
                <a href={`tel:${number}`} className="text-danger fw-bold text-decoration-none">
                    {number}
                </a>
            </div>
            <div className="d-flex gap-2">
                <button
                    onClick={handleCopy}
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                    title="Copy number"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="small">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
        </div>
    )
}

const HotlinesPage = () => {
    return (
        <div className="hotlines-page" style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <Header />

            <div className="container py-3">
                <div className="mb-4">
                    <h2 className="fs-5 fw-bold mb-1">Emergency Hotlines</h2>
                    <p className="small text-muted mb-0">Tap a number to call, or copy it to your clipboard</p>
                </div>

                <div className="d-flex flex-column gap-3">
                    {hotlines.map((group, index) => (
                        <Card key={index} className="border">
                            <Card.Body className="p-3">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span style={{ fontSize: '1.25rem' }}>{group.icon}</span>
                                    <h3 className="fs-6 fw-semibold mb-0">{group.category}</h3>
                                </div>
                                {group.numbers.map((item, i) => (
                                    <HotlineItem key={i} label={item.label} number={item.number} />
                                ))}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HotlinesPage