/** Renderiza um bloco de dados estruturados Schema.org como JSON-LD. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para impedir que conteúdo dinâmico feche a tag <script> prematuramente.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
