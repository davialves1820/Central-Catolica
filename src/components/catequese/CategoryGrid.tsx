import Link from 'next/link';

export function CategoryGrid() {
  return (
    <section className="max-w-container-max mx-auto px-margin-desktop pb-24">
      <div className="grid grid-cols-12 gap-gutter">
        {/* Sacramentos */}
        <div className="col-span-12 md:col-span-6 group cursor-pointer block">
          <div className="bg-[#f5f3ee] p-10 h-[400px] rounded-xl border border-[#c9a84c]/30 flex flex-col justify-between transition-colors hover:bg-[#f0eee9]">
            <div>
              <h3 className="font-headline-lg text-headline-lg mb-4 text-[#755b00]">Sacramentos</h3>
              <p className="font-body-md text-body-md text-[#4d4540]">
                Canais de graça instituídos por Cristo para a nossa santificação e fortalecimento espiritual.
              </p>
            </div>
            <div className="font-label-md text-label-md [font-variant:small-caps] text-[#755b00] flex items-center group-hover:translate-x-2 transition-transform opacity-50">
              Em breve
            </div>
          </div>
        </div>

        {/* Santa Missa */}
        <Link href="/catequese/missa" className="col-span-12 md:col-span-6 group cursor-pointer block">
          <div className="bg-[#f5f3ee] p-10 h-[400px] rounded-xl border border-[#c9a84c]/30 flex flex-col justify-between transition-colors hover:bg-[#f0eee9]">
            <div>
              <h3 className="font-headline-lg text-headline-lg mb-4 text-[#755b00]">Santa Missa</h3>
              <p className="font-body-md text-body-md text-[#4d4540]">
                O sacrifício eucarístico, fonte e ápice de toda a vida cristã e espiritualidade.
              </p>
            </div>
            <div className="font-label-md text-label-md [font-variant:small-caps] text-[#755b00] flex items-center group-hover:translate-x-2 transition-transform">
              Explorar Ritos
            </div>
          </div>
        </Link>

        {/* Festas Litúrgicas */}
        <div className="col-span-12 md:col-span-6 group">
          <div className="bg-[#f5f3ee] p-10 h-[400px] rounded-xl border border-[#c9a84c]/30 flex flex-col justify-between transition-colors hover:bg-[#f0eee9]">
            <div>
              <h3 className="font-headline-lg text-headline-lg mb-4 text-[#755b00]">Festas Litúrgicas</h3>
              <ul className="space-y-4 font-body-md text-body-md text-[#4d4540]">
                <li>
                  <Link href="/catequese/festas/pascoa" className="flex items-center hover:text-[#755b00] transition-colors">
                    Páscoa
                  </Link>
                </li>
                <li>
                  <Link href="/catequese/festas/natal" className="flex items-center hover:text-[#755b00] transition-colors">
                    Natal do Senhor
                  </Link>
                </li>
                <li>
                  <Link href="/catequese/festas/pentecoste" className="flex items-center hover:text-[#755b00] transition-colors">
                    Pentecostes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Períodos Litúrgicos */}
        <div className="col-span-12 md:col-span-6 group">
          <div className="bg-[#f5f3ee] p-10 h-[400px] rounded-xl border border-[#c9a84c]/30 flex flex-col justify-between transition-colors hover:bg-[#f0eee9]">
            <div>
              <h3 className="font-headline-lg text-headline-lg mb-4 text-[#755b00]">Períodos Litúrgicos</h3>
              <ul className="space-y-4 font-body-md text-body-md text-[#4d4540]">
                <li>
                  <Link href="/catequese/periodos/quaresma" className="flex items-center hover:text-[#755b00] transition-colors">
                    Quaresma
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
