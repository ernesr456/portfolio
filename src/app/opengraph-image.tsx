import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'SOLOPRENEUR'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#011627',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
        <h1 style={{ fontSize: 32, color: '#18f2e5', margin: 0 }}>
          Ernesto Almario | Ernesto Almario is a Full-Stack and Web3 Engineer based in the Philippines. He builds scalable web applications and blockchain-powered solutions using React, Next.js, Node.js, and Rust. Let’s build secure, modern digital products together.
        </h1>
        <h2 style={{ fontSize: 40, color: 'white', marginTop: 30 }}>
          Full-Stack & Smart Contract Engineer building secure, scalable distributed systems and decentralized protocols.
        </h2>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  )
}
