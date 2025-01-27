// components/schemas/HomeSchema.tsx
export function HomeSchema() {
  return (
    <>
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'lophim',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/tim-kiem?query={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'lophim',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
          })
        }}
      />
    </>
  )
}